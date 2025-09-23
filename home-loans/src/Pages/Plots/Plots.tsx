import { useDispatch, useSelector } from "react-redux";

import PlotItems from "./PlotItems";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState, type FormEvent } from "react";
import { addPlot, getPlots } from "../../Slices/plotSlice";
import Loader from "../../Components/Loader";
import Modals from "../../Components/Modals";
import type { addHomeSchema } from "../../Slices/homeSlice";
import type { FormikHelpers } from "formik";



const intialValues = {
  title: "",
  location: "",
  price: 0,
  description: "",
  imageUrl: "",
};

const Plots = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    plots,
    isLoading,
    error: plotError,
  } = useSelector((state: RootState) => state.plots);

  useEffect(() => {
    dispatch(getPlots());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

    const handleSubmit = (
      Values: addHomeSchema,
      action: FormikHelpers<addHomeSchema>
    ) => {
      setOpen(false);
      dispatch(addPlot(Values));
      action.resetForm();
      dispatch(getPlots());
    };

  return (
    <div className=" p-5 h-[90vh] overflow-y-auto flex flex-col items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-stone-900 font-bold">Plots</h1>
        <button
          className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleOpen}
        >
          Add plot
        </button>
      </div>

      {isLoading && <Loader />}
      {!isLoading && (
        <ul className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {plots.map((plot) => (
            <PlotItems plot={plot} key={plot.id} />
          ))}
        </ul>
      )}
      <Modals
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        intialValues={intialValues}
        fun='add'
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Plots;
