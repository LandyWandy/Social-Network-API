// Import necessary modules
const mongoose = require('mongoose');

// Import your models
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Your seed logic goes here

// Close the connection when you're done
mongoose.connection.close();


const seedDB = async () => {
  // Start fresh by deleting everything
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create some users
  const user1 = await User.create({
    username: 'user1',
    email: 'user1@example.com',
  });

  const user2 = await User.create({
    username: 'user2',
    email: 'user2@example.com',
  });

  // Create some thoughts
  const thought1 = await Thought.create({
    thoughtText: 'I love coding!',
    username: user1.username,
  });

  const thought2 = await Thought.create({
    thoughtText: 'I love AI!',
    username: user2.username,
  });

  // Add thoughts to users
  user1.thoughts.push(thought1._id);
  user2.thoughts.push(thought2._id);

  // Save the updated user documents
  await user1.save();
  await user2.save();

  // Add reactions to thoughts
  thought1.reactions.push({
    reactionBody: 'Great thought!',
    username: user2.username,
  });

  thought2.reactions.push({
    reactionBody: 'Interesting idea!',
    username: user1.username,
  });

  // Save the updated thought documents
  await thought1.save();
  await thought2.save();

  // Close the connection
  mongoose.connection.close();
};

seedDB().catch((error) => console.error(error));
