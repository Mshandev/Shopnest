const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.discountedPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {};
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  //To do Search Using Voice

  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (err) {
    res.status(200).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountedPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  let condition = {};

  if (searchQuery) {
    condition = { title: { $regex: searchQuery, $options: "i" } };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  try {
    const totalDocs = await totalProductsQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.fetchFeatureProducts = async (req, res) => {
  let condition = {};

  if (req.query.category) {
    condition = { category: { $regex: req.query.category, $options: "i" } };
  }
  try {
    const products = await Product.find(condition).sort({ rating: -1 }).limit(3).exec();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};
