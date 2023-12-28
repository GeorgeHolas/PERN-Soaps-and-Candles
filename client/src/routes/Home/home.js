import React from 'react';
import styles from './home.module.css';

function Home() {
    return (
      <>
        <div className={styles.homeBody}>
        <div className={styles.homeContainer}>
          <h3>LIŠKA</h3>
          <h1>Soaps & Candles</h1>
        </div>
          <div className={styles.historyContainer}>
           <div className={styles.history}>
             <h2>Welcome to LIŠKA Soaps & Candles</h2>
           
             <p>At LIŠKA Soaps & Candles, we take pride in crafting exquisite handmade soaps and candles that bring a touch of luxury to your everyday life. Our passion for creating unique, high-quality products stems from a commitment to natural ingredients, artistic design, and sustainable practices.</p>

             <h4>Our Story</h4>
             <p>Established in 2010, LIŠKA began as a small, family-owned business with a vision to create handcrafted goods that not only indulge the senses but also promote well-being. Inspired by the beauty of nature, our journey started in a humble workshop where every soap and candle was meticulously crafted by hand.</p>

             <h4>Artistry in Every Product</h4>
             <p>Our artisans are dedicated to the art of soap and candle making. Each product is carefully formulated using the finest natural ingredients, including nourishing oils, botanicals, and premium essential oils. The result is a collection that not only cleanses and uplifts but also showcases the beauty of craftsmanship.</p>

            
             <h4>Explore Our Collections</h4>
             <p>Handmade Soaps: Indulge in the rich lather and delightful scents of our handmade soaps. From calming lavender to refreshing citrus, each soap is a sensory experience.</p>

             <p>Artisan Candles: Illuminate your space with the warm glow of our artisan candles. Crafted in small batches, our candles are available in a variety of captivating fragrances.</p>

             <h4>Visit Our Store</h4>
             <p>Experience the essence of LIŠKA Soaps & Candles by visiting our stores or exploring our online shop. Discover the perfect blend of nature-inspired beauty and craftsmanship.</p>

             <p>Thank you for being part of our journey. We invite you to immerse yourself in the world of LIŠKA Soaps & Candles.</p>

             <p>Crafted with Love, Inspired by Nature.</p>
             </div>
             <div className={styles.ourHistory}>
          <h1>Our Producst are hand crafted</h1>
            </div>
          <div className={styles.imageContainer}>
            </div>
          </div>
         </div>
      </>
    );
  };


  export default Home;
  