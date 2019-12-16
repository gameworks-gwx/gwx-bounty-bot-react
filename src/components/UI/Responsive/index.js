import { useState, useEffect } from 'react';

const Responsive = ({ device, children }) => {
  const [display, setDisplay] = useState(true);


  useEffect(() => {
    const updateDimensions = () => {
      let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
      const mobileWidth = 900;

      if (device === "mobile") {

        if (windowWidth >= mobileWidth) {
          setDisplay(false);
        } else {
          setDisplay(true)
        }

      } else if (device === "pc") {
        if (windowWidth <= mobileWidth) {
          setDisplay(false)
        } else {
          setDisplay(true)
        }
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions);

  }, [device])

  return display ? children : null

}

export default Responsive