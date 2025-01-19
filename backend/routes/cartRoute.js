import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartContoller';

const cartRouter = express.Router();

cartRouter.post('/get', getUserCart);

cartRouter.post('/add', getUserCart);

cartRouter.post('/update', getUserCart);


export default cartRouter;