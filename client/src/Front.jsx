import React from "react";
import Navbar from "./Navbar";

function Front() {
  return (
    <>
      <Navbar />
	  <div style={{ backgroundImage: `url(/all.avif)`, backgroundSize: 'cover',width: '100%', height: '100vh',backgroundPosition: 'center',  }} />


    </>
  );
}

export default Front;
