import nltk
import math
import json
import operator
import time
import os
from src.libs.normalize import format_tokens

def write_file(path = '', file_Json = {}):
    with open(path, 'w') as fp:
        json.dump(file_Json, fp)

def load_data(path='src/data/Cranfield_Convert', query=False):
    path_dataset = os.path.join(path,'cranfield_1400.json')
    with open(path_dataset, encoding="UTF-8") as f:
        dataset = json.load(f)

    if not query:
        path_dataset = os.path.join(path,'cranfield_result.json')
        with open(path_dataset, encoding="UTF-8") as f:
            results = json.load(f)

        path_query = os.path.join(path, 'cranfield_query.json')
        with open(path_query, encoding="UTF-8") as f:
            queries = json.load(f)
        list_queries = []
        for i in queries:
            list_queries.append(queries[i])
        return dataset, results, list_queries
    
    else:
        return dataset

def process_dataset(dataset, stopword=True, stem=True):
    # Format dataset
    allDocs = ""
    for i in dataset:
        allDocs=allDocs+ " \n"+ dataset[i]
    # allDocs là tập hợp toàn bộ dataset
    terms = nltk.word_tokenize(allDocs)
    terms = format_tokens(terms, stopword=stopword, stem=stem)
    terms=list(set(terms))
    terms=sorted(terms)
    terms.remove('')
    # tokens tương ứng với term của tài liệu

    # dict_terms -> đếm số lần xuất hiện của tokens
    dict_terms = dict.fromkeys(terms,0)
    docToken = {}
    for i in dataset:
        doc = nltk.word_tokenize(dataset[i])
        doc = format_tokens(doc, stopword=stopword, stem=stem)
        doc=list(set(doc))
        try:
            doc.remove('')
        except:
            None
        docToken[i] = dict.fromkeys(doc,0)
        for i in doc:
            dict_terms[i] += 1

    # tính weight term
    listWeightOfTerm = {}
    totalDoc = len(dataset)
    for i in dict_terms:
        listWeightOfTerm[i] = math.log10(0.5 * totalDoc / dict_terms[i])
    for i in docToken:
        for token in docToken[i]:
            docToken[i][token] = listWeightOfTerm[token]

    return docToken

def preprocess_query(query, stopword=True, stem=True):
    tokens = nltk.word_tokenize(query)
    tokens = format_tokens(tokens, stopword=stopword, stem=stem)
    tokens = list(set(tokens))
    tokens = sorted(tokens)
    try:
        tokens.remove('')
    except:
        None
    return tokens

def process_query(dataset, list_queries, docToken):
    iden = 1
    result_all = {}
    for query in list_queries:
        log_odd = dict.fromkeys(list(dataset.keys()),0)
        query_pre = preprocess_query(query)
        for term in query_pre:
            for x in list(dataset.keys()):
                try:
                    log_odd[x] += docToken[str(x)][term]
                except:
                    None
        log_odd = dict( sorted(log_odd.items(), key=operator.itemgetter(1),reverse=True)) # sắp xếp giảm dần
        log_odd = {x:y for x,y in log_odd.items() if y!=0} # loại bỏ các doc có log_odd = 0
        result_all[iden] = list(log_odd.keys())
        iden = iden + 1
    return result_all

def MAP(list_queries, results, result_all):
    AP_ = 0
    for x in range(len(list_queries)):
        x = x + 1
        # print(list_queries[x-1])
        a = []
        for j in results[str(x)]:
            a.append(int(j[0]))
        count = 0
        len_results = len(a) #TP + FN
        # AP hồi quy 11 điểm
        list_11 = [0] * 11
        max_p = 0
        for i in range(len(result_all[x])):
            if int(result_all[x][i]) in a: #Để ý chỗ này nha Trường. nó khác vs cái cranfield á
                count += 1
                p = round(count/(i+1), 3)
                r = round(count/len_results,3)
                if(max_p <= p):
                    max_p = p
                if(list_11[math.floor(r*10)] <= max_p):
                    list_11[math.floor(r*10)] = max_p
            else:
                max_p = round(count/(i+1), 3)
        flag_val = 9    
        while(flag_val >= 0):
            if(list_11[flag_val] == 0):
                list_11[flag_val] = list_11[flag_val + 1]
            flag_val -= 1
        if count != 0:
            AP = sum(list_11)/ 11
            AP_ += AP
    return AP_/len(list_queries)

def rank(query, docToken, dataset):
    # docToken load tu file
    log_odd = dict.fromkeys(list(dataset.keys()),0)
    query_pre = preprocess_query(query)
    for term in query_pre:
        for x in list(dataset.keys()):
            try:
                log_odd[x] += docToken[str(x)][term]
            except:
                None
    log_odd = dict( sorted(log_odd.items(), key=operator.itemgetter(1),reverse=True))
    log_odd = [x for x,y in log_odd.items() if y!=0]
    return log_odd

def handle_process(path='src/data/Cranfield_Convert', save_path='', save=False):
    start_time = time.time()
    dataset, results, list_queries = load_data(path)
    docToken = process_dataset(dataset, stopword=True, stem=True)
    result_all = process_query(dataset, list_queries, docToken)
    precision = MAP(list_queries, results, result_all)
    end_time = time.time()
    print("--- %s seconds ---" % (end_time - start_time))
    print(f'MAP: {round(precision*100, 2)}%')
    if save:
        write_file(os.path.join(save_path, 'Bim_Cranfield_docToken.txt'), docToken)
        write_file(os.path.join(save_path, 'Bim_Cranfield_dataset.txt'), dataset)