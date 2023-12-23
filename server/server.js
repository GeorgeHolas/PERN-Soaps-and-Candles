const express = require('express');
const session = require('express-session');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customers');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/users');
const passport = require('./passport'); 
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Handle the root path
app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

// Swagger Options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
  },
  // Path to the API docs and YAML file
  apis: ['./routes/*.js', './swagger.yaml'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Google OAuth route to initiate the login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for handling the result of Google OAuth
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/home'); // Redirect to the home page or any desired route
  }
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

// Routes
app.use('/customers', customerRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/', registerRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
