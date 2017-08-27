from flask import Flask, request, send_from_directory, abort, jsonify
from datetime import datetime
from server.api import methods
app = Flask(__name__, static_folder='static')


'''
generic routes
'''
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

@app.route('/rpc/<method>', methods=['POST'])
def rpc(method):
    '''
    Naive RPC brigde
    @todo: add validation
    '''
    body = request.get_json(force=True)
    process = methods.get(method, None)
    print "process", process, body
    if process is not None:
        try : 
            return jsonify( { "data" : process(body) })
        except Exception :
            abort(500)
    # 404 if no methods exists 
    return abort(404)

if __name__ == '__main__':
    app.run(debug=True)