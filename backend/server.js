import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//App config

const app = express()
const port = process.env.PORT || 4000;


//middleware
app.use(express.json());
app.use(cors());

// api routes
app.get('/', (req, res)=> {
    res.send("Api is working");
});

app.listen(port, ()=> console.log(`Server started at port:${port}`))
