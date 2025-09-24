

import { useState } from "react";

import {  type FormikHelpers } from "formik";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";

import { deleteHome, fetchData, updateHome, type addHomeSchema } from "../../Slices/homeSlice";
import { addToCart } from "../../Slices/cartSlice";
import toast from "react-hot-toast";
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  FireIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import HomesModal from "../../Components/HomesModal";



export interface homeSchema {
  id: string;
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
  amenitiesNearby:string[];
}



interface HomeListProps {
  home: homeSchema;
}

const HomesList = ({ home }: HomeListProps) => {
  const { id, title, location, price, description, imageUrl,bhkType,bedrooms,bathrooms,kitchenCount,pujaRoom,ac,amenitiesNearby} = home;
  const { cart } = useSelector((state: RootState) => state.cart);

  const isAdded = cart.find((item) => item.id === id);

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdateHome = (
    values: addHomeSchema,
    actions: FormikHelpers<addHomeSchema>
  ) => {
    dispatch(updateHome({ id, newHome: values }));
    handleClose();
    actions.resetForm();
  };

  const handleAddtoCart = () => {
    const cartItem = {
      id,
      title,
      location,
      price,
      description,
      imageUrl,
      quantity: 1,
      totalPrice: price,
    };
    dispatch(addToCart(cartItem));
    toast.success(`${title} added to Cart`);
  };

  const handleDelete = async () => {
    await dispatch(deleteHome(id));
    dispatch(fetchData());
  };

  return (
    <li>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-90 h-180">
        <img
          src={imageUrl}
          alt="card-image"
          style={{ height: "250px", objectFit: "fill" }}
        />
        <div className="p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {title}
            </h6>

            <div className="flex items-center gap-6 text-gray-700 dark:text-neutral-300 font-semibold">
              <p>{bhkType}</p>
            </div>
          </div>

          <div className="text-gray-600 dark:text-neutral-400 text-sm flex items-center justify-between">
            <p className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-neutral-100">
                $
              </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                {price}
              </span>
            </p>
            <p className={ac ? "text-blue-600" : "text-red-600"}>
              {ac ? "AC" : "Non AC"}
            </p>
          </div>
        </div>

        <div className="px-4 h-20">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-red-600" /> {location}
          </div>

          <p className="text-slate-600 leading-normal font-light">
            {description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 p-6 bg-white h-50 ">
          <div className="flex flex-col gap-4 text-gray-800">
            <div className="flex items-center gap-3">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
              <p>{bedrooms} Bedrooms</p>
            </div>
            <div className="flex items-center gap-3">
              <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
              <p>{bathrooms} Bathrooms</p>
            </div>
            <div className="flex items-center gap-3">
              <FireIcon className="h-6 w-6 text-red-500" />
              <p>{kitchenCount} Kitchens</p>
            </div>
           {pujaRoom && <div className="flex items-center gap-3">
              <SparklesIcon className="h-6 w-6 text-yellow-500" />
              <p>{pujaRoom} Puja Room</p>
            </div>}
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <h3 className="text-lg font-semibold mb-2">Nearby Amenities</h3>
            {amenitiesNearby.map((each, index) => (
              <div key={index} className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-green-600" />
                <p>{each}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2 flex gap-4">
          <button
            disabled={isAdded ? true : false}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => handleAddtoCart()}
          >
            {isAdded ? "Already Added" : "Add to Cart"}
          </button>
          <div className="flex items-center space-x-4">
            <button
              className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleOpen}
            >
              update
            </button>
            <button
              type="button"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={() => handleDelete()}
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
          </div>
        </div>
      </div>

      {open && (
        <HomesModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          intialValues={{
            title,
            location,
            price,
            description,
            imageUrl,
            bhkType,
            bedrooms,
            bathrooms,
            kitchenCount,
            pujaRoom,
            ac,
            amenitiesNearby,
          }}
          fun="Update"
          handleSubmit={handleUpdateHome}
        />
      )}
    </li>
  );
};

export default HomesList;
