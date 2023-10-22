import express, { response } from "express";
import mongoose, { model, Schema, set } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 2080;

const connectDB = async () => {
  const conet = await mongoose.connect(process.env.MONGODB_URI);

  if (conet) {
    console.log("MongoDB connection succeeded");
  }
};

connectDB();

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  productImage: String,
  brand: String,
});

const Product = model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json({
    suscess: true,
    data: products,
    massage: "Products data fetched successfully",
  });
});

app.post("/product", async (req, res) => {
  const { name, description, price, productImage, brand } = req.body;

  if (!name) {
    return res.json({
      suscess: false,
      massage: "Please enter product name first",
    });
  }

  if (!description) {
    return res.json({
      suscess: false,
      massage: "Please enter product description",
    });
  }

  if (!price) {
    return res.json({
      suscess: false,
      massage: "Please enter product price",
    });
  }

  if (!productImage) {
    return res.json({
      suscess: false,
      massage: "Please enter product image url",
    });
  }
  if (!brand) {
    return res.json({
      suscess: false,
      massage: "Please enter brand name",
    });
  }

  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    productImage: productImage,
    brand: brand,
  });

  const saveProduct = await newProduct.save();

  res.json({
    suscess: true,
    data: saveProduct,
    massage: "New product added successfully",
  });
});

app.get("/product", async (req, res) => {
  const { name } = req.query;

  const products = await Product.findOne({ name: name });

  res.json({
    suscess: "productt fetched successfully",
    data: products,
  });
});

app.delete("/product/:_id", async (req, res) => {
  const { _id } = req.params;

  await Product.deleteOne({ _id: _id });

  res.json({
    suscess: true,
    data: {},
    massage: `suscessfully deleted product with id ${_id}`,
  });
});

app.put("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;

  if (!name) {
    return res.json({
      suscess: false,
      massage: "Please enter a name first",
    });
  }

  if (!description) {
    return res.json({
      suscess: false,
      massage: "Please enter product description",
    });
  }

  if (!price) {
    return res.json({
      suscess: false,
      massage: "Please enter product price",
    });
  }

  if (!productImage) {
    return res.json({
      suscess: false,
      massage: "Please enter product image url",
    });
  }
  if (!brand) {
    return res.json({
      suscess: false,
      massage: "Please enter brand name",
    });
  }

  await Product.updateOne(
    { _id: _id },
    {
      $set: {
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand,
      },
    }
  );

  const updatedProduct = await Product.updateOne({ _id: _id });
  res.json({
    suscess: true,
    data: updatedProduct,
    massage: "product updated successfully",
  });
});

app.patch("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;

  const product = await Product.findById(_id);

  if (name) {
    product.name = name;
  }

  if (productImage) {
    product.productImage = productImage;
  }
  if (description) {
    product.description = description;
  }
  if (price) {
    product.price = price;
  }
  if (brand) {
    product.brand = brand;
  }

  const productUpdated = await product.save();

  res.json({
    suscess: true,
    data: productUpdated,
    massage: "product updated successfully",
  });
});

app.listen(PORT, console.log(`server listening on ${PORT}`));
