"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommunityCard from "../cards/CommunityCard";

const CarouselComponent = ({ comms }: { comms: any }) => {
  const community = JSON.parse(comms);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.3,
      swipeable: true,
      draggable: true,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {community.map((com: any) => (
        <CommunityCard
          key={com._id}
          id={com._id.toString()}
          image={com.header_image}
          name={com.name}
          themeColor={com.themeColor}
        />
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
