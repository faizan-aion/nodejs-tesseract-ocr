# Image-to-Text API Microservice with NodeJS
Convert uploaded image and convert it into text using [Tesseract.js](https://github.com/naptha/tesseract.js).

# How to Use

### Running with Node & Nodemon

```
git clone https://github.com/faizan-aion/nodejs-tesseract-ocr.git
cd nodejs-tesseract-ocr/
npm install
npm run start
```

### Running with Docker

See [how to install docker](https://github.com/asepmaulanaismail/install-docker-ubuntu-shell-script).

```
git clone https://github.com/faizan-aion/nodejs-tesseract-ocr.git
cd nodejs-tesseract-ocr/
sudo docker build -t nodejs-tesseract-ocr:latest .
sudo docker run -d -p 8080:8080 nodejs-tesseract-ocrgit
```

# API:

## Tesseract

Convert uploaded file into text.

POST: `localhost:8080/api/tesseract`

Params (Multipart/form-data):

```
    + name: "img", type: "File", required: "true" 
```

Response:

```Javascript
{
    "status": true,
    "text": "It was the best of\ntimes, it was the worst\nof times, it was the age\nofwisdom, it was the\nage of foolishness“.\n\n",
    "confidence": 89
}
```