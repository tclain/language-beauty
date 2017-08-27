from flask import Flask, request, send_from_directory
from datetime import datetime
app = Flask(__name__, static_folder='static')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/app.js')
def appjs():
    return app.send_static_file('app.js')

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()