# Simpson Strong-Tie Fastener Database

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that provides a fastener database for Simpson Strong-Tie. It allows users to search and filter through a variety of Simpson Strong-Tie fasteners and view detailed information about each one.

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in the root directory.
3. Create a `.env` file in the root directory and add your MongoDB connection string as `MONGODB_URI`.
4. Start the development server by running `npm run dev`.

## Usage

To use this application, navigate to `http://localhost:3000` in your web browser to view the home page. From there, you can search and filter through the fastener database by selecting various options such as product type, material, and coatings.

Clicking on a specific fastener will take you to a detailed page with information about the product, including its dimensions, load capacity, and installation instructions.

```
mern-fasdb
├─ .babelrc
├─ .git
├─ .gitignore
├─ client
│  ├─ .gitignore
│  ├─ build
│  │  ├─ favicon.ico
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ App.js
│     ├─ assets
│     │  ├─ icons
│     │  │  └─ favicon.ico
│     │  ├─ images
│     │  │  └─ logo.png
│     │  └─ wrappers
│     │     ├─ errorPage.js
│     │     ├─ landingPage.js
│     │     └─ registerPage.js
│     ├─ components
│     │  ├─ form
│     │  │  └─ formRow.js
│     │  ├─ index.js
│     │  └─ ui
│     │     ├─ alert.js
│     │     └─ logo.js
│     ├─ context
│     │  ├─ action.js
│     │  ├─ appContext.js
│     │  └─ reducer.js
│     ├─ features
│     │  ├─ authentication
│     │  │  ├─ components
│     │  │  │  └─ register.js
│     │  │  ├─ hooks
│     │  │  ├─ index.js
│     │  │  └─ services
│     │  ├─ projects
│     │  └─ settings
│     ├─ hooks
│     ├─ index.css
│     ├─ index.js
│     ├─ layouts
│     │  └─ Navbar.js
│     ├─ pages
│     │  ├─ dashboard.js
│     │  ├─ error.js
│     │  ├─ index.js
│     │  └─ landing.js
│     ├─ services
│     └─ utils
├─ package-lock.json
├─ package.json
├─ README.md
├─ server
│  ├─ config
│  ├─ controllers
│  │  ├─ authController.js
│  │  ├─ productController.js
│  │  └─ userController.js
│  ├─ database
│  │  └─ connection.js
│  ├─ middleware
│  │  ├─ errorHandler.js
│  │  └─ notFound.js
│  ├─ models
│  │  ├─ product.js
│  │  └─ user.js
│  ├─ routes
│  │  ├─ authRoutes.js
│  │  ├─ productRoutes.js
│  │  └─ userRoutes.js
│  └─ services
│     ├─ productRender.js
│     └─ userRender.js
├─ server.js
└─ webpack.config.js

```