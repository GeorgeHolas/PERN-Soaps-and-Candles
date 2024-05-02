### **The Ecommerce of Soaps and Candles**

The E-commerce of Soaps and Candles is a project, that uses React for the front-end and Node/Express for the backend API server. The front-end allows users to view products, add them to a cart, and checkout. The backend handles API routes for products, customers, orders and more.

### **Backend API Server**
The Node/Express server is located in the `server` directory.

#### **Functionality:**
- Customers
- Products
- Cart
- Orders
- Auth and user registration
- Payments

#### **Middleware used:**
- CORS
- Body parsing
- Sessions
- Passport for authentication
- Swagger docs

The main entry point is `server.js`, which configures the Express app and middleware.

API routes are defined in modules under `routes/`.

Swagger API docs are served at `/api-docs` to document the endpoints.

### **Frontend React App**
The React frontend app is located in the `client` directory.

#### **Technologies:**

#### **Frontend**
- **React** - Frontend framework
- **Create React App** - Bootstrap and build scripts
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

#### **Backend**
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **PostgreSQL** - Database
- **Passport.js** - Authentication
- **Swagger** - API documentation

### **API Endpoints**
The main endpoints provided include:

- **GET** `/api/products` - Get a list of products
- **GET** `/api/products/:id` - Get a single product
- **POST** `/api/products` - Create a new product (admin only)
- **GET** `/api/customers` - Get a list of customers
- **GET** `/api/customers/:id` - Get a single customer
- **POST** `/api/customers` - Create a new customer
- **GET** `/api/orders` - Get a list of orders (admin only)
- **GET** `/api/orders/:id` - Get a single order (admin only)
- **POST** `/api/orders` - Create a new order
- **POST** `/api/auth/login` - Authenticate and login a user
- **POST** `/api/auth/register` - Register a new user

### **Running the Frontend and Backend**
To run the frontend app locally, use the following commands:

```bash
cd client
npm install
npm start
```
To run the backend locally, use the following commands:
```bash
cd server 
npm install
node server.js
```
