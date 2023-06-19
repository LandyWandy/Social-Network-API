# Social Network API

## Overview

A back-end API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

To install the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory in the terminal.
3. Run `npm install`.

You will need MongoDB installed and running on your local machine. Refer to the [MongoDB documentation](https://docs.mongodb.com/manual/installation/) for instructions.

## Usage

Start the server by running `npm start` in the terminal from the root directory.

## API Endpoints

### Users

- `GET /api/users`
  - Returns a list of all users.
- `POST /api/users`
  - Creates a new user.
  - Request body should include `username` and `email`.
- `PUT /api/users/:userId`
  - Updates the user specified by `userId`.
  - Request body should include any fields to be updated.
- `DELETE /api/users/:userId`
  - Deletes the user specified by `userId`.
- `POST /api/users/:userId/friends/:friendId`
  - Adds the user specified by `friendId` to the friend list of the user specified by `userId`.
- `DELETE /api/users/:userId/friends/:friendId`
  - Removes the user specified by `friendId` from the friend list of the user specified by `userId`.

### Thoughts

- `GET /api/thoughts`
  - Returns a list of all thoughts.
- `POST /api/thoughts`
  - Creates a new thought.
  - Request body should include `thoughtText`, `username`, and `userId`.
- `PUT /api/thoughts/:thoughtId`
  - Updates the thought specified by `thoughtId`.
  - Request body should include any fields to be updated.
- `DELETE /api/thoughts/:thoughtId`
  - Deletes the thought specified by `thoughtId`.
- `POST /api/thoughts/:thoughtId/reactions`
  - Adds a new reaction to the thought specified by `thoughtId`.
  - Request body should include `reactionBody` and `username`.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`
  - Removes the reaction specified by `reactionId` from the thought specified by `thoughtId`.
