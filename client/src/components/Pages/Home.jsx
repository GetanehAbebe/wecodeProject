import React from "react";
import "../../App.css";
import Cards from "../sections/Cards";
import Header from "../sections/Header";
import Footer from "../sections/Footer";


function Home() {
  return (
    <div style={{ backgroundImage: `url(${'https://image.freepik.com/free-photo/different-spices-food-ingredients-wooden-spoon-whitetable-background_1220-1704.jpg'})` }}>
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;
