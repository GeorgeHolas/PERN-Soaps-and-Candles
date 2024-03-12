/**
 * Home component displays the home page content.
 *
 * Renders intro video, history/about text sections, product images,
 * and Footer component.
 *
 * Has useEffect hook to fade in images on scroll using CSS opacity.
 */
// Home.js
import React, { useEffect } from "react";
import video from "../../resources/arrangement-of-natural-soaps-and-candles.webm";
import styles from "./home.module.css";

// Footer component
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>&copy; 2024 LIŠKA Soaps & Candles. All rights reserved.</p>
    </div>
  );
};

// Home component
function Home() {
  useEffect(() => {
    const fadeInImages = () => {
      const images = document.querySelectorAll(
        `.${styles.imageOne}, .${styles.imageTwo}, .${styles.text}`
      );
      images.forEach((image, index) => {
        setTimeout(() => {
          image.style.opacity = "1";
        }, index * 1500);
      });
    };
    // Fade in the images after a certain duration
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.5) {
        fadeInImages();
        // Remove the event listener after it's triggered to avoid unnecessary calls
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.introContainer}>
        <video className={styles.introVideo} autoPlay loop muted>
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.container}>
        <div className={styles.historyContainer}>
          <div className={styles.history}>
            <h2>
              Welcome to <span className={styles.whiteTextTwo}>our store</span>
            </h2>
            <p>
              At LIŠKA Soaps & Candles, we take pride in crafting exquisite
              handmade soaps and candles that bring a touch of luxury to your
              everyday life. Our passion for creating unique, high-quality
              products stems from a commitment to natural ingredients, artistic
              design, and sustainable practices.
            </p>

            <h4>Our Story</h4>
            <p>
              Established in 2010, LIŠKA began as a small, family-owned business
              with a vision to create handcrafted goods that not only indulge
              the senses but also promote well-being. Inspired by the beauty of
              nature, our journey started in a humble workshop where every soap
              and candle was meticulously crafted by hand.
            </p>

            <h4>Artistry in Every Product</h4>
            <p>
              Our artisans are dedicated to the art of soap and candle making.
              Each product is carefully formulated using the finest natural
              ingredients, including nourishing oils, botanicals, and premium
              essential oils. The result is a collection that not only cleanses
              and uplifts but also showcases the beauty of craftsmanship.
            </p>

            <h4>Explore Our Collections</h4>
            <p>
              Handmade Soaps: Indulge in the rich lather and delightful scents
              of our handmade soaps. From calming lavender to refreshing citrus,
              each soap is a sensory experience. Artisan Candles: Illuminate
              your space with the warm glow of our artisan candles. Crafted in
              small batches, our candles are available in a variety of
              captivating fragrances.
            </p>

            <h4>Visit Our Store</h4>
            <p>
              Experience the essence of LIŠKA Soaps & Candles by visiting our
              stores or exploring our online shop. Discover the perfect blend of
              nature-inspired beauty and craftsmanship. Thank you for being part
              of our journey. We invite you to immerse yourself in the world of
              LIŠKA Soaps & Candles. Crafted with Love, Inspired by Nature.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <h2>
              Our Products
              <span className={styles.whiteText}> are handcrafted</span>
            </h2>
            <div className={styles.imageOne}></div>
            <p className={styles.text}>
              <strong>Our handmade soaps</strong> are a testament to the
              harmonious blend of natural ingredients and skilled craftsmanship.
              Immerse yourself in the luxurious lather and captivating scents
              that each soap bar offers. From the calming notes of lavender to
              the invigorating freshness of citrus, every soap is a sensory
              journey, carefully curated to pamper your skin and soothe your
              senses.
            </p>

            <div className={styles.imageTwo}></div>
            <p className={styles.text}>
              <strong>We believe in the power</strong> of natural ingredients.
              Our soaps are formulated with nourishing oils, botanicals, and
              premium essential oils, ensuring a gentle and indulgent cleansing
              experience. Our candles are made with eco-friendly wax, and we
              prioritize sustainable practices to minimize our environmental
              footprint. Our handmade soaps are a testament to the harmonious
              blend of natural ingredients and skilled craftsmanship. Immerse
              yourself in the luxurious lather and captivating scents that each
              soap bar offers. From the calming notes of lavender to the
              invigorating freshness of citrus, every soap is a sensory journey,
              carefully curated to pamper your skin and soothe your senses.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
