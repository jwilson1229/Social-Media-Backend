# Social Media API

This project is a social media API built using **Node.js**, **Express.js**, and **MongoDB**. It provides basic CRUD operations for managing users, thoughts, reactions, and friends. Users can make thoughts, interact with other users by adding friends, and react to thoughts.

## Features

- Ability to create thoughts and associate reactions with thoughts
- Friend management, including adding and removing friends
- Reaction management on thoughts

## Technologies Used

- **Node.js**: JavaScript runtime for building the API server
- **Express.js**: Web framework for routing and handling HTTP requests
- **MongoDB**: NoSQL database for storing user and thought data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **TypeScript**: For type safety and improved development experience
- **Cors**: To enable Cross-Origin Resource Sharing

## API Endpoints

### User Routes

- **GET /users**: Get all users
- **GET /users/:id**: Get a single user by ID
- **POST /users**: Create a new user
- **PUT /users/:id**: Update a user by ID
- **DELETE /users/:id**: Delete a user by ID

### Thought Routes

- **GET /thoughts**: Get all thoughts
- **GET /thoughts/:id**: Get a single thought by ID
- **POST /thoughts**: Create a new thought
- **PUT /thoughts/:id**: Update a thought by ID
- **DELETE /thoughts/:id**: Delete a thought by ID

### Friend Routes

- **POST /users/:userId/friends/:friendId**: Add a friend to a user
- **DELETE /users/:userId/friends/:friendId**: Remove a friend from a user

### Reaction Routes

- **POST /thoughts/:thoughtId/reactions**: Add a reaction to a thought
- **DELETE /thoughts/:thoughtId/reactions/:reactionId**: Delete a reaction from a thought

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud MongoDB instance)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/social-media-api.git
   cd social-media-api
