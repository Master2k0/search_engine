import json
import os
from src.libs import BIM_corpus, BIM_cranfield, VSM_corpus, VSM_cranfield

def load_database():
    database = {}
    path = 'src/query'

    print('INFO: Loading BIM Corpus')
    database['1'] = {} 
    database['1']['query'] = load_BIM_corpus(path)
    database['1']['dataset'] = BIM_corpus.load_data(query=True)

    print('INFO: Loading BIM Cranfield')
    database['2'] = {}
    database['2']['query'] = load_BIM_cranfield(path)
    database['2']['dataset'] = BIM_cranfield.load_data(query=True)

    print('INFO: Loading VSM Corpus')
    database['3'] = {}
    database['3']['query'] = load_VSM_corpus(path)
    database['3']['dataset'] = VSM_corpus.load_data(query=True)

    print('INFO: Loading VSM Cranfield')
    database['4'] = {}
    database['4']['query'] = load_VSM_cranfield(path)
    database['4']['dataset'] = VSM_cranfield.load_data(query=True)

    return database

def load_BIM_corpus(path):
    path_dataset = os.path.join(path,'Bim_Corpus_dataset.txt')
    with open(path_dataset, encoding="UTF-8") as f:
        dataset = json.load(f)
    path_docToken = os.path.join(path,'Bim_Corpus_docToken.txt')
    with open(path_docToken, encoding="UTF-8") as f:
        docToken = json.load(f)
    return docToken, dataset

def load_BIM_cranfield(path):
    path_dataset = os.path.join(path,'Bim_Cranfield_dataset.txt')
    with open(path_dataset, encoding="UTF-8") as f:
        dataset = json.load(f)
    path_docToken = os.path.join(path,'Bim_Cranfield_docToken.txt')
    with open(path_docToken, encoding="UTF-8") as f:
        docToken = json.load(f)
    return docToken, dataset

def load_VSM_corpus(path):
    path_idf_Dict = os.path.join(path,'VSM_Corpus_idf_Dict.txt')
    with open(path_idf_Dict, encoding="UTF-8") as f:
        idf_Dict = json.load(f)
    path_tf_idf = os.path.join(path,'VSM_Corpus_tf_idf.txt')
    with open(path_tf_idf, encoding="UTF-8") as f:
        tf_idf = json.load(f)
    path_token = os.path.join(path,'VSM_Corpus_token.txt')
    with open(path_token, encoding="UTF-8") as f:
        token = json.load(f)
    return token, idf_Dict, tf_idf

def load_VSM_cranfield(path):
    path_idf_Dict = os.path.join(path,'VSM_Cranfield_idf_Dict.txt')
    with open(path_idf_Dict, encoding="UTF-8") as f:
        idf_Dict = json.load(f)
    path_tf_idf = os.path.join(path,'VSM_Cranfield_tf_idf.txt')
    with open(path_tf_idf, encoding="UTF-8") as f:
        tf_idf = json.load(f)
    path_token = os.path.join(path,'VSM_Cranfield_token.txt')
    with open(path_token, encoding="UTF-8") as f:
        token = json.load(f)
    return token, idf_Dict, tf_idf

def handle(key, database, types):
    # Data = BIM/ VSM
    # Model = corpus / cranfield
    results = {}
    params = database[types]['query']
    if types == '1':
        lst = BIM_corpus.rank(key, params[0], params[1])

    elif types == '2':
        lst = BIM_cranfield.rank(key, params[0], params[1])

    elif types == '3':
        lst = VSM_corpus.rank(key, params[0], params[1], params[2])

    elif types == '4':
        lst = VSM_cranfield.rank(key, params[0], params[1], params[2])

    lst_result = lst[:10]
    for i in lst_result:
        results[i] = database[types]['dataset'][i]
        
    return results
