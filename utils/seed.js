const connection = require('../config/connection');
const {User,Thought} = require('../models')

connection.on('error', (err) => err);

const seedDB = async () => {
  // Start fresh by deleting everything
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create some users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await User.create({
      username: `user${i+1}`,
      email: `user${i+1}@example.com`,
    });
    users.push(user);
  }

  // Create some thoughts and assign to users
  const thoughts = [];
  for (let i = 0; i < 10; i++) {
    const thought = await Thought.create({
      thoughtText: `Thought ${i+1}`,
      username: users[i%5].username, // loop over the 5 users
    });

    // Add thought to the user's thoughts array
    users[i%5].thoughts.push(thought._id);

    // Save the updated user document
    await users[i%5].save();

    thoughts.push(thought);
  }

  // Add reactions to thoughts
  for (let i = 0; i < 10; i++) {
    thoughts[i].reactions.push({
      reactionBody: 'Great thought!',
      username: users[(i+1)%5].username, // loop over the 5 users
    },
    {
      reactionBody: 'Interesting idea!',
      username: users[(i+2)%5].username, // loop over the 5 users
    });

    // Save the updated thought document
    await thoughts[i].save();
  }

  // Close the connection
  connection.close();
};

seedDB().catch((error) => console.error(error));
