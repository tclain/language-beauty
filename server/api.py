'''
expose public methods accessible by a rest api
'''

from data import get_raw_text, process_sample_data, similar, concordance, insights

methods = {
    "process-sample-data" : process_sample_data,
    "raw-text" : get_raw_text,
    "similar" : similar,
    "concordance" : concordance,
    "insights" : insights
}