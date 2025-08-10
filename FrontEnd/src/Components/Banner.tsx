import { CardSpotlight } from "../Aceternity_Utils/CardSpotLight";

export function Banner() {
  return (
    <CardSpotlight
      color="#601a73"
      className="relative h-[70vh] w-full bg-cover bg-center text-white overflow-hidden shadow-lg"
      style={{ backgroundImage: "url('/banner2.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-transparent z-20 ">
        <h2 className="text-xl font-bold">JobFinder</h2>
        <ul className="flex space-x-6 text-sm text-gray-200">
          <li className="hover:font-semibold text-white cursor-pointer">Home</li>
          <li className="hover:font-semibold text-white cursor-pointer">Jobs</li>
          <li className="hover:font-semibold text-white cursor-pointer">About</li>
          <li className="hover:font-semibold text-white cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 space-y-6 items-start max-w-2xl">
        
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your Dream Job Today!
          </h1>
          <p className="text-gray-200">
            Connecting Talent with Opportunity for Career Success
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg w-full max-w-lg">
          
          {/* Search Icon + Input */}
          <div className="flex items-center px-4">
            <i className="ri-search-line text-gray-500 text-lg"></i>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="p-3 w-48 text-black outline-none"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* Country Dropdown */}
          <select
            className="px-4 py-3 text-black outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Find By
            </option>
            <option value="workSetup">Work Setup</option>
            <option value="jobType">Job Type</option>
            <option value="title">Title</option>
          </select>

          {/* Button */}
          <button className="bg-blue-700 px-5 py-3 ml-2 flex items-center justify-center text-white hover:bg-gray-800 transition">
            <i className="ri-arrow-right-line text-lg"></i>
          </button>
        </div>

      </div>
    </CardSpotlight>
  );
}
