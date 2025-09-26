import { useState } from "react";
import { deletePlots, getPlots, updatePlots } from "../../Slices/plotSlice";
import Modals from "../../Components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store";
import type { FormikHelpers } from "formik";
import { addToCart } from "../../Slices/cartSlice";
import toast from "react-hot-toast";
import {
  HomeIcon,
  Squares2X2Icon,
  ArrowUpRightIcon,
  MapIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { plotSchema } from "./PlotSchema";

interface plotDetails {
    plot:plotSchema
}

const PlotItems = ({plot}:plotDetails) => {

    const dispatch = useDispatch<AppDispatch>()

    const {
      id,
      imageUrl,
      title,
      location,
      price,
      description,
      areaSqFt,
      plotType,
      facingDirection,
      roadWidth,
      availability,
      nearbyAmenities,
    } = plot;

    const {cart} = useSelector((state:RootState) => state.cart)

    const isAdded = cart.find((item) => item.id === id)

    const isAdmin = localStorage.getItem('isAdmin')

    const intialValues = {
      title,
      location,
      price,
      description,
      imageUrl,
      areaSqFt,
      plotType,
      facingDirection,
      roadWidth,
      availability,
      nearbyAmenities,
    };
    const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

    const handleSubmit = (Values:plotSchema,action:FormikHelpers<plotSchema>) => {
      dispatch(updatePlots({...Values,id}))
      action.resetForm()
      handleClose()
      dispatch(getPlots())
    }



    const handleAddtoCart = () => {
      if(id) {
        const newItem = {
          id,
          title,
          location,
          price,
          description,
          imageUrl,
          quantity: 1,
          totalPrice: price,
        };
        dispatch(addToCart(newItem));
        toast.success(`${title} to Cart`)
      }
     }
      


    const handleDelete =() => {
      dispatch(deletePlots(id))
      dispatch(getPlots())
      
    }

  return (
    <li>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-90 h-170">
        <img
          src={imageUrl}
          alt="card-image"
          style={{ height: "250px", objectFit: "fill" }}
          className="rounded-t-lg"
        />

        <div className="p-2 flex items-center justify-between">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
          <p>
            <span className="mt-5 font-bold text-xl text-gray-800 dark:text-neutral-200">
              <span className="font-bold text-2xl me-1">$</span>
              {price}
            </span>
          </p>
        </div>

        <div className="p-4 h-25">
          <p className="font-bold flex items-center gap-2 text-gray-600 dark:text-neutral-300">
            <MapPinIcon className="w-5 h-5 text-red-600" />
            <span className="text-ellipsis">{location}</span>
          </p>
          <p className="text-slate-600 leading-normal font-light">
            {description}
          </p>
        </div>

        <div className="p-4  grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Squares2X2Icon className="w-5 h-5 text-green-600" />
            <span>{areaSqFt} sqft</span>
          </div>
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-purple-600" />
            <span>{plotType}</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpRightIcon className="w-5 h-5 text-yellow-600" />
            <span>{facingDirection}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-orange-600" />
            <span>{roadWidth}m Road</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CheckCircleIcon className="w-5 h-5 text-blue-500" />
            <span>Availability: {availability}</span>
          </div>
        </div>

        <div className="p-4 ">
          <h6 className="font-semibold text-gray-800 dark:text-neutral-200 mb-1">
            Nearby Amenities
          </h6>
          <ul className="flex flex-wrap gap-2 text-xs">
            {nearbyAmenities.map((amenity, idx) => (
              <li
                key={idx}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full px-2 py-1"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 pb-4 pt-0 mt-2 flex gap-4 ">
          <button
            disabled={isAdded ? true : false}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleAddtoCart}
          >
            {isAdded ? "Already Added" : "Add to Cart"}
          </button>

        {isAdmin &&  <div className="flex items-center space-x-4">
            <button
              className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleOpen}
            >
              Update
            </button>

            <button
              type="button"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handleDelete}
            >
              <svg
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>}
        </div>
      </div>

      {open && (
        <Modals
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          intialValues={intialValues}
          fun="Update"
          handleSubmit={handleSubmit}
        />
      )}
    </li>
  );
}

export default PlotItems