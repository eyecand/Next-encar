// src/components/ProductCard.jsx
import React from "react";
import "./product-card.css"; // Import css
// export interface Props {
//   images: string[];
//   title: string;
//   description: string;

//   price: number;
// }
//
export const ProductCard = () => {
  // const { images, title, description, price } = product;
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const sliderRef = useRef(null);
  // const imageRefs = useRef([]);
  // const indicatorRefs = useRef([]);

  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  // useEffect(() => {
  //   if (sliderRef.current) {
  //     sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  //   }
  // }, [currentIndex]);

  // useEffect(() => {
  //   const measureImageWidths = () => {
  //     if (imageRefs.current.some((ref) => ref && ref.offsetWidth > 0)) {
  //       const indicatorWidth = imageRefs.current[0].offsetWidth / images.length;
  //       indicatorRefs.current.forEach((ref) => {
  //         if (ref) {
  //           ref.style.width = `${indicatorWidth}px`;
  //         }
  //       });
  //     }
  //   };

  //   measureImageWidths();
  // }, [images, currentIndex]);
  return <h5>Hello</h5>;
  // return (
  //   <div className="product-card">
  //     <div className="image-container">
  //       <div className="slider" ref={sliderRef}>
  //         {images.map((image, index) => (
  //           <img
  //             key={index}
  //             src={image}
  //             alt={`Product Image ${index + 1}`}
  //             className="slide-image"
  //             ref={(el) => (imageRefs.current[index] = el)}
  //           />
  //         ))}
  //       </div>
  //       <div className="slide-indicators hover:flex">
  //         {images.map((_, index) => (
  //           <button
  //             className="h-full grid"
  //             key={index}
  //             ref={(el) => (indicatorRefs.current[index] = el)}
  //             onMouseOver={() => goToSlide(index)}
  //           >
  //             <div
  //               className={`indicator-line ${
  //                 currentIndex === index ? "active" : ""
  //               }`}
  //             ></div>
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="product-details">
  //       <h2>{title}</h2>
  //       <p>{description}</p>
  //       <p className="price">${price.toFixed(2)}</p>
  //     </div>
  //   </div>
  // );
};
