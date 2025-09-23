import Header from "./Header"


const Home = () => {
  return (
    <div className="flex flex-col bg-white h-screen">
      
      <Header />
     
      <div className="flex justify-center items-center text-xl h-[100%] font-serif">
        <h1 className="mx-auto text-4xl w-250 leading-15">
          Find the place you’ll love to live.{" "}
          <span className="bg-stone-800 text-white text-3xl p-3 italic">
            {" "}
            From cozy apartments to spacious homes,
          </span>
          We bring you the best properties in town. Start your journey — your
          dream home awaits.
        </h1>
      </div>
    </div>
  );
}

export default Home