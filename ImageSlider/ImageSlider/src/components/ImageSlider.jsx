import { useState, useEffect, useCallback } from "react";
import data from "./data";
import "./styles.css"



function ImageSlider() {
  const [selectedImage, setSelectedImage] = useState(0);
  const handlePreviousClick = () => {
    setSelectedImage(!selectedImage ? data.length - 1 : selectedImage - 1 );
  }

  const handleNextClick = useCallback(() => {
    setSelectedImage(selectedImage === data.length - 1 ?
      ((selectedImage + 1) % data.length) :
      selectedImage + 1);
    
  }, [selectedImage])

  useEffect(() => {
    const intervalId = setTimeout(() => {
      handleNextClick()
    }, 5000);

     return () => {
      clearTimeout(intervalId);
    }

  },
   
  [selectedImage, handleNextClick])
  
  return (
    <div className="imageWrapper">
      <h2>Developer setup designs</h2>
      <h3>Use buttons to navigate or wait for 5 seconds for image to change automatically</h3>
      
      {
        data.map((url, i) =>
          selectedImage === i ?
             <img className="image"
            key={i}
            src={url}
              alt=""
            style={
              {"display": "block"}
            }/> :
             <img className="image"
            key={i}
            src={url}
              alt=""
              style={
              {"display": "none"}
            }/>
         )
     }
      <div className="imageWrapper__buttons">
        <button onClick={handlePreviousClick}>Previous Image</button>
        <button onClick={handleNextClick}>Next Image</button>
      </div>
   </div>
  )
}

export default ImageSlider;
