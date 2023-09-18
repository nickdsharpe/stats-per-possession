from flask import Flask, request, jsonify
import pandas as pd
import json
from PPP import PPP

app = Flask(__name__)

@app.route('/process_json', methods=['POST'])
def process_json():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Process the data
        df = pd.DataFrame(data).transpose()
        processed_data = PPP(data)

        # Return the updated JSON data as a response
        return jsonify(processed_data)

    except Exception as e:
        # Handle any exceptions that may occur during processing
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)