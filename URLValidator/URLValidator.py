import json
import requests
import urllib
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

api_key=os.getenv('API_KEY')

class IPQS:
    def malicious_url_scanner_api(self, url: str, vars: dict = {}) -> dict:
        url = 'https://www.ipqualityscore.com/api/json/url/%s/%s' % (api_key, urllib.parse.quote_plus(url))
        x = requests.get(url, params = vars)
        #print(x.text)
        return (json.loads(x.text))
    
ipqs = IPQS()

@app.route('/checkURL', methods=['GET'])
def get_data():
    try:
        URL_to_Check = request.args.get('URL')
        strictness = 0

        additional_params = {
            'strictness': strictness
        }
        result = ipqs.malicious_url_scanner_api(URL_to_Check, additional_params)
        if 'success' in result and result['success'] == True:
            data = {
                "error_message": "NA",
                "status": "success",
                "suspicious": result['suspicious'],
                "phishing": result['phishing'],
                "malware": result['malware'],
                "risk_score": result['risk_score'],
            }
            return jsonify(data)
        else:
            data = {
            'error_message': 'Failed Request',
            'status': 'Error'
        }
        return jsonify(data)
    except:
        data = {
            'error_message': 'Invalid Request',
            'status': 'Error'
        }
        return jsonify(data)

if __name__ == '__main__':
    app.run(port=8080)