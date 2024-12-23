from flask import Flask, request, jsonify, render_template
import subprocess
import json
import sys

import shortest_path

app = Flask(__name__, static_folder='static', static_url_path='/static', template_folder='templates')

module_path = "/"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_strings', methods=['POST'])
def your_flask_endpoint():

        data = json.loads(request.data)
        str1 = data['element1']
        str2 = data['element2']

        print(str1)
        print(str2)

        result = shortest_path.process_data(str1, str2)

        return result

if __name__ == '__main__':
    app.run(debug=True)