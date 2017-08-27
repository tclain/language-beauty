'''
expose public methods accessible by a rest api
'''

from data import load_sample_data

def hello(payload):
    return "hello";

methods = {
    "data" : load_sample_data,
    "hello" : hello
}