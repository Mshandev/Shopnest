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
  try {
    let condition = {};
    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);

    // Apply category filter if provided
    if (req.query.category) {
      const categories = req.query.category.split(",");
      query = query.find({ category: { $in: categories } });
      totalProductsQuery = totalProductsQuery.find({ category: { $in: categories } });
    }

    // Apply brand filter if provided
    if (req.query.brand) {
      const brands = req.query.brand.split(",");
      query = query.find({ brand: { $in: brands } });
      totalProductsQuery = totalProductsQuery.find({ brand: { $in: brands } });
    }

    // Apply sorting if provided
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    // Count total documents matching the query
    const totalDocs = await totalProductsQuery.countDocuments().exec();

    // Apply pagination if provided
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Execute the query and return results
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);

  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err });
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
