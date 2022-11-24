import express from "express";
import multer from "multer";

const upload = express.Router();
const parser = multer({ dest: 'images/' })

upload.post('/', parser.single('document'),(req , res) => {
    console.log(req.file, req.body)
  });


export default upload;