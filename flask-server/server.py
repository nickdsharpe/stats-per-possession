from flask import Flask, request, jsonify
import pandas as pd
from PPP import PPP
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/process_json', methods=['POST'])
def process_json():
    try:
        return_data = {}
        # Get the JSON data from the request
        data = request.get_json()
        ppp_data = data['data']
        shooting_locations = data['shooting_locations']
        created_locations = data['created_locations']
        
        # Process the data
        df = pd.DataFrame(ppp_data).transpose()
        processed_data = PPP(df)
        
        # Make return Dictionary
        return_data['data'] = processed_data.reset_index().rename(columns={'index': 'Shot Type'}).to_dict(orient='records')
        return_data['shooting_locations'] = shooting_locations
        return_data['created_locations'] = created_locations
    
        # Return the updated JSON data as a response
        return return_data

    except Exception as e:
        # Handle any exceptions that may occur during processing
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)