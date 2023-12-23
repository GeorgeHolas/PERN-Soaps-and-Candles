const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const user = await pool.query('SELECT * FROM public."Customers" WHERE username = $1', [username]);

      console.log('User:', user.rows[0]);
      if (user.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user.rows[0]);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        const userQuery = await pool.query('SELECT * FROM public."Customers" WHERE google_id = $1', [profile.id]);

        if (userQuery.rows.length > 0) {
          // User already exists, return the user
          return done(null, userQuery.rows[0]);
        }

        // User does not exist, create a new user
        const newUserQuery = await pool.query(
          'INSERT INTO public."Customers" (google_id, username, email) VALUES ($1, $2, $3) RETURNING *',
          [profile.id, profile.displayName, profile.emails[0].value]
        );

        return done(null, newUserQuery.rows[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.Customer_id);
});

passport.deserializeUser(async (Customer_id, done) => {
  try {
    const user = await pool.query('SELECT * FROM public."Customers" WHERE "Customer_id" = $1', [Customer_id]);
    
    if (user.rows.length === 0) {
      console.log('User not found.');
      return done(null, false); 
    }

    console.log('Deserialized user:', user.rows[0]);
    done(null, user.rows[0]);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});


module.exports = passport;
