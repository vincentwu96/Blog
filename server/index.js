import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

// limit max request body size to 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors()); // Enable all CORS requests

app.use('/posts', postRoutes); // Then specify routes

// https://mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://blog:blog123@cluster0.qv7jz.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} `)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

