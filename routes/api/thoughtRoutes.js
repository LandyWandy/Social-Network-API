const router = require('express').Router();
const Thought = require('../../models/Thought');


// GET all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find({});
  res.json(thoughts);
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  const thought = await Thought.findById(req.params.id);
  res.json(thought);
});

// POST a new thought
router.post('/', async (req, res) => {
  const thought = await Thought.create(req.body);
  res.json(thought);
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(thought);
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  const thought = await Thought.findByIdAndDelete(req.params.id);
  res.json(thought);
});

module.exports = router;
