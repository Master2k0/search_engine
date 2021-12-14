from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from src.setting.config import Config
from handle import handle, load_database
import time

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/app', methods=['POST'])
@cross_origin(origin='*')
def get_query():
    if request.method == 'POST':
        key = request.form.get('key')
        data = request.form.get('data')
        model = request.form.get('model')
        if data == 'BIM':
            if model == 'corpus':
                types = '1'
            elif model == 'cranfield':
                types = '2'
        elif data == 'VSM':
            if model == 'corpus':
                types = '3'
            elif model == 'cranfield':
                types = '4'
        results = handle(key, database, types)
        return results
    abort(403)

if __name__ == '__main__':
    HOST = Config.host
    PORT = Config.port
    start_time = time.time()
    database = load_database()
    end_time = time.time()
    print(f'INFO: Time loading {round(end_time-start_time,2)}s')
    app.run(host=HOST, port=PORT, debug=False)