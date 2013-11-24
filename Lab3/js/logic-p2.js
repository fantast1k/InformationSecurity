var privateKey, publicKey, encryptionResult;

function generateKey() {
    var keyData = $name('keyData').value;
    var bitLength = $name('bitLength').value;
    if(keyData.length > 0){
        privateKey = cryptico.generateRSAKey(keyData, bitLength);
        publicKey = cryptico.publicKeyString(privateKey);
        $name('publicKey').value = publicKey;
    } else {
        alert('Please enter key data and bit length!');
    }
}

function encrypt() {
    if(publicKey == undefined) {
        alert('Please generate keys!');
        return;
    }
    var encryptData = $name('encryptData').value;
    encryptionResult = cryptico.encrypt(encryptData, publicKey);
    $name('encryptedMessage').value = encryptionResult.cipher;
}

function decrypt() {
    if(privateKey == undefined) {
        alert('Please generate keys!');
        return;
    }
    var decryptData = $name('decryptData').value;
    var decryptionResult = cryptico.decrypt(decryptData, privateKey);
    $name('decryptedMessage').value = decryptionResult.plaintext;
}

function saveKeys() {
    if (!showSave) {
        alert("Your browser does not support any method of saving JavaScript gnerated data to files.");
        return;
    }
    showSave(publicKey, 'Keys', 'text/plain; charset=UTF-8');
}

function saveMessage() {
    if (!showSave) {
        alert("Your browser does not support any method of saving JavaScript gnerated data to files.");
        return;
    }
    showSave(encryptionResult, 'Message', 'text/plain; charset=UTF-8');
}

var DownloadAttributeSupport = 'download' in document.createElement('a');
// Use any available BlobBuilder/URL implementation:
var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// IE 10 has a handy navigator.msSaveBlob method. Maybe other browsers will emulate that interface?
navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;

window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;

var BrowserSupportedMimeTypes = {
    "text/plain": true,
    "text/html": true,
    "text/xml": true,
    "application/xhtml+xml": true,
    "application/json": true
};

// Blobs and saveAs (or saveBlob):
if (BlobBuilder && (window.saveAs || navigator.saveBlob)) {
    showSave = function (data, name, mimeType) {
        var builder = new BlobBuilder();
        builder.append(data);
        var blob = builder.getBlob(mimetype||"application/octet-stream");
        if (!name) name = "Download.bin";

        if (window.saveAs) {
            window.saveAs(blob, name);
        }
        else {
            navigator.saveBlob(blob, name);
        }
    };
} else if (BlobBuilder && URL) {
    // Currently WebKit and Gecko support BlobBuilder and object URLs.
    showSave = function (data, name, mimetype) {
        var blob, url, builder = new BlobBuilder();
        builder.append(data);
        if (!mimetype) mimetype = "text/plain; charset=UTF-8";
        if (DownloadAttributeSupport) {
            blob = builder.getBlob(mimetype);
            url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.setAttribute("href",url);
            link.setAttribute("download",name||"Download.bin");
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
        else {
            if (BrowserSupportedMimeTypes[mimetype.split(";")[0]] === true) {
                mimetype = "application/octet-stream";
            }

            blob = builder.getBlob(mimetype);
            url = URL.createObjectURL(blob);
            window.open(url, '_blank', '');
        }
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 250);
    };
}
else if (!/\bMSIE\b/.test(navigator.userAgent)) {
    showSave = function (data, name, mimetype) {
        if (!mimetype) mimetype = "application/octet-stream";
        if (BrowserSupportedMimeTypes[mimetype.split(";")[0]] === true) {
            mimetype = "application/octet-stream";
        }
        window.open("data:"+mimetype+","+encodeURIComponent(data), '_blank', '');
    };
}
