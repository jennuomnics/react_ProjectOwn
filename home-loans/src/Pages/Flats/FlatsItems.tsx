import { useEffect, useState } from "react";

import type { FormikHelpers } from "formik";
import { useFlats } from "../../Contexts/FlatsContext";
import FlatsModal from "../../Components/FlatsModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addToCart } from "../../Slices/cartSlice";
import toast from "react-hot-toast";
import {
  HomeIcon,
  DevicePhoneMobileIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  BoltIcon,
  MapPinIcon,
  TruckIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import type { addFlatSchema, flatsSchema } from "./FlatsSchema";

interface flatDetails {
  flat: flatsSchema;
}



async function urlToFile(url: string, filename: string, mimeType: string) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  return new File([buffer], filename, { type: mimeType });
}

const FlatItems = ({ flat }: flatDetails) => {
  const {
    id,
    imageUrl,
    title,
    location,
    price,
    description,
    bhkType,
    bedrooms,
    bathrooms,
    balconies,
    floorNumber,
    totalFloors,
    furnishing,
    availability,
    parking,
    nearbyAmenities,
    areaSqFt,
    acAvailable,
    liftAvailable,
    security,
    powerBackup,
  } = flat;
  const { updateFlat, getFlats, deleteFlat } = useFlats();
  const [intialValues, setInitialValues] = useState<addFlatSchema>({} as addFlatSchema);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const isAdded = cart.find((item) => item.id === id);

  const preImage = imageUrl;

  const isAdmin = localStorage.getItem('isAdmin')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddtoCart = () => {
    if (id) {
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
      toast.success(`${title} to Cart`);
    }
  };

  const handleSubmit = (
    Values: addFlatSchema,
    action: FormikHelpers<addFlatSchema>
  ) => {
    if (Values.imageUrl) {
     
      const createImageUrl = URL.createObjectURL(Values.imageUrl);
      updateFlat({
        ...Values,
        imageUrl: createImageUrl,
        id,
      });
      getFlats();
    }
    setOpen(false);
    action.resetForm();
  };

  const handleDelete = () => {
    if (id) {
      deleteFlat(id);
      getFlats();
    }
  };

  const getInitalValues = async () => {
    return {
      title,
      location,
      price,
      description,
      imageUrl: await urlToFile(imageUrl, "image.jpg", "image/jpeg"),
      bhkType,
      bedrooms,
      bathrooms,
      balconies,
      floorNumber,
      totalFloors,
      furnishing,
      availability,
      parking,
      nearbyAmenities,
      areaSqFt,
      acAvailable,
      liftAvailable,
      security,
      powerBackup,
    };
  };

  useEffect(() => {
    const fetchInitialValues = async () => {
      const values = await getInitalValues();
      setInitialValues(values);
    };

    fetchInitialValues();
  }, []);

  return (
    <li>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-90 h-190">
        <img
          src={imageUrl}
          alt="card-image"
          style={{ height: "250px", objectFit: "fill" }}
          className="rounded-t-lg"
        />
        <div className="p-2 flex items-center justify-between">
          <p>
            <span className="mt-5 font-bold text-xl text-gray-800 dark:text-neutral-200">
              <span className="font-bold text-2xl me-1">$</span>
              {price}
            </span>
          </p>

          <p className="font-bold flex items-center gap-1">
            <MapPinIcon className="h-5 w-5 text-red-600" />
            {location}
          </p>
        </div>

        <div className="p-4">
          <div className="h-20">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {title}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
              {description}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700 h-40">
            <div className="flex items-center gap-1">
              <HomeIcon className="h-5 w-5 text-blue-500" />
              <span>{bhkType}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-5 w-5 text-green-500" />
              <span>
                {bedrooms} Bedroom{bedrooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ChartBarIcon className="h-5 w-5 text-purple-500" />
              <span>
                {bathrooms} Bathroom{bathrooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CubeTransparentIcon className="h-5 w-5 text-yellow-500" />
              <span>
                {balconies} Balcony{balconies > 1 ? "ies" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BuildingOfficeIcon className="h-5 w-5 text-pink-500" />
              <span>
                Floor {floorNumber} of {totalFloors}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DevicePhoneMobileIcon className="h-5 w-5 text-cyan-500" />
              <span>{furnishing}</span>
            </div>
            <div className="flex items-center gap-1">
              <TruckIcon className="h-5 w-5 text-indigo-500" />
              <span>{parking} Parking</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-5 w-5 text-rose-500" />
              <span>{availability}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-5 w-5 text-teal-500" />
              <span>{areaSqFt} Sq Ft</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-white">
            {nearbyAmenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-blue-600 px-2 py-0.5 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm h-15">
            {acAvailable && (
              <div className="flex items-center gap-1 text-gray-600">
                <BoltIcon className="h-5 w-5 text-blue-600" />
                <span>AC Available</span>
              </div>
            )}
            {liftAvailable && (
              <div className="flex items-center gap-1 text-gray-600">
                <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
                <span>Lift Available</span>
              </div>
            )}
            {security && (
              <div className="flex items-center gap-1 text-gray-600">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                <span>Security</span>
              </div>
            )}
            {powerBackup && (
              <div className="flex items-center gap-1 text-gray-600">
                <BoltIcon className="h-5 w-5 text-yellow-500" />
                <span>Power Backup</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pb-4 pt-0 mt-2 flex gap-4">
          {!isAdmin && (
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => handleAddtoCart()}
            >
              {isAdded ? "Already Added" : "Add to Cart"}
            </button>
          )}
          {isAdmin && (
            <div className="flex items-center space-x-4">
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
          )}
        </div>
      </div>

      {open && (
        <FlatsModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          intialValues={intialValues}
          fun="Update"
          handleSubmit={handleSubmit}
          previewImage={preImage}
        />
      )}
    </li>
  );
};

export default FlatItems;
