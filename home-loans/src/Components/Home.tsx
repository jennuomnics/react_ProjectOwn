
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header />

      <div className="mt-2 flex flex-col md:flex-row w-full h-[calc(100vh-64px)]">
        {" "}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img
            src="https://media.istockphoto.com/id/2214259782/photo/real-estate-agent-showing-house-to-senior-couple-customers.jpg?s=2048x2048&w=is&k=20&c=eruG0zDzfJRXPxOanG-ftr4LL36Ae-iRm4pdrQf28Po="
            alt="Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left bg-gray-50">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find the place you’ll love to live.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            From cozy apartments to spacious homes, we bring you the best
            properties in town. Start your journey — your dream home awaits.
          </p>
          <button
            onClick={() => navigate("/Login")}
            className="mt-8 px-6 py-3 bg-stone-800 text-white text-lg font-semibold rounded-full hover:bg-stone-700 transition"
          >
            Explore Homes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
