import type { RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { type plotSchema } from "../Slices/plotSlice";
import { Field, Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import {  addPlotValidation } from "../schema/register";

import {  useSelector } from "react-redux";
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
  intialValues:plotSchema,
  fun:string,
  handleSubmit:(Values:plotSchema,action:FormikHelpers<plotSchema>) => void;
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
    console.log([{a:1}],'update Modal')
  
    const FormikRef = useRef<FormikProps<plotSchema>>(null)
      const [openMap, setOpenMap] = useState(false);
      const handleOpenMap = () => setOpenMap(true);
      const handleCloseMap = () => setOpenMap(false);
      const [showParentModal, setShowParentModal] = useState(true);

         const handleOpenOld = () => {
           setShowParentModal(true);
         };
  
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
        handleOpenOld={handleOpenOld}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={showParentModal ? "block" : "hidden"}
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
            <span className="font-bold"> {fun} Plot</span>
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <Formik
              innerRef={FormikRef}
              initialValues={intialValues}
              validationSchema={addPlotValidation}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form className="space-y-5 h-100 overflow-y-auto">
                  <div className="w-full group">
                    <label
                      htmlFor="title"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      id="title"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter title"
                    />
                    {errors.title && touched.title && (
                      <p className="text-red-400">{errors.title}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="w-full group">
                    <label
                      htmlFor="location"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Location
                    </label>
                    <Field
                      type="text"
                      name="location"
                      id="location"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter location"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMap(true);
                        setShowParentModal(false);
                      }}
                      className="py-1 px-6 mt-2 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                    >
                      Select Location
                    </button>
                    {errors.location && touched.location && (
                      <p className="text-red-400">{errors.location}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="w-full group">
                    <label
                      htmlFor="price"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Price
                    </label>
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter price"
                    />
                    {errors.price && touched.price && (
                      <p className="text-red-400">{errors.price}</p>
                    )}
                  </div>

                  {/* Area SqFt */}
                  <div className="w-full group">
                    <label
                      htmlFor="areaSqFt"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Area (Sq Ft)
                    </label>
                    <Field
                      type="number"
                      name="areaSqFt"
                      id="areaSqFt"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter area"
                    />
                    {errors.areaSqFt && touched.areaSqFt && (
                      <p className="text-red-400">{errors.areaSqFt}</p>
                    )}
                  </div>

                  {/* Plot Type */}
                  <div className="w-full group">
                    <label
                      htmlFor="plotType"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Plot Type
                    </label>
                    <Field
                      as="select"
                      name="plotType"
                      id="plotType"
                      className="block w-full text-sm py-2.5 px-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select plot type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </Field>
                    {errors.plotType && touched.plotType && (
                      <p className="text-red-400">{errors.plotType}</p>
                    )}
                  </div>

                  {/* Facing Direction */}
                  <div className="w-full group">
                    <label
                      htmlFor="facingDirection"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Facing Direction
                    </label>
                    <Field
                      as="select"
                      name="facingDirection"
                      id="facingDirection"
                      className="block w-full text-sm py-2.5 px-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select direction</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North-East">North-East</option>
                      <option value="South-East">South-East</option>
                      <option value="North-West">North-West</option>
                      <option value="South-West">South-West</option>
                    </Field>
                    {errors.facingDirection && touched.facingDirection && (
                      <p className="text-red-400">{errors.facingDirection}</p>
                    )}
                  </div>

                  <div className="w-full group">
                    <label
                      htmlFor="roadWidth"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Road Width
                    </label>
                    <Field
                      type="text"
                      name="roadWidth"
                      id="roadWidth"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter road width (e.g. 40 ft)"
                    />
                    {errors.roadWidth && touched.roadWidth && (
                      <p className="text-red-400">{errors.roadWidth}</p>
                    )}
                  </div>

                  <div className="w-full group">
                    <label
                      htmlFor="availability"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Availability
                    </label>
                    <Field
                      as="select"
                      name="availability"
                      id="availability"
                      className="block w-full text-sm py-2.5 px-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select availability</option>
                      <option value="Available">Available</option>
                      <option value="Under Development">
                        Under Development
                      </option>
                    </Field>
                    {errors.availability && touched.availability && (
                      <p className="text-red-400">{errors.availability}</p>
                    )}
                  </div>

                  <div className="flex flex-col mb-3">
                    <label className="font-semibold text-gray-700">
                      Amenities Nearby (comma separated)
                    </label>
                    <Field
                      type="text"
                      className="block w-full text-sm py-2.5 px-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                      name="amenitiesNearby"
                      placeholder="e.g., Park, School, Hospital"
                      value={
                        values.nearbyAmenities.join
                          ? values.nearbyAmenities.join(", ")
                          : ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const arr = e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setFieldValue("nearbyAmenities", arr);
                      }}
                    />
                    {errors.nearbyAmenities && touched.nearbyAmenities && (
                      <p className="text-red-400  ">{errors.nearbyAmenities}</p>
                    )}
                  </div>

                  <div className="w-full group">
                    <label
                      htmlFor="description"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter description"
                    />
                    {errors.description && touched.description && (
                      <p className="text-red-400">{errors.description}</p>
                    )}
                  </div>

                  <div className="w-full group">
                    <label
                      htmlFor="imageUrl"
                      className="block mb-1 text-sm text-gray-700 dark:text-gray-400 font-semibold"
                    >
                      Image URL
                    </label>
                    <Field
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-600"
                      placeholder="Enter image URL"
                    />
                    {errors.imageUrl && touched.imageUrl && (
                      <p className="text-red-400">{errors.imageUrl}</p>
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
