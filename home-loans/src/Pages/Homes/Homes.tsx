import { useEffect,useState } from "react";

import HomesList from "./HomesList.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState} from "../../store.tsx";
import { addHome, fetchData} from "../../Slices/homeSlice.tsx";


import {  type FormikHelpers} from "formik";

import HomesModal from "../../Components/HomesModal.tsx";
import Loader from "../../Components/Loader.tsx";
import type { addHomeSchema } from "./HomesSchema.tsx";






const Homes = () => {

  const dispatch = useDispatch<AppDispatch>()
  const {homes,error,isLoading} = useSelector((state:RootState) => state.homes)

  const isAdmin = localStorage.getItem('isAdmin')

  


   const [searchTerm, setSearchTerm] = useState("");
   const [filterBHK, setFilterBHK] = useState("");
   const [sortOrder, setSortOrder] = useState(""); 
   const [filterAc,setFilterAc] = useState("")


   const filteredHomes = homes
     .filter(
       (home) =>
         home.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (filterBHK ? home.bhkType === filterBHK : true) && (filterAc ? filterAc === 'ac'?home.ac : !home.ac :true)
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
      <div className="flex items-center justify-between w-full max-w-7xl px-4 mb-6">
        <h1 className="text-stone-800 dark:text-stone-200 font-bold text-3xl">
          Homes
        </h1>
        {isAdmin && (
          <button
            onClick={handleOpen}
            className="py-2 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
          >
            + Add Home
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full max-w-7xl px-4 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 md:max-w-xs p-2 rounded-lg border border-gray-300 bg-white  text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filterAc}
          onChange={(e) => setFilterAc(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 bg-white  text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">All Ac Types</option>
          <option value="ac">Ac</option>
          <option value="non-ac">Non Ac</option>
    
        </select>

        <select
          value={filterBHK}
          onChange={(e) => setFilterBHK(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 bg-white  text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">All BHK Types</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK">4 BHK</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 bg-white  text-gray-800 focus:outline-none "
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {!isLoading && filteredHomes.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-7xl px-4">
          {filteredHomes.map((home) => (
            <HomesList home={home} key={home.id} />
          ))}
        </ul>
      )}
      {filteredHomes.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No Homes found matching your filters.
        </div>
      )}

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
