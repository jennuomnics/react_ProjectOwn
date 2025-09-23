import type { AppDispatch, RootState } from "../store";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { addPlot, getPlots } from "../Slices/plotSlice";
import { Field, Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { addHomeValidation } from "../schema/register";
import type { addHomeSchema } from "../Slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MapView from "./MapView";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};


interface modalSchema {
  open: boolean;
  setOpen: (a: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  intialValues:addHomeSchema,
  fun:string,
  handleSubmit:(Values:addHomeSchema,action:FormikHelpers<addHomeSchema>) => void;
}

const Modals = ({
  open,
  setOpen,
  handleClose,
  handleOpen,
  intialValues,
  fun,
  handleSubmit
}: modalSchema) => {
    const {location} = useSelector((state:RootState) => state.maps)
  
    const FormikRef = useRef<FormikProps<addHomeSchema>>(null)
      const [openMap, setOpenMap] = useState(false);
      const handleOpenMap = () => setOpenMap(true);
      const handleCloseMap = () => setOpenMap(false);
  
    useEffect(() => {
      
      if(location && FormikRef.current) {
    
        FormikRef.current.setFieldValue('location',location)
      }
    })
  

  return (
    <div>
      <MapView
        openMap={openMap}
        setOpenMap={setOpenMap}
        handleOpenMap={handleOpenMap}
        handleCloseMap={handleCloseMap}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Plot
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <Formik
            innerRef={FormikRef}
              initialValues={intialValues}
              validationSchema={addHomeValidation}
              onSubmit={handleSubmit}
            >
              {({ errors, touched,values}) => (
                <Form className=" ">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="text"
                      name="title"
                      id="title"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="title"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Title
                    </label>
                    {errors.title && touched.title && (
                      <p className="text-red-400  ">{errors.title}</p>
                    )}
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="text"
                      name="location"
                      id="location"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={values.location}
                      required
                    />
                    <label
                      htmlFor="location"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Location
                    </label>
                    <button
                      type="button"
                      onClick={() => setOpenMap(true)}
                      className="py-1 px-6 mt-2 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                    >
                      Select Loction
                    </button>
                    {errors.location && touched.location && (
                      <p className="text-red-400  ">{errors.location}</p>
                    )}
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="price"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Price
                    </label>
                    {errors.price && touched.price && (
                      <p className="text-red-400  ">{errors.price}</p>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    ></Field>
                    <label
                      htmlFor="description"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      description
                    </label>
                    {errors.description && touched.description && (
                      <p className="text-red-400 ">{errors.description}</p>
                    )}
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="imageUrl"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      imageUrl
                    </label>
                    {errors.imageUrl && touched.imageUrl && (
                      <p className="text-red-400 ">{errors.imageUrl}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {fun} Plot
                  </button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;
