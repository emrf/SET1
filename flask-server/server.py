from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route


@app.route("/members")
def members():
    return jsonify({"members": ["Member0", "Member1"]})


if __name__ == "__main__":
    app.run(debug=True)
