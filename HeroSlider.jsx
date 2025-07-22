import React, { useEffect, useRef, useState } from "react";
import productsData from "../data/products.json";
import "../styles/heroSlider.css";

const HeroSlider = () => {
  const slides = productsData.products
    .slice(5, 8)
    .map((product) => [product.header[0], product.header[1]]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("next");
  const slideRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  const startAutoSlide = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % slides.length, "next");
    }, 4000);
  };

  const goToSlide = (index, dir) => {
    if (index === currentIndex) return;
    setPrevIndex(currentIndex);
    setDirection(dir);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (prevIndex === null) return;

    const current = slideRefs.current[currentIndex];
    const previous = slideRefs.current[prevIndex];

    if (previous) {
      previous.classList.add(direction === "next" ? "next1" : "prev1");
    }

    if (current) {
      current.classList.add(direction === "next" ? "next2" : "prev2");
    }

    const timeout = setTimeout(() => {
      if (previous) {
        previous.className = "hero-slide";
      }
      if (current) {
        current.className = "hero-slide active";
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="hero-page w-[85%] relative mb-[0.5vw] m-auto mt-3">
      <div className="hero-flex-layout">
        {/* Slider */}
        <div className="slider rounded-xl">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-10"></div>
          {slides.map((imagePair, i) => (
            <div
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
              className={`hero-slide ${i === 0 ? "active" : ""}`}
            >
              <div className="hero-overlay">
                <h2>{productsData.products[i].name}</h2>
                <p>
                  {productsData.products[i].subtitle ||
                    productsData.products[i].category}
                </p>
                <button className="shop-now-btn">Shop Now</button>
              </div>
              <img src={imagePair[0]} alt={`slide-${i}-img1`} />
              <img src={imagePair[1]} alt={`slide-${i}-img2`} />
            </div>
          ))}
        </div>

        {/* Delivery Box */}
        <div className="delivery-box-outside-slider">
          <p className="delivery-heading">
            <span className="delivery-icon">🕒</span> Delivery in
          </p>
          <h2 className="delivery-timer">9:58</h2>
          <p className="delivery-location">745M+F6P</p>
          <button className="delivery-btn-purple">
            <span role="img" aria-label="pin">📍</span> Location
          </button>
          <button className="delivery-btn-green">
            <span role="img" aria-label="schedule">🕒</span> Schedule
          </button>
        </div>
      </div>

      <div className="dotsContainer">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(i, i > currentIndex ? "next" : "prev")}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
