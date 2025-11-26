from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message="Hello from Python Backend!")

@app.route('/api/data')
def get_data():
    return jsonify(data=[1, 2, 3, 4, 5], status="success")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
