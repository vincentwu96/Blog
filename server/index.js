import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

// limit max request body size to 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors()); // Enable all CORS requests, then specify routes below

app.use('/posts', postRoutes);

app.get('/', function (req, res) {
    res.status(501).send('Not Implemented');
});

const PORT = process.env.PORT || 5000;

// https://mongodb.com/cloud/atlas
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} `)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

