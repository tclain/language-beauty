import os, nltk
from nltk import word_tokenize
from nltk.tokenize import sent_tokenize
from lib.Text import Text as MemoryText 

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
    if not cache["nlp"] :
        cache["nlp"] = MemoryText(cache.get('words'))
    return True

def get_raw_text(payload={}):
    '''
    return a slice of raw text
    @param payload {dict} the option from request
    '''
    offset = payload.get('offset', 0)
    length = payload.get('length', 20)
    sentences = cache.get('sentences', None)
    if not (sentences and offset and length) : raise Exception('Text data has not been parsed for now')
    
    start = offset * length
    end = start + offset
    return sentences[start:end]

def concordance(payload={}):
    '''
    get usage for a given word
    '''
    data = payload.get('data', None)

    print 'data received, concordance', data

    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')
    return nlp.concordance(data)

def entities(payload):
    data = payload.get('data', None)
    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')

def similar(payload={}):
    '''
    get usage for a given word
    '''
    data = payload.get('data', None)
    nlp = cache.get('nlp', None )
    if not (data and nlp): raise Exception('Data must be parsed. data key is mandatory')
    return nlp.similar(data)

if __name__ == "__main__":
    process_sample_data(None)
    print concordance({"data" : "love"})

    