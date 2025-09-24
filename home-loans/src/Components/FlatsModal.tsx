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
            Add new Plot
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
              innerRef={FormikRef}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <div className="h-110 overflow-y-auto mt-5">
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
                        onClick={() => {setOpenMap(true)
                          setShowParentModal(false)
                        }}
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

                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="imageUrl"
                      >
                        Upload file
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        name="imageUrl"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          setFieldValue("imageUrl", file || null);
                        }}
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p>

                      {errors.imageUrl && touched.imageUrl && (
                        <p className="text-red-400 ">{errors.imageUrl}</p>
                      )}
                    </div>
                    <ImagePreview previewImage={previewImage} />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {fun} Flat
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
