import { useDispatch, useSelector } from "react-redux";

import PlotItems from "./PlotItems";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { addPlot, getPlots } from "../../Slices/plotSlice";
import Loader from "../../Components/Loader";
import Modals from "../../Components/Modals";

import type { FormikHelpers } from "formik";
import type { plotSchema } from "./PlotSchema";



const intialValues = {
  title: "",
  location: "",
  price: 0,
  description: "",
  imageUrl: "",
   areaSqFt: 0,
  plotType: '',
  facingDirection: '',
  roadWidth: '',
  availability: '',
  nearbyAmenities:[]
};

const Plots = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    plots,
    isLoading,
    
  } = useSelector((state: RootState) => state.plots);


     const [searchTerm, setSearchTerm] = useState("");
     const [filterDirection, setFilterDirection] = useState("");
     const [sortOrder, setSortOrder] = useState("");
     const [filterPlotType,setFilterPlotType] = useState("")

     const isAdmin = localStorage.getItem('isAdmin')

     const filteredPlots = plots
       .filter(
         (home) =>
           home.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterDirection ? home.facingDirection === filterDirection : true) && 
           (filterPlotType ? home.plotType === filterPlotType : true)
       )
       .sort((a, b) => {
         if (sortOrder === "asc") return a.price - b.price;
         if (sortOrder === "desc") return b.price - a.price;
         return 0;
       });


  useEffect(() => {
    dispatch(getPlots());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

    const handleSubmit = (
      Values: plotSchema,
      action: FormikHelpers<plotSchema>
    ) => {
      setOpen(false);
    
      dispatch(addPlot(Values));
      action.resetForm();
      dispatch(getPlots());
    };

  return (
    <div className="flex flex-col items-center p-5 h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 mt-3 ml-3">
      <div className="flex items-center justify-between w-full max-w-7xl px-4 mb-6">
        <h1 className="text-stone-800 dark:text-stone-200 font-bold text-3xl">
          Plots
        </h1>
        {isAdmin && (
          <button
            onClick={handleOpen}
            className="py-2 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
          >
            Add Plot
          </button>
        )}
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
          value={filterPlotType}
          onChange={(e) => setFilterPlotType(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none "
        >
          <option value="">All Plot Types</option>
          <option value="Industrial">Industrial</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        <select
          value={filterDirection}
          onChange={(e) => setFilterDirection(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none "
        >
          <option value="">Filter by Direction</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
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
      {!isLoading && filteredPlots.length > 0 && (
        <ul className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredPlots.map((plot) => (
            <PlotItems plot={plot} key={plot.id} />
          ))}
        </ul>
      )}
      {filteredPlots.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No flats found matching your filters.
        </div>
      )}
      {open && (
        <Modals
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          intialValues={intialValues}
          fun="Add"
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Plots;
