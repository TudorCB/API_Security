const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ApiSpecification = require('../models/ApiSpecification');

// @route POST /api/specifications
// @desc Create a new API specification
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newSpec = new ApiSpecification({ ...req.body, user: req.user.id });
    const savedSpec = await newSpec.save();
    res.json(savedSpec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/specifications
// @desc Retrieve all API specifications for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const specs = await ApiSpecification.find({ user: req.user.id });
    res.json(specs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT /api/specifications/:id
// @desc Update an API specification
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const spec = await ApiSpecification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!spec) {
      return res.status(404).json({ msg: 'Specification not found' });
    }

    res.json(spec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE /api/specifications/:id
// @desc Delete an API specification
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const spec = await ApiSpecification.findOneAndRemove({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!spec) {
      return res.status(404).json({ msg: 'Specification not found' });
    }

    res.json({ msg: 'Specification removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;