const express = require("express");
const app = express();
const { products, people } = require("../data.js");

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="/api/products">Products</a><a href="/api/people">People</a>');
});

app.get("/api/products", (req, res) => {
  const filteredProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(filteredProducts);
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;

  const singleProduct = products.find((product) => product.id === Number(productId));

  if (!singleProduct) {
    return res.status(404).send("Product not found");
  }

  res.json(singleProduct);
});

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("Dummy");
});

app.get("/api/v1/products/search", (req, res) => {
  const { name, limit } = req.query;

  let filteredProducts = [...products];

  if (name) {
    filteredProducts = filteredProducts.filter((product) => product.name.includes(name));
  }
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }
  if (filteredProducts.length === 0) {
    return res.status(200).send("No products found for given query.");
    // res.status(200).json({ success: true, data: [] });
  }

  res.status(200).send(filteredProducts);
});

app.get("/api/people", (req, res) => {
  res.json(people);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
