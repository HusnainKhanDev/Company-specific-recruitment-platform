import React from 'react';

const Carousel = () => {
  return (
    <div className="carousel w-full h-[95vh] rounded-xl overflow-hidden">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-full">
        {/* Background Image via Tailwind */}
        <div className="absolute inset-0 bg-[url('/img1.jpg')] bg-cover bg-center bg-no-repeat blur-[2px] z-0" />

        {/* Overlay text */}
        <div className="absolute inset-0 bg-black/30 z-10 flex items-end justify-center text-center pb-12 px-4">
          <h2 className="text-white text-xl">
            Collaborate in an environment built for growth, innovation, and support. When you work with us, you're not just completing tasks you're moving closer to your goals with every step.
          </h2>
        </div>

        {/* Navigation */}
        <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❮</a>
          <a href="#slide2" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-full">
        <div className="absolute inset-0 bg-[url('/img2.jpg')] bg-cover bg-center bg-no-repeat blur-[2px]  z-0" />
        <div className="absolute inset-0 bg-black/30 z-10 flex items-end justify-center text-center pb-12 px-4">
          <h2 className="text-white text-xl">
            Unlock your full potential by joining a team that believes in continuous learning, practical experience, and personal development. Grow your skills with us and shape the future you deserve.
          </h2>
        </div>
        <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❮</a>
          <a href="#slide3" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-full">
        <div className="absolute inset-0 bg-[url('/img3.jpg')] bg-cover bg-center bg-no-repeat blur-[2px]  z-0" />
        <div className="absolute inset-0 bg-black/30 z-10 flex items-end justify-center text-center pb-12 px-4">
          <h2 className="text-white text-xl">
            Start your journey with the right knowledge, turn it into real-world solutions, and achieve milestones that matter. Learn with passion, build with purpose, and succeed with confidence.
          </h2>
        </div>
        <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❮</a>
          <a href="#slide1" className="btn btn-circle bg-white/10 border-white text-white hover:bg-white/50">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
