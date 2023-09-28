from flask import Flask, request, jsonify
import pandas as pd
from PPP import PPP
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/process_json', methods=['POST'])
def process_json():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Process the data
        df = pd.DataFrame(data).transpose()
        processed_data = PPP(df)
        processed_data = processed_data.iloc[:,: 13]
        # Return the updated JSON data as a response
        return processed_data.reset_index().rename(columns={'index': 'Shot Type'}).to_dict(orient='records')

    except Exception as e:
        # Handle any exceptions that may occur during processing
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)