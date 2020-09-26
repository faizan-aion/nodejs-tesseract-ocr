// =======================
// get the packages we need
// =======================
import * as express from 'express';
import {Express, Router, Request, Response} from 'express';
import * as morgan from 'morgan';
import * as multer from 'multer';
import { unlink } from 'fs';
import { createWorker, PSM } from 'tesseract.js';

// Init express server
const app: Express = express();

// Init Multer
const upload = multer({ dest: 'images/' })

// Init Tesseract worker
const worker = createWorker({
  langPath: '.',
  gzip: false,
  logger: m => console.log(m)
});

const fetchOCR = async (lang: string, path: string): Promise<any> => {
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  const text = await worker.recognize(path);
  await worker.terminate();
  return text;
}

// =======================
// configuration =========
// =======================
const port: number = parseInt(process.env.PORT) || 8081; // used to create, sign, and verify tokens

// // use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes
// =======================

// get an instance of the router for api routes
const apiRoutes: Router = express.Router();

// turn image into text
apiRoutes.post('/ocr', upload.single('img'), async (req: any, res: Response) => {
    // get the temporary location of the file
    if (!req.file) {
        return res.status(403).send({
            status: false,
        })
    }
    const tmp_path: string = req.file.path;
    const data: any = await fetchOCR('ara', tmp_path);
    unlink(tmp_path, () => {
        return res.status(200).send({
            data: data,
            status: true,
        });
    })

});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


// =======================
// start the server 
// =======================
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);