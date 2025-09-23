import { useState } from "react";
import { deletePlots, getPlots, updatePlots, type plotSchema } from "../../Slices/plotSlice";
import Modals from "../../Components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store";
import type { addHomeSchema } from "../../Slices/homeSlice";
import type { FormikHelpers } from "formik";
import { addToCart } from "../../Slices/cartSlice";
import toast from "react-hot-toast";


interface plotDetails {
    plot:plotSchema
}

const PlotItems = ({plot}:plotDetails) => {

    const dispatch = useDispatch<AppDispatch>()

    const {id,imageUrl,title,location,price,description} = plot

    const {cart} = useSelector((state:RootState) => state.cart)

    const isAdded = cart.find((item) => item.id === id)

    const intialValues = {
      title,
      location,
      price,
      description,
      imageUrl,
    };
    const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

    const handleSubmit = (Values:addHomeSchema,action:FormikHelpers<addHomeSchema>) => {
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
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <img
          src={imageUrl}
          alt="card-image"
          style={{ height: "250px", objectFit: "fill" }}
        />
        <div className="p-2 flex items-center justify-between">
          <p>
            <span className="mt-5 font-bold text-xl text-gray-800 dark:text-neutral-200">
              <span className="font-bold text-2xl me-1">$</span>
              {price}
            </span>
          </p>

          <p className="font-bold">🎯{location}</p>
        </div>
        <div className="p-4">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
          <p className="text-slate-600 leading-normal font-light">
            {description}
          </p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2 flex gap-4">
          <button
           disabled={isAdded?true:false}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => handleAddtoCart()}
          >
           {isAdded ? 'Already Added': 'Add to Cart'}
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
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <Modals
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        intialValues={intialValues}
        fun="Update"
        handleSubmit={handleSubmit}
      />
    </li>
  );
}

export default PlotItems