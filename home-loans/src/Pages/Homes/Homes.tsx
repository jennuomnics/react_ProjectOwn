import { useEffect,useState } from "react";

import HomesList from "./HomesList.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState} from "../../store.tsx";
import { addHome, fetchData} from "../../Slices/homeSlice.tsx";


import {  type FormikHelpers} from "formik";

import HomesModal from "../../Components/HomesModal.tsx";
import Loader from "../../Components/Loader.tsx";





interface addHomeSchema {
  id?: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  bhkType: string;
  bedrooms: number;
  bathrooms: number;
  kitchenCount: number;
  pujaRoom: boolean;
  ac: boolean;
  amenitiesNearby: string[];
}

const Homes = () => {

  const dispatch = useDispatch<AppDispatch>()
  const {homes,error,isLoading} = useSelector((state:RootState) => state.homes)


   const [searchTerm, setSearchTerm] = useState("");
   const [filterBHK, setFilterBHK] = useState("");
   const [sortOrder, setSortOrder] = useState(""); 

   const filteredHomes = homes
     .filter(
       (home) =>
         home.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (filterBHK ? home.bhkType === filterBHK : true)
     )
     .sort((a, b) => {
       if (sortOrder === "asc") return a.price - b.price;
       if (sortOrder === "desc") return b.price - a.price;
       return 0;
     });



   const [open, setOpen] =useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);


  const handleAddHome = (values: addHomeSchema, actions:FormikHelpers<addHomeSchema>) => {
     console.log(values)
    dispatch(addHome(values));
    handleClose();
    actions.resetForm()
  };


  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);



   

    if(error) {
      return <p>{error}</p>
    }


  return (
    <div className="flex flex-col items-center p-5 h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 mt-3 ml-3">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-7xl px-4 mb-6">
        <h1 className="text-stone-800 dark:text-stone-200 font-bold text-3xl">
          Homes
        </h1>
        <button
          onClick={handleOpen}
          className="py-2 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
        >
          Add Home
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full max-w-7xl px-4 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 md:max-w-xs p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filterBHK}
          onChange={(e) => setFilterBHK(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none "
        >
          <option value="">Filter by BHK</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK">4 BHK</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none "
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {!isLoading && <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 w-full max-w-7xl px-4">
        {filteredHomes.map((home) => (
          <HomesList home={home} key={home.id} />
        ))}
      </ul>}

      {open && (
        <HomesModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          intialValues={{
            title: "",
            location: "",
            price: 0,
            description: "",
            imageUrl: "",
            bhkType: "",
            bedrooms: 0,
            bathrooms: 0,
            kitchenCount: 0,
            pujaRoom: false,
            ac: false,
            amenitiesNearby: [],
          }}
          fun="Add"
          handleSubmit={handleAddHome}
        />
      )}
    </div>
  );
};

export default Homes;
