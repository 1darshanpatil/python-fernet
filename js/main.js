// Generate a Fernet key
function generateKey() {
    var array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return array;
  }
  
  // Encrypt data using Fernet
  function encryptFernet(key, plaintext) {
    var sha256 = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(key));
    var keyBase64 = CryptoJS.enc.Base64.stringify(sha256).substr(0, 32);
  
    var message = btoa(unescape(encodeURIComponent(plaintext)));
    var iv = window.crypto.getRandomValues(new Uint8Array(16));
    var ciphertext = CryptoJS.AES.encrypt(message, keyBase64, { iv: iv }).toString();
    var token = btoa(iv + ciphertext);
    return token;
  }
  
  // Decrypt data using Fernet
  function decryptFernet(key, token) {
    var sha256 = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(key));
    var keyBase64 = CryptoJS.enc.Base64.stringify(sha256).substr(0, 32);
  
    var tokenData = atob(token);
    var iv = tokenData.slice(0, 16);
    var ciphertext = tokenData.slice(16);
    var message = CryptoJS.AES.decrypt(ciphertext, keyBase64, { iv: iv });
    var plaintext = decodeURIComponent(escape(atob(message)));
    return plaintext;
  }
  