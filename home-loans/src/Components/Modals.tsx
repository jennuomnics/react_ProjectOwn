import type { RootState } from "../store";
import { useEffect, useRef, useState } from "react";

import {
  Field,
  Form,
  Formik,
  type FormikHelpers,
  type FormikProps,
} from "formik";
import { addPlotValidation } from "../schema/YupValidation";

import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MapView from "./MapView";
import type { plotSchema } from "../Pages/Plots/PlotSchema";
import { IoLocation } from "react-icons/io5";

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
  intialValues: plotSchema;
  fun: string;
  handleSubmit: (Values: plotSchema, action: FormikHelpers<plotSchema>) => void;
}

const Modals = ({
  open,
  setOpen,
  handleClose,
  handleOpen,
  intialValues,
  fun,
  handleSubmit,
}: modalSchema) => {
  const { location } = useSelector((state: RootState) => state.maps);
 
  const [step,setStep] = useState(0)


  const nextStep = () => {
    setStep((s) => Math.min(s+1,addPlotValidation.length-1))
  }

  const prevStep = () => {
    setStep((s) => Math.max(s-1,0))
  }

  const isLastStep = step === addPlotValidation.length - 1
 

  const FormikRef = useRef<FormikProps<plotSchema>>(null);
  const [openMap, setOpenMap] = useState(false);
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);
  const [showParentModal, setShowParentModal] = useState(true);

  const handleOpenOld = () => {
    setShowParentModal(true);
  };

  useEffect(() => {
    if (location && FormikRef.current) {
      FormikRef.current.setFieldValue("location", location);
    }
  });

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
            <span className="font-bold">
              {" "}
              {fun} Plot - Step {step + 1} of {addPlotValidation.length}
            </span>
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <Formik
              innerRef={FormikRef}
              initialValues={intialValues}
              validationSchema={addPlotValidation[step]}
              onSubmit={(values, actions) => {
                if (isLastStep) {
                  handleSubmit(values, actions);
                } else {
                  nextStep();
                  actions.setTouched({});
                }
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <div className="space-y-5 ">
                    {step === 0 && (
                      <>
                        {" "}
                        <div className="w-full group px-1">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Title
                          </label>
                          <Field
                            type="text"
                            name="title"
                            id="title"
                            className=" w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400
           "
                            placeholder="Enter title"
                          />
                          {errors.title && touched.title && (
                            <p className="text-red-400">{errors.title}</p>
                          )}
                        </div>
                        {/* Price */}
                        <div className="w-full group px-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-700 "
                          >
                            Price
                          </label>
                          <Field
                            type="number"
                            name="price"
                            id="price"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                            placeholder="Enter price"
                          />
                          {errors.price && touched.price && (
                            <p className="text-red-400">{errors.price}</p>
                          )}
                        </div>
                        <div className="w-full group px-1">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-700 "
                          >
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            id="description"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                            placeholder="Enter description"
                          />
                          {errors.description && touched.description && (
                            <p className="text-red-400">{errors.description}</p>
                          )}
                        </div>{" "}
                      </>
                    )}
                    {/* Location */}
                    {step === 1 && (
                      <div className="w-full group px-1">
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Location
                        </label>
                        <Field
                          type="text"
                          name="location"
                          id="location"
                          className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                          placeholder="Enter location"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMap(true);
                            setShowParentModal(false);
                          }}
                          className="flex items-center py-1 px-6 mt-2 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                        >
                          Select Location <IoLocation />
                        </button>
                        {errors.location && touched.location && (
                          <p className="text-red-400">{errors.location}</p>
                        )}
                      </div>
                    )}
                    {step === 2 && (
                      <>
                        {" "}
                        {/* Area SqFt */}
                        <div className="w-full group px-2">
                          <label
                            htmlFor="areaSqFt"
                            className="block mb-2 text-sm font-medium text-gray-700 "
                          >
                            Area (Sq Ft)
                          </label>
                          <Field
                            type="number"
                            name="areaSqFt"
                            id="areaSqFt"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                            placeholder="Enter area"
                          />
                          {errors.areaSqFt && touched.areaSqFt && (
                            <p className="text-red-400">{errors.areaSqFt}</p>
                          )}
                        </div>
                        {/* Plot Type */}
                        <div className="w-full group px-1">
                          <label
                            htmlFor="plotType"
                            className="block mb-2 text-sm font-medium text-gray-700 "
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
                        <div className="w-full group px-1">
                          <label
                            htmlFor="facingDirection"
                            className="block mb-2 text-sm font-medium text-gray-700 "
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
                          </Field>
                          {errors.facingDirection &&
                            touched.facingDirection && (
                              <p className="text-red-400">
                                {errors.facingDirection}
                              </p>
                            )}
                        </div>
                        <div className="w-full group px-1">
                          <label
                            htmlFor="roadWidth"
                            className="block mb-2 text-sm font-medium text-gray-700 "
                          >
                            Road Width
                          </label>
                          <Field
                            type="text"
                            name="roadWidth"
                            id="roadWidth"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                            placeholder="Enter road width (e.g. 40 ft)"
                          />
                          {errors.roadWidth && touched.roadWidth && (
                            <p className="text-red-400">{errors.roadWidth}</p>
                          )}
                        </div>{" "}
                      </>
                    )}
                    {step === 3 && (
                      <>
                        {" "}
                        <div className="w-full group px-1">
                          <label
                            htmlFor="availability"
                            className="block mb-2 text-sm font-medium text-gray-700 "
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
                            <p className="text-red-400">
                              {errors.availability}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col mb-3 px-1">
                          <label className=" text-gray-700">
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const arr = e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean);
                              setFieldValue("nearbyAmenities", arr);
                            }}
                          />
                          {errors.nearbyAmenities &&
                            touched.nearbyAmenities && (
                              <p className="text-red-400  ">
                                {errors.nearbyAmenities}
                              </p>
                            )}
                        </div>
                        <div className="w-full group px-1">
                          <label
                            htmlFor="imageUrl"
                            className="block mb-2 text-sm font-medium text-gray-700 "
                          >
                            Image URL
                          </label>
                          <Field
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-4000"
                            placeholder="Enter image URL"
                          />
                          {errors.imageUrl && touched.imageUrl && (
                            <p className="text-red-400">{errors.imageUrl}</p>
                          )}
                        </div>{" "}
                      </>
                    )}
                  </div>
                  <div className="flex justify-between mt-4">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-300 rounded-md"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-4 py-2 bg-stone-800 text-white rounded-md"
                    >
                      {isLastStep ? `${fun} Home` : "Next"}
                    </button>
                  </div>
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
