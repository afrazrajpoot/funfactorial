import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { cardSlidesImagesData } from "@/app/data";
import Slider from "react-slick";

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: 1,
        position: "absolute",
        [direction === "left" ? "left" : "right"]: "10px",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        transition: "background-color 0.3s, color 0.3s",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.color = "red";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "black";
        e.currentTarget.style.color = "white";
      }}
    >
      {direction === "left" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};
export const cardSlidesImages = () => {
  var settings2 = {
    // dots: true,
    arrow: false,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    // autoplay: true,
  };
  return (
    <section className="mt-[1vw] w-full max-w-[96vw] m-auto">
      <Slider {...settings2}>
        { cardSlidesImagesData && cardSlidesImagesData.length > 0 && cardSlidesImagesData?.map((image, index) => {
          return (
            <div key={index} className="flex gap-[1vw]">
              <img src={image.img} alt="slide image" className="" />
            </div>
          );
        })}
      </Slider>
    </section>
  );
};
