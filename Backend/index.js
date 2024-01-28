import express from "express"
import {PORT, mongourl} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";
const app = express();


app.use(express.json());

//middleware for parsing request policy 
// option1:allow all origins

app.use(cors());

// option 2: allow custom origins

// app.use(cors(
//     {
//         origin: 'http://localhost:3000/',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));

app.get('/',(request, response)=> {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial')

});

app.use('/books', booksRoute);

mongoose
.connect(mongourl)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT , () =>{
        console.log(`App is listening to port: ${PORT} `);
    });
})
.catch((error)=>{
    console.error(error);
});