const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB Atlas connection URI
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xak4t.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0`;

let gfs, gridFsBucket;

// MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => {
    // Establish connection with GridFSBucket
    gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "photos", // Name of the bucket (collection)
    });

    gfs = gridFsBucket; // We use this to interact with GridFS
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Upload file to GridFS
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ msg: "No file uploaded" });
  }

  try {
    // Create a stream for uploading the file to GridFS
    const uploadStream = gridFsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer); // End the stream with the file's buffer

    uploadStream.on("finish", () => {
      // After uploading, `uploadStream.filename` will contain the filename
      const imageUrl = `${
        process.env.BASE_URL || "http://localhost:8000"
      }/file/${uploadStream.filename}`;
      console.log(imageUrl);
      res.status(200).json({ imageUrl });
    });

    uploadStream.on("error", (error) => {
      res.status(500).json({ msg: error.message });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get file from GridFS
const getImage = async (req, res) => {
  try {
    if (!gfs) {
      return res.status(500).json({ msg: "GridFS not initialized" });
    }

    // Find the file in GridFS by filename
    const fileCursor = gfs.find({ filename: req.params.filename });
    const files = await fileCursor.toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ msg: "File not found" });
    }

    const file = files[0];

    // Open a read stream from GridFS to retrieve the file
    const readStream = gridFsBucket.openDownloadStream(file._id);

    // Set content type
    res.set("Content-Type", file.contentType);

    // Stream the file
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { uploadFile, getImage };
