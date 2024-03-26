This project consists of a React frontend client and Node/Express backend API server. The frontend allows users to view products, add them to a cart, and checkout. The backend handles API routes for products, customers, orders, etc.

Backend API Server
The Node/Express server is located in the server directory.

It handles API routes for:

Customers
Products
Cart
Orders
Auth and user registration
Payments
It uses middleware for:

CORS
Body parsing
Sessions
Passport for authentication
Swagger docs
The main entry point is server.js which configures the Express app and middleware.

API routes are defined in modules under routes/.

Swagger API docs are served at /api-docs to document the endpoints.

Frontend React App
The React frontend app is located in the client directory.

It was bootstrapped with Create React App and contains components for:

Viewing products
Adding to cart
Checking out
Authentication
The main scripts are:

npm start - starts dev server
npm run build - builds production bundle
npm test - runs tests
React documentation can be found at https://reactjs.org/

The app is configured to make API calls to the backend Express server.

Deployment
The frontend and backend can be deployed separately. The React app can be served static files from the build folder. The Express API server can be deployed to a server or hosting like Heroku.

Let me know if you need any other specifics documented! I can expand on any section or add additional info as needed.

