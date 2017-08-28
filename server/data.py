import os, nltk
from nltk import word_tokenize
from nltk.tokenize import sent_tokenize
from lib.Text import Text as MemoryText
import shelve 

'''
GLOBALS
'''
CURRENT_DIR = os.path.dirname(__file__)
SAMPLE_DATA_PATH = "../data/pp.txt"


cache = {
    "raw" : None,
    "words" : None,
    "sentences" : None,
    "nlp" : None
}


def process_sample_data(payload={}):
    '''
    simple pipeline applied to sample text
    '''
    load_sample_data(None)
    tokenize(None)
    return True

def load_sample_data(payload={}):
    '''
     read sample data and returns an array with the data
    '''
    if not cache["raw"]:
        cache["raw"] = open(os.path.join(CURRENT_DIR, SAMPLE_DATA_PATH)).read().decode('utf-8')

def tokenize(payload={}):
    '''
    let ntlk process the sample text
    '''
    raw = cache.get('raw', None);
    # depends on raw
    if not raw : raise Exception('Raw data has not been loaded');
    # feed cache with tokenized version
    if not cache["words"]:
         cache["words"] = nltk.word_tokenize(raw)
    if not cache["sentences"]:
        cache["sentences"] = sent_tokenize(raw)
        print "parsed sentences", len(cache['sentences'])
    if not cache["nlp"] :
        cache["nlp"] = MemoryText(cache.get('words'))
    return True

def get_raw_text(payload={}):
    '''
    return a slice of raw text
    @param payload {dict} the option from request
    '''
    data = payload.get('data', {})
    offset = data.get('offset', 0)
    length = data.get('length', 20)

    print data, offset, length
    sentences = cache.get('sentences', None)
    if not (sentences) : raise Exception('Text data has not been parsed for now')
    
    start = offset * length
    end = start + length

    with_return = [[word for word in sentence.split(' ')] for sentence in sentences[start:end]]
    no_return_char = []
    for sentence in with_return:
        new_sentence = []
        for word in sentence : 
            split_return = [part for part in word.split("\r\n") if part != ""]
            if len(split_return) > 0:
                new_sentence = new_sentence + split_return
            else:
                new_sentence.append(word)
        no_return_char.append(new_sentence)
    return no_return_char

def concordance(payload={}):
    '''
    get usage for a given word
    '''
    data = payload.get('data', None)
    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')

    data = data.replace(',', '')
    return nlp.concordance(data)

def entities(payload):
    '''
    tag each word of the expression with its type
    '''
    data = payload.get('data', None)
    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')
    data = data.replace(',', '')

def similar(payload={}):
    '''
    get similar for a given word
    '''
    data = payload.get('data', None)
    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')
    data = data.replace(',', '')
    return nlp.similar(data)

def insights(payload={}):
    ''' 
    get a summary of all possible insights for a given word
    '''
    return {
        "similar" : similar(payload),
        "concordance" : concordance(payload),
    }




if __name__ == "__main__":
    process_sample_data(None)
    print concordance({"data" : "love"})

    