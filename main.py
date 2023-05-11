from flask import Flask, request, render_template
from cryptography.fernet import Fernet
import pyperclip

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/encrypt", methods=["POST"])
def encrypt():
    key = request.form["key"]
    message = request.form["message"]
    fernet = Fernet(key.encode())
    token = fernet.encrypt(message.encode())
    return token.decode()

@app.route("/decrypt", methods=["POST"])
def decrypt():
    key = request.form["key"]
    token = request.form["token"]
    fernet = Fernet(key.encode())
    message = fernet.decrypt(token.encode())
    return message.decode()

@app.route("/generated", methods=["POST"])
def generated():
    # key = request.form["key"]
    # token = request.form["token"]
    # fernet = Fernet(key.encode())
    cryp = Fernet
    key = cryp.generate_key()
    # message = fernet.decrypt(token.encode())
    # pyperclip.copy(key)
    return key.decode()

if __name__ == "__main__":
    app.run(debug=True)
