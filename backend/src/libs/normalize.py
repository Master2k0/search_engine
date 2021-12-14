from nltk.stem import PorterStemmer
from nltk.corpus import stopwords

def format_tokens(tokens, lower=True, special=True, stopword=True, stem=True):
    if lower:
        tokens = lower_tokens(tokens)
    if stopword:
        tokens = remove_stopwords(tokens)
    if special:
        tokens = special_char(tokens)
    if stem:
        tokens = stemming(tokens)
    return tokens

def lower_tokens(tokens):
    tokens = [x.lower() for x in tokens]
    return tokens

def remove_stopwords(tokens):
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if not w in stop_words]
    return tokens

def special_char(tokens):
    removetable = str.maketrans(
        "", "", "'!@#$%^&*()_=-\|][:';:,<.>/?`~0123456789")
    tokens = [x.translate(removetable) for x in tokens]
    return tokens

def stemming(tokens):
    porter = PorterStemmer()
    tokens = [porter.stem(x) for x in tokens]
    return tokens