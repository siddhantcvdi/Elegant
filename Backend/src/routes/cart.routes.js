import {Router} from 'express';
const cartRouter = Router();
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import { checkJWT } from '../middlewares/auth.middlware.js';

cartRouter.post('/add',checkJWT, addToCart);
cartRouter.post('/remove',checkJWT ,removeFromCart);
cartRouter.get('/getCart',checkJWT, getCart);

export default cartRouter;