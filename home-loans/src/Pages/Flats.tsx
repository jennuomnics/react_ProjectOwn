

import { useEffect, useState, type FormEvent } from "react";
import Loader from "../Components/Loader";
import Modals from "../Components/Modals";

import type { FormikHelpers } from "formik";
import { useFlats, type flatsSchema } from "../Contexts/FlatsContext";
import FlatItems from "./FlatsItems";
import FlatsModal from "../Components/FlatsModal";

const intialValues = {
  title: "",
  location: "",
  price: 0,
  description: "",
  imageUrl: null,
};

interface addFlatSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: File | null; // <-- File type for uploaded file, or null initially
}

const Flats = () => {
 const {flats,getFlats,isLoading,addFlat} = useFlats()

  useEffect(() => {
  getFlats()
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

    const handleSubmit = (
      Values: addFlatSchema,
      action: FormikHelpers<addFlatSchema>
    ) => {
        if(Values.imageUrl) {
             const createImageUrl = URL.createObjectURL(Values?.imageUrl);
             const addValues = {
                ...Values,
                imageUrl:createImageUrl
             }
             addFlat(addValues)
             getFlats()
        } 
       
      setOpen(false);
      action.resetForm();
    };

  return (
    <div className=" p-5 h-[90vh] overflow-y-auto flex flex-col items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-stone-900 font-bold">flats</h1>
        <button
          className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleOpen}
        >
          Add Flat
        </button>
      </div>

      {isLoading && <Loader />}
      {!isLoading && (
        <ul className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {flats?.map((flat:flatsSchema) => (
            <FlatItems flat={flat} key={flat.id} />
          ))}
        </ul>
      )}
      <FlatsModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        intialValues={intialValues}
        fun='add'
        handleSubmit={handleSubmit}
        previewImage=""
      />
    </div>
  );
};

export default Flats;
