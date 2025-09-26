import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik,type FormikHelpers, type FormikProps } from "formik";
import MapView from "../Components/MapView.tsx";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { stepSchemas } from "../schema/YupValidation.ts";
import type { RootState } from "../store.tsx";
import type { addHomeSchema } from "../Pages/Homes/HomesSchema.tsx";
import { IoLocation } from "react-icons/io5";

interface modalSchema {
  open: boolean;
  setOpen: (a: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  intialValues: addHomeSchema;
  fun: string;
  handleSubmit: (
    values: addHomeSchema,
    action: FormikHelpers<addHomeSchema>
  ) => void;
}

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

const HomesModal = ({
  open,
  setOpen,
  handleClose,
  handleOpen,
  intialValues,
  fun,
  handleSubmit,
}: modalSchema) => {
  const [openMap, setOpenMap] = useState(false);
  const [showParentModal, setShowParentModal] = useState(true);
  const [step, setStep] = useState(0);

  const formikRef = useRef<FormikProps<addHomeSchema>>(null);
  const { location } = useSelector((state: RootState) => state.maps);

  useEffect(() => {
    if (location && formikRef.current) {
      formikRef.current.setFieldValue("location", location);
    }
  }, [location]);

  const nextStep = () =>
    setStep((s) => Math.min(s + 1, stepSchemas.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const isLastStep = step === stepSchemas.length - 1;

  return (
    <div>
      <MapView
        openMap={openMap}
        setOpenMap={setOpenMap}
        handleOpenMap={handleOpen}
        handleCloseMap={() => setOpenMap(false)}
        handleOpenOld={() => setShowParentModal(true)}
      />

      <Modal
        open={open}
        onClose={handleClose}
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

          <Typography variant="h6" component="h2" fontWeight="bold">
            {fun} Home - Step {step + 1} of {stepSchemas.length}
          </Typography>

          <Formik
            initialValues={intialValues}
            validationSchema={stepSchemas[step]}
            onSubmit={(values, actions) => {
              if (isLastStep) {
                handleSubmit(values, actions);
              } else {
                nextStep();
                actions.setTouched({});
              }
            }}
            innerRef={formikRef}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="bg-white p-5 rounded-md w-full">
                  {step === 0 && (
                    <>
                      <div className="mb-4">
                        <label className="font-bold">Title</label>
                        <Field
                          name="title"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Enter title"
                        />
                        {touched.title && errors.title && (
                          <p className="text-red-500">{errors.title}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">Price</label>
                        <Field
                          type="number"
                          name="price"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Enter price"
                        />
                        {touched.price && errors.price && (
                          <p className="text-red-500">{errors.price}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">Description</label>
                        <Field
                          as="textarea"
                          name="description"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Enter description"
                        />
                        {touched.description && errors.description && (
                          <p className="text-red-500">{errors.description}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <div className="mb-4">
                      <label className="font-bold">Location</label>
                      <Field
                        name="location"
                        className="w-full p-3 shadow-md rounded-md my-2"
                        placeholder="Select location"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMap(true);
                          setShowParentModal(false);
                        }}
                        className="flex  items-center mt-2 px-3 py-2 bg-stone-800 text-white rounded-md"
                      >
                        Select Location <IoLocation />
                      </button>
                      {touched.location && errors.location && (
                        <p className="text-red-500">{errors.location}</p>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <div className="mb-4">
                        <label className="font-bold">BHK Type</label>
                        <Field
                          name="bhkType"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="BHK type"
                        />
                        {touched.bhkType && errors.bhkType && (
                          <p className="text-red-500">{errors.bhkType}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">Bedrooms</label>
                        <Field
                          type="number"
                          name="bedrooms"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Bedrooms"
                        />
                        {touched.bedrooms && errors.bedrooms && (
                          <p className="text-red-500">{errors.bedrooms}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">Bathrooms</label>
                        <Field
                          type="number"
                          name="bathrooms"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Bathrooms"
                        />
                        {touched.bathrooms && errors.bathrooms && (
                          <p className="text-red-500">{errors.bathrooms}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">Kitchen Count</label>
                        <Field
                          type="number"
                          name="kitchenCount"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Kitchens"
                        />
                        {touched.kitchenCount && errors.kitchenCount && (
                          <p className="text-red-500">{errors.kitchenCount}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="mb-4">
                        <label className="font-bold">Image URL</label>
                        <Field
                          name="imageUrl"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="Image URL"
                        />
                        {touched.imageUrl && errors.imageUrl && (
                          <p className="text-red-500">{errors.imageUrl}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="font-bold">
                          Amenities Nearby (comma separated)
                        </label>
                        <Field
                          name="amenitiesNearby"
                          className="w-full p-3 shadow-md rounded-md my-2"
                          placeholder="e.g., Park, School, Hospital"
                          value={values.amenitiesNearby?.join(", ") || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const input = e.target.value
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean);
                            setFieldValue("amenitiesNearby", input);
                          }}
                        />
                        {touched.amenitiesNearby && errors.amenitiesNearby && (
                          <p className="text-red-500">
                            {errors.amenitiesNearby as string}
                          </p>
                        )}
                      </div>
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
        </Box>
      </Modal>
    </div>
  );
};

export default HomesModal;
