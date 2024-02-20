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
const paymentRoutes = require('./routes/payment');
const passport = require('./passport'); 
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;


// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
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

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
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
app.use('/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
