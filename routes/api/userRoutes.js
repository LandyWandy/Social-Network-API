const router = require('express').Router();
const User = require('../../models/User');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// GET a single user by its _id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST a new user
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'No user with this id!' });
  }
  user.friends.push(req.params.friendId);
  await user.save();
  res.json(user);
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'No user with this id!' });
  }
  user.friends = user.friends.filter((friendId) => friendId.toString() !== req.params.friendId);
  await user.save();
  res.json(user);
});

module.exports = router;