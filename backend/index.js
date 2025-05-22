import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import FavoriteRoute from "./routes/FavoriteRoute.js";
import CartRoute from "./routes/CartRoute.js";
import OrderRoute from "./routes/OrderRoute.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CategoryRoute);
app.use(ProductRoute);
app.use(FavoriteRoute);
app.use(CartRoute);
app.use(OrderRoute);


app.listen(5000, () => console.log('Server up and running...'));