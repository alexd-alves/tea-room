// server/controllers/flowerController.js

const Flower = require('../models/flower.model.js');

// @desc Get all flowers
// @route GET /api/flower
// @access Public
const getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get flower count
// @route GET /api/flowers/get/count
// @access Public
const getFlowerCount = async (req, res) => {
  try {
    const count = await Flower.countDocuments({});
    res.json({ count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get flower by id
// @route GET /api/flower/:id
// @access Public
const getFlowerById = async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    res.json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Add a new flower
// @route POST /api/flower
// @access Private
const addFlower = async (req, res) => {
  try {
    const newFlower = new Flower({
      imgUrl: req.body.imgUrl,
      name: req.body.name,
      compPoints: req.body.compPoints,
    });
    await newFlower.save();
    res.json({ message: 'Flower added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors: errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// @desc Update flower by id
// @route PUT /api/flower/:id
// @access Private
const updateFlowerById = async (req, res) => {
  try {
    await Flower.findByIdAndUpdate(req.params.id, {
      $set: {
        imgUrl: req.body.imgUrl,
        name: req.body.name,
        compPoints: req.body.compPoints,
      },
    });
    res.json({ message: 'Flower updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete flower by id
// @route DELETE /api/flower/:id
// @access Private
const deleteFlowerById = async (req, res) => {
  try {
    await Flower.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFlowers,
  getFlowerCount,
  getFlowerById,
  addFlower,
  updateFlowerById,
  deleteFlowerById,
};
