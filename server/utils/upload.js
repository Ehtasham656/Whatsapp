// const multer = require("multer");
// const { MongoClient, GridFSBucket } = require("mongodb");
// require("dotenv").config();
// const crypto = require("crypto");

// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xak4t.mongodb.net/whatsapp?retryWrites=true&w=majority`;

// let bucket;

// // Initialize GridFSBucket
// const initBucket = async () => {
//   try {
//     const client = await MongoClient.connect(mongoURI);
//     const db = client.db("whatsapp");
//     bucket = new GridFSBucket(db, { bucketName: "photos" });
//     console.log("Connected to MongoDB and GridFSBucket initialized");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1); // Exit if the bucket initialization fails
//   }
// };

// // Multer configuration
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = [
//       "image/png",
//       "image/jpeg",
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     ];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error(
//           "Only .png, .jpeg, .pdf, .doc, .docx, .xls, and .xlsx files are allowed"
//         )
//       );
//     }
//   },
// });

// // Upload file to GridFS
// const uploadFileToGridFS = async (req, res) => {
//   if (!bucket) return res.status(500).send("Bucket not initialized");

//   const file = req.file;
//   if (!file) return res.status(400).send("No file uploaded");

//   const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}-${
//     file.originalname
//   }`;

//   const uploadStream = bucket.openUploadStream(filename, {
//     contentType: file.mimetype,
//   });

//   uploadStream.end(file.buffer);

//   uploadStream.on("finish", () => {
//     const fileUrl = `${process.env.BASE_URL || "http://localhost:8000"}/file/${
//       uploadStream.filename
//     }`;
//     res.status(200).json({
//       fileId: uploadStream.id,
//       filename: uploadStream.filename,
//       fileUrl,
//     });
//   });

//   uploadStream.on("error", (err) => {
//     console.error("Error uploading file:", err);
//     res.status(500).send("Error uploading file");
//   });
// };

// initBucket();

// module.exports = { upload, uploadFileToGridFS };

// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";

// import dotenv from "dotenv";

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//   url: `mongodb://${username}:${password}@chatapp-shard-00-00.1lequ.mongodb.net:27017,chatapp-shard-00-01.1lequ.mongodb.net:27017,chatapp-shard-00-02.1lequ.mongodb.net:27017/WHATSAPPCLONE?ssl=true&replicaSet=atlas-78i8sb-shard-0&authSource=admin&retryWrites=true&w=majority`,
//   options: { useNewUrlParser: true },
//   file: (request, file) => {
//     const match = ["image/png", "image/jpg"];

//     if (match.indexOf(file.memeType) === -1)
//       return `${Date.now()}-blog-${file.originalname}`;

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`,
//     };
//   },
// });

// export default multer({ storage });

const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB Atlas connection URI
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xak4t.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0`;

const storage = multer.memoryStorage(); // Store files in memory before uploading

const upload = multer({ storage });

module.exports = upload;
