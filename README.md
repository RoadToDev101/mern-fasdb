# Simpson Strong-Tie Fastener Database

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that provides a fastener database for Simpson Strong-Tie. It allows users to search and filter through a variety of Simpson Strong-Tie fasteners and view detailed information about each one.

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies:
   > `npm run install:all`
3. Create a `.env` file in the root directory and add your MongoDB connection string as `MONGODB_URI`. (You will find the .env.template)
4. Start the development server by running `npm start`.

## Usage

To use this application, navigate to `http://localhost:3000` in your web browser. From there, you can search and filter through the fastener database by selecting various options such as product line, material, and coatings.

Clicking on a specific fastener will take you to a detailed page with information about the product, including its dimensions, load capacity, and installation instructions.
