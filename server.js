import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
  createProductForm,
} from "./controllers/productController.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9500;
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";
const dbName = process.env.DB_NAME || "products_db";

// Ensure views path is resolved correctly in serverless
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Initial connection attempt
connectDB(mongoURI, dbName);

// Middleware to ensure DB connection on serverless requests
app.use(async (req, res, next) => {
  await connectDB(mongoURI, dbName);
  next();
});

// CRUD operations for products
// Route to render the product form for adding a new product
app.get("/product-form", createProductForm);
// Route to handle adding a new product
app.post("/add-product", createProduct);

// Route to display all products
app.get("/", readProducts);
// Route to display a single product
app.get("/product/:id", readProductById);

// Route to render the product form for editing an existing product
app.get("/product-form/:id", updateProductForm);
// Route to handle updating an existing product
app.post("/add-product/:id", updateProduct);

// Route to handle deleting a product
app.get("/delete-product/:id", deleteProduct);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
