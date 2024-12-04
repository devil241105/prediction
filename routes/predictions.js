import express from 'express'
import { prediction } from '../controllers/prediction.js'
const predictRoutes = express.Router()


predictRoutes.post('/predict',prediction);


export default predictRoutes