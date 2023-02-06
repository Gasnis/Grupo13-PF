import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import styles from "../Carousel/Carousel.module.css";
import Banner from "../../utils/Banner.jpg";

export default function Promos() {
  const imageData = [
    {
      alt: "image1",
      url:
        Banner
    },
    {
      alt: "image2",
      url:
       "https://cdn.shopify.com/s/files/1/1103/5152/collections/Banner_Media_2500x900_4a23d3a5-e13d-428b-99ad-458a787e8f6d_1440x.progressive.jpg?v=1607621293"
    },
    {
      alt: "image3",
      url: "https://www.beerhouse.mx/static/ed981521dcdf29b6ad271ef7e7f23f93/3bf79/eeeb533b-c3c9-4c01-a5c1-3fe17e5adae7_HOME-BANNER-PACKS-NAVIDAD-SIN-CTA-8-DIC-2021.png"
    },
    {
      alt: "image4",
      url:
        "https://admin.tuyu.mx/fotos_producto/_qdIb0.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState();

  function handleChange(index) {
    setCurrentIndex(index);
  }

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} className={styles.images} />
    </div>
  ));

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className={styles.carousel}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}