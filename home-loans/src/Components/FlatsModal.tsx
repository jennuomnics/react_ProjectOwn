import {
  Field,
  Form,
  Formik,
  useFormikContext,
  type FormikHelpers,
  type FormikProps,
} from "formik";
import { addFlatValidation, addHomeValidation } from "../schema/register";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import MapView from "./MapView";

interface addFlatSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: File | null;
  bhkType: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floorNumber: number;
  totalFloors: number;
  furnishing: string;
  availability: string;
  parking: string;
  nearbyAmenities: string[];
  areaSqFt: number;
  acAvailable: boolean;
  liftAvailable: boolean;
  security: boolean;
  powerBackup: boolean;
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

interface modalSchema {
  open: boolean;
  setOpen: (a: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  intialValues: addFlatSchema;
  fun: string;
  handleSubmit: (
    Values: addFlatSchema,
    action: FormikHelpers<addFlatSchema>
  ) => void;
  previewImage: string;
}

interface preImage {
  previewImage: string;
}

const ImagePreview = ({ previewImage }: preImage) => {
  const { values } = useFormikContext<addFlatSchema>();
  const [preview, setPreview] = useState<string | null>(previewImage);

  useEffect(() => {
    if (values.imageUrl) {
      const objectUrl = URL.createObjectURL(values.imageUrl);
      console.log(objectUrl);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [values.imageUrl]);

  if (!preview) return null;

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Preview:
      </p>
      <img
        src={preview}
        alt="Preview"
        className="max-w-full max-h-48 rounded border border-gray-300"
      />
    </div>
  );
};

const FlatsModal = ({
  open,
  setOpen,
  handleClose,
  handleOpen,
  intialValues,
  fun,
  handleSubmit,
  previewImage,
}: modalSchema) => {
  const { location } = useSelector((state: RootState) => state.maps);
  console.log("Updated Modal");
  const FormikRef = useRef<FormikProps<addFlatSchema>>(null);
  const [openMap, setOpenMap] = useState(false);
  const [showParentModal, setShowParentModal] = useState(true);
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);

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
            {fun} Flat
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <Formik
              initialValues={intialValues}
              validationSchema={addFlatValidation}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md space-y-6 h-100 overflow-y-auto">
                  {/* Title */}
                  <div>
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
                      placeholder="Enter title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.title && touched.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Location
                    </label>
                    <Field
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Enter location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.location && touched.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Price
                    </label>
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.price && touched.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      placeholder="Enter description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.description && touched.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label
                      htmlFor="imageUrl"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Upload Image
                    </label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue(
                          "imageUrl",
                          e.currentTarget.files
                            ? e.currentTarget.files[0]
                            : null
                        );
                      }}
                      className="w-full text-gray-900 bg-white border border-gray-300 rounded-md cursor-pointer
            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 focus:outline-none"
                    />
                    {errors.imageUrl && touched.imageUrl && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.imageUrl}
                      </p>
                    )}
                  </div>

                  {/* BHK Type */}
                  <div>
                    <label
                      htmlFor="bhkType"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      BHK Type
                    </label>
                    <Field
                      as="select"
                      name="bhkType"
                      id="bhkType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                      <option value="">Select BHK Type</option>
                      <option value="1BHK">1 BHK</option>
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="4BHK">4 BHK</option>
                      <option value="Penthouse">Penthouse</option>
                    </Field>
                    {errors.bhkType && touched.bhkType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bhkType}
                      </p>
                    )}
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label
                      htmlFor="bedrooms"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bedrooms
                    </label>
                    <Field
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                      placeholder="Number of bedrooms"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.bedrooms && touched.bedrooms && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label
                      htmlFor="bathrooms"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bathrooms
                    </label>
                    <Field
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                      placeholder="Number of bathrooms"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.bathrooms && touched.bathrooms && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bathrooms}
                      </p>
                    )}
                  </div>

                  {/* Balconies */}
                  <div>
                    <label
                      htmlFor="balconies"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Balconies
                    </label>
                    <Field
                      type="number"
                      name="balconies"
                      id="balconies"
                      placeholder="Number of balconies"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.balconies && touched.balconies && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.balconies}
                      </p>
                    )}
                  </div>

                  {/* Floor Number */}
                  <div>
                    <label
                      htmlFor="floorNumber"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Floor Number
                    </label>
                    <Field
                      type="number"
                      name="floorNumber"
                      id="floorNumber"
                      placeholder="Floor number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.floorNumber && touched.floorNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.floorNumber}
                      </p>
                    )}
                  </div>

                  {/* Total Floors */}
                  <div>
                    <label
                      htmlFor="totalFloors"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Total Floors
                    </label>
                    <Field
                      type="number"
                      name="totalFloors"
                      id="totalFloors"
                      placeholder="Total floors"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.totalFloors && touched.totalFloors && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.totalFloors}
                      </p>
                    )}
                  </div>

                  {/* Furnishing */}
                  <div>
                    <label
                      htmlFor="furnishing"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Furnishing
                    </label>
                    <Field
                      type="text"
                      name="furnishing"
                      id="furnishing"
                      placeholder="Enter furnishing details"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.furnishing && touched.furnishing && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.furnishing}
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div>
                    <label
                      htmlFor="availability"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Availability
                    </label>
                    <Field
                      type="text"
                      name="availability"
                      id="availability"
                      placeholder="Availability status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.availability && touched.availability && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.availability}
                      </p>
                    )}
                  </div>

                  {/* Parking */}
                  <div>
                    <label
                      htmlFor="parking"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Parking
                    </label>
                    <Field
                      type="text"
                      name="parking"
                      id="parking"
                      placeholder="Parking details"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.parking && touched.parking && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.parking}
                      </p>
                    )}
                  </div>

                  {/* Nearby Amenities (example as comma separated input) */}
                  <div>
                    <label
                      htmlFor="nearbyAmenities"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Nearby Amenities (comma separated)
                    </label>
                    <Field
                      type="text"
                      name="nearbyAmenities"
                      id="nearbyAmenities"
                      placeholder="e.g. Park,School,Supermarket"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      onChange={(e) => {
                        const vals = e.target.value
                          .split(",")
                          .map((v) => v.trim());
                        setFieldValue("nearbyAmenities", vals);
                      }}
                      value={values.nearbyAmenities.join(", ")}
                    />
                    {errors.nearbyAmenities && touched.nearbyAmenities && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nearbyAmenities}
                      </p>
                    )}
                  </div>

                  {/* Area (SqFt) */}
                  <div>
                    <label
                      htmlFor="areaSqFt"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Area (SqFt)
                    </label>
                    <Field
                      type="number"
                      name="areaSqFt"
                      id="areaSqFt"
                      placeholder="Enter area in square feet"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    {errors.areaSqFt && touched.areaSqFt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.areaSqFt}
                      </p>
                    )}
                  </div>

                  {/* Boolean checkboxes */}
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Field
                        type="checkbox"
                        name="acAvailable"
                        className="form-checkbox rounded text-blue-600"
                      />
                      <span>AC Available</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Field
                        type="checkbox"
                        name="liftAvailable"
                        className="form-checkbox rounded text-blue-600"
                      />
                      <span>Lift Available</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Field
                        type="checkbox"
                        name="security"
                        className="form-checkbox rounded text-blue-600"
                      />
                      <span>Security</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Field
                        type="checkbox"
                        name="powerBackup"
                        className="form-checkbox rounded text-blue-600"
                      />
                      <span>Power Backup</span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
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

export default FlatsModal;
