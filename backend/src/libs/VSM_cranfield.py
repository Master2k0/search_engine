import nltk
import math
import json
import operator
import time
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
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
    docToken={}
    for i in dataset:
        docToken[i] = nltk.word_tokenize(dataset[i])
        #format tokens
        docToken[i] = format_tokens(docToken[i], stopword=stopword, stem=stem)
        docToken[i] = sorted(docToken[i])    
    # docToken[i] tương ứng với 1 câu thứ i trong dataset

    allDocs = ""
    for i in dataset:
        allDocs=allDocs+ " \n"+ dataset[i]
    # allDocs là tập hợp toàn bộ dataset
    tokens = nltk.word_tokenize(allDocs)
    tokens = format_tokens(tokens, stopword=stopword, stem=stem)
    tokens=list(set(tokens))
    tokens=sorted(tokens)

    return tokens, docToken

def get_tf(tokens, docToken):
    doc_dict = {}
    for i in docToken:
        doc_dict[i] = dict.fromkeys(tokens,0)
        for word in docToken[i]:
            doc_dict[i][word] += 1

    tf_doc_dict = {}
    for x in range(1,1401):
        tf_doc_dict[x]={}
        for word,count in doc_dict[str(x)].items():
            tf_doc_dict[x][word]= math.log(1+ count)

    return doc_dict, tf_doc_dict

def get_idf(tokens, docToken):
    for i in range(1,1401):
        docToken[str(i)]=list(set(docToken[str(i)]))

    word_count=dict.fromkeys(tokens,0)
    for word in tokens:
        for x in range(1,1401):
            if word in docToken[str(x)]:
                word_count[word]+=1

    idf_Dict = {}
    for word in tokens:
        if word_count[word]>0:
            count=word_count[word]
            if count>1400:
                count=1400
        # idf_Dict[word]=(1/count) #Công thức idf  
        # idf_Dict[word]=math.log(1400/count) #Công thức idf
        idf_Dict[word]=math.log((1400/count)+1) #Công thức idf    
         
    return idf_Dict

def get_tf_idf(docToken, doc_dict, tf_doc_dict, idf_Dict):
    tf_idf={}
    for x in range(1,1401):
        tf_idf[x]={}
        for word in doc_dict[str(x)]:
            tf_idf[x][word]=tf_doc_dict[x][word]*idf_Dict[word]
    return tf_idf

def rank(query, tokens, idf_Dict, tf_idf, stopword=True, stem=True):
    qr = nltk.word_tokenize(query)
    qr = format_tokens(qr, stopword=stopword, stem=stem)
    qr = list(set(qr))
    qrV = dict.fromkeys(tokens, 0)
    for word in qr:
        if word in tokens:
            qrV[word] += 1
    # quert idf
    for words in qrV:
        try:
            qrV[words] = qrV[words]*idf_Dict[words]
        except KeyError:
            None
    # -------------cosine simalarity-----------------
    res = {}
    temp = 0
    vec1 = np.array([list(qrV.values())])
    for x in tf_idf:
        vec2 = np.array([list(tf_idf[x].values())])
        if cosine_similarity(vec1, vec2) > 0:
            temp = cosine_similarity(vec1, vec2)[0][0]
            res[x] = temp
    result = {}
    result = sorted(res.items(), key=operator.itemgetter(1), reverse=True)
    result = list(result)
    rank = []
    for i in range(len(result)-1):
        rank.append(result[i][0])
    return rank


def MAP(list_queries, results, tokens, idf_Dict, tf_idf):
    AP_ = 0
    for x in range(len(list_queries)):
        query = list_queries[x]
        rank_ = rank(query, tokens, idf_Dict, tf_idf)
        x = x + 1
        a = []
        for j in results[str(x)]:
            a.append(int(j[0]))
        count = 0
        len_results = len(a)  # TP + FN
        list_11 = [0] * 11
        max_p = 0
        min_11 = 0
        for i in range(len(rank_)):
            if int(rank_[i]) in a:
                count += 1
                p = round(count/(i+1), 3)
                r = round(count/len_results, 3)
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
            AP = sum(list_11) / 11
            AP_ += AP
    return AP_/len(list_queries)

def handle_process(path='src/data/Cranfield_Convert', save_path='', save=False):
    start_time = time.time()
    dataset, results, list_queries = load_data(path)
    tokens, docToken = process_dataset(dataset, stopword=True, stem=True)
    doc_dict, tf_doc_dict = get_tf(tokens, docToken)
    idf_Dict = get_idf(tokens, docToken)
    tf_idf = get_tf_idf(docToken, doc_dict, tf_doc_dict, idf_Dict)
    precision = MAP(list_queries, results, tokens, idf_Dict ,tf_idf)
    end_time = time.time()
    print("--- %s seconds ---" % (end_time - start_time))
    print(f'MAP: {round(precision*100, 2)}%')
    if save:
        write_file(os.path.join(save_path, 'VSM_Cranfield_token.txt'), tokens)
        write_file(os.path.join(save_path, 'VSM_Cranfield_idf_Dict.txt'), idf_Dict)
        write_file(os.path.join(save_path, 'VSM_Cranfield_tf_idf.txt'), tf_idf)