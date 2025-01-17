import { SwipeCarousel } from "./Carousel";
const Hero = () => {
  return (
    <>
      <SwipeCarousel/>
      <div className="px-4 md:px-10 mx-auto">
        <p className="text-4xl md:text-5xl lg:text-7xl poppins-medium text-neutral-800">
          Simply Unique<span className="text-neutral-600">/</span>
          <br/>
          Simply Better <span className="text-neutral-600">.</span>
        </p>
      </div>
    </>
  );
};

export default Hero;
