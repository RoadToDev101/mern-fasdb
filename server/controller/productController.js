const { Product } = require("../model/product.js");

// Create and save product into the database
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const newModel = new Product(req.body);

  // Create a new product into the database
  newModel.save((err, savedModel) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    } else {
      res.send(savedModel);
      console.log(`New Product Created! Product: ${savedModel.modelNumber}`);
    }
  });
};

// Find all products
exports.findAll = (req, res) => {
  Product.find(
    {},
    { modelNumber: 1, productType: 1, material: 1 },
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products.",
        });
      else {
        res.send(data);
        console.log(`All Products Retrieved!`);
      }
    }
  );
};

// Find a single product with a id
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update product with the specified id in the request
exports.updateByID = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  // Find the product with the specified id
  Product.findById(id, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: "Error finding product with id " + id,
      });
    } else if (!data) {
      res.status(404).send({
        message: "Product not found with id " + id,
      });
    } else {
      // Update the product with the specified id
      Product.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false },
        (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send({
              message: "Error updating product with id " + id,
            });
          } else {
            console.log(
              `Successful UPDATE! ID: ${data.id}, Model Name: ${data.modelName}`
            );
            res.send(data);
          }
        }
      );
    }
  });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id,
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

//Find all thread types, head types, drive types, point types, shank types, coatings, materials and applications. Use async try catch to handle errors
exports.findAllProductComponents = (req, res) => {
  async function findAllProductComponents() {
    try {
      const threadTypes = await ThreadType.find({});
      const headTypes = await HeadType.find({});
      const driveTypes = await DriveType.find({});
      const pointTypes = await PointType.find({});
      const shankTypes = await ShankType.find({});
      const coatings = await Coating.find({});
      const materials = await Material.find({});
      const applications = await Application.find({});
      res.send({
        threadTypes,
        headTypes,
        driveTypes,
        pointTypes,
        shankTypes,
        coatings,
        materials,
        applications,
      });
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving product components.",
      });
    }
  }
  findAllProductComponents();
};
