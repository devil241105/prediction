import express from 'express';
import cors from 'cors';
import predictRoutes from './routes/predictions.js';

const app = express();
const port = 3000;


var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
  }


app.use(express.json());
app.use(cors(corsOptions));


app.use('', predictRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
});
