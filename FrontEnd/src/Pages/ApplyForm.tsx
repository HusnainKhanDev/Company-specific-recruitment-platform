import React, { useState } from 'react';

const ApplyForm = () => {
  let arr = [
    "#slide1",
    "#slide2",
    "#slide3",
    "#slide4"
  ];
  const [counter, setCounter] = useState(0);

  window.location.href = arr[counter];

  return (
    <div className="p-6 space-y-6 w-screen h-screen bg-[#d1d1d1]">
      {/* Steps Indicator */}
      <div className="flex justify-center text-lg h-20">
        <ul className="steps w-[50%] ">
          <li className={` step ${counter >= 0 ? "step-primary" : ""}`}>Personal Info</li>
          <li className={`step ${counter >= 1 ? "step-primary" : ""}`}>Professional Profile</li>
          <li className={`step ${counter >= 2 ? "step-primary" : ""}`}>Work Experience</li>
          <li className={`step ${counter >= 3 ? "step-primary" : ""}`}>Review & Submit</li>
        </ul>
      </div>

      {/* Carousel */}
      <div className="carousel w-[60%] ml-[21%] rounded-lg  shadow-black shadow-lg ">
        
        {/* Slide 1 - Personal Information */}
        <div id="slide1" className="carousel-item relative w-full">
            <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-5'>
                <h2 className="text-2xl text-white font-bold">Personal Information</h2>
                <input type="text" placeholder="Full Name" className="input input-bordered w-[600px] border-2 hover:border-black" />
                <input type="email" placeholder="Email" className="input input-bordered w-[600px] border-2 hover:border-black" />
                <input type="tel" placeholder="Phone" className="input input-bordered w-[600px] border-2 hover:border-black" />
            </div>
        </div>


        {/* Slide 2 - Professional Profile */}
        <div id="slide2" className="carousel-item relative w-full">
            <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-5'>
                <h2 className="text-2xl text-white font-bold">Professional Profile</h2>
            <div className="w-[600px] py-2 bg-white rounded-lg flex items-center px-5  border-2 hover:border-black cursor-pointer">
              <p className="text-gray-400">Choose Resume</p>
              <p className='ml-5'>Resume</p>
              <input
                type="file"
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </div>

                <input type="text" placeholder="LinkdIn Profile" className="input input-bordered w-[600px] border-2 hover:border-black" />
                <textarea rows={4} placeholder="Tell us something about you" className=" textarea w-[600px] shadow-lg"></textarea>
            </div>
        </div>

        {/* Slide 3 - Work Experience */}
        <div id="slide3" className="carousel-item relative w-full">
            <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-5'>
                <h2 className="text-2xl text-white font-bold">Work Experience</h2>
                <input type="text" placeholder="Company Name" className="input input-bordered w-[600px] border-2 hover:border-black"/>
                <input type="text" placeholder="Position" className="input input-bordered w-[600px] border-2 hover:border-black"/>
                <div className="w-[600px] bg-white rounded-lg flex items-center px-5 justify-between border-2 hover:border-black">
                    <p className='text-gray-400'>Starting Date</p>
                    <input type="date" placeholder="Starting Date" className="input w-[450px]" />
                </div>
                  <div className="w-[600px] bg-white rounded-lg flex items-center px-5 justify-between border-2 hover:border-black">
                    <p className='text-gray-400'>End Date</p>
                    <input type="date" placeholder="Starting Date" className="input w-[450px]" />
                </div>
            </div>
        </div>

        {/* Slide 4 - Review */}
        <div id="slide4" className="carousel-item relative w-full">
            <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-2 text-white'>
                <h2 className="text-2xl text-white font-bold">Review & Submit</h2>
                <hr />
                <p>Name: </p>
                <p>Email: </p>
                <p>Phone: </p>
                <hr />
                <p>LinkdIn Profile: </p>
                <p>Resume: </p>
                <hr />
                <p>Company Name: </p>
                <p>Position: </p>
                <p>Start Date: </p>
                <p>End Date: </p>
                <button
                className='absolute top-[80%] left-[82%] h-10 bg-white text-black w-28 transition-transform duration-300 hover:scale-110 hover:font-medium rounded-lg'>
                    Submit 
                </button>
                    
            </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-[60%] ml-[21%]">
        <button
          onClick={() => setCounter(counter - 1)}
          className={`btn btn-primary w-32 h-14 text-lg  ${counter === 0 ? 'btn-disabled' : ''}`}
        >
          Previous
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className={`btn btn-success w-32 h-14 text-lg ${counter === 3 ? 'btn-disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApplyForm;
