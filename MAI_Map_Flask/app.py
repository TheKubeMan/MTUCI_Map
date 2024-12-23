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

        # str1 = request.form.get('str1')
        # str2 = request.form.get('str2')

        data = json.loads(request.data)
        str1 = data['element1']
        str2 = data['element2']

        #process = subprocess.Popen(['python', './shortest_path.py', str1, str2], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        result = shortest_path.process_data(str1, str2)

        return result
    
    #     stdout, stderr = process.communicate()

    #     if stderr:
    #         error_message = stderr.decode('utf-8').strip()
    #         return jsonify({'error': error_message}), 500

    #     output = stdout.decode('utf-8').strip()
    #     try:
    #         result = json.loads(output)
    #         return jsonify(result)
    #     except json.JSONDecodeError:
    #         return jsonify({'error': f'Invalid JSON response from Python: {output}'}), 500

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)