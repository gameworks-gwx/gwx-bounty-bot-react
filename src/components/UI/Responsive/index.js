import React, { useState, useEffect } from 'react';

const Responsive = ({ device, children }) => {
  const [display, setDisplay] = useState(true);

  const updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0

    if (device === "mobile") {
      const maxWidth = 900;

      if (windowWidth >= maxWidth) {
        setDisplay(false);
      } else {
        setDisplay(true)
      }
    } else if (device === "pc") {
      const minWidth = 900;

      if (windowWidth <= minWidth) {
        setDisplay(false)
      } else {
        setDisplay(true)
      }
    }
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions);
  }, [])

  return (
    <>
      {display ? children : null}
    </>
  )
}

export default Responsive