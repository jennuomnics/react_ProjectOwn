import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Field,
  Form,
  Formik,
  type FormikHelpers,
  type FormikProps,
} from "formik";
import MapView from "../Components/MapView.tsx";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { addHomeValidation } from "../schema/register";
import type { addHomeSchema } from "../Slices/homeSlice.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../store.tsx";

interface modalSchema {
  open: boolean;
  setOpen: (a: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  intialValues: addHomeSchema;
  fun: string;
  handleSubmit: (
    Values: addHomeSchema,
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
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);
  const [showParentModal,setShowParentModal] = useState(true)
  
    const { location } = useSelector((state: RootState) => state.maps);

    const formikRef = useRef<FormikProps<addHomeSchema>>(null);

    const handleOpenOld = () => {
        setShowParentModal(true)
    }

    useEffect(() => {
    
      if (location && formikRef.current) {
       
        formikRef.current.setFieldValue("location", location);
      }
    }, [location]);
  return (
    <div>
      <MapView
        openMap={openMap}
        setOpenMap={setOpenMap}
        handleOpenMap={handleOpen}
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
              {fun} new Home
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <Formik
                initialValues={intialValues}
                validationSchema={addHomeValidation}
                onSubmit={handleSubmit}
                innerRef={formikRef}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form className="bg-white p-5 shadow-xl rounded-md w-180 h-90 overflow-y-auto">
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">title</label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="title"
                        placeholder="enter title"
                      />
                      {errors.title && touched.title && (
                        <p className="text-red-400  ">{errors.title}</p>
                      )}
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">location</label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="location"
                        placeholder="Enter or Select Location"
                        value={values.location}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMap(true);
                          setShowParentModal(false);
                        }}
                        className="py-2 px-4 w-40 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                      >
                        Select Loction
                      </button>
                      {errors.location && touched.location && (
                        <p className="text-red-400 ">{errors.location}</p>
                      )}
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">price</label>
                      <Field
                        type="number"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="price"
                        placeholder="enter price"
                      />
                      {errors.price && touched.price && (
                        <p className="text-red-400  ">{errors.price}</p>
                      )}
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">description</label>
                      <Field
                        as="textarea"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="description"
                        placeholder="enter description"
                      ></Field>
                      {errors.description && touched.description && (
                        <p className="text-red-400  ">{errors.description}</p>
                      )}
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">imageUrl</label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="imageUrl"
                        placeholder="enter imageUrl"
                      />
                      {errors.imageUrl && touched.imageUrl && (
                        <p className="text-red-400  ">{errors.imageUrl}</p>
                      )}
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="font-bold">BHK Type</label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="bhkType"
                        placeholder="Enter BHK Type"
                      />
                      {errors.bhkType && touched.bhkType && (
                        <p className="text-red-400  ">{errors.bhkType}</p>
                      )}
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="font-bold">Bedrooms</label>
                      <Field
                        type="number"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="bedrooms"
                        placeholder="Enter number of bedrooms"
                        min={0}
                      />
                      {errors.bedrooms && touched.bedrooms && (
                        <p className="text-red-400 ">{errors.bedrooms}</p>
                      )}
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="font-bold">Bathrooms</label>
                      <Field
                        type="number"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="bathrooms"
                        placeholder="Enter number of bathrooms"
                        min={0}
                      />
                      {errors.bathrooms && touched.bathrooms && (
                        <p className="text-red-400  ">{errors.bathrooms}</p>
                      )}
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="font-bold">Kitchen Count</label>
                      <Field
                        type="number"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="kitchenCount"
                        placeholder="Enter number of kitchens"
                        min={0}
                      />
                      {errors.kitchenCount && touched.kitchenCount && (
                        <p className="text-red-400  ">{errors.kitchenCount}</p>
                      )}
                    </div>

                    <div className="flex items-center mb-3">
                      <Field
                        type="checkbox"
                        id="pujaRoom"
                        name="pujaRoom"
                        className="mr-2"
                      />
                      <label htmlFor="pujaRoom" className="font-bold">
                        Puja Room Available
                      </label>
                      {errors.pujaRoom && touched.pujaRoom && (
                        <p className="text-red-400  ">{errors.pujaRoom}</p>
                      )}
                    </div>

                    <div className="flex items-center mb-3">
                      <Field
                        type="checkbox"
                        id="ac"
                        name="ac"
                        className="mr-2"
                      />
                      <label htmlFor="ac" className="font-bold">
                        AC Available
                      </label>
                      {errors.ac && touched.ac && (
                        <p className="text-red-400  ">{errors.ac}</p>
                      )}
                    </div>

                    <div className="flex flex-col mb-3">
                      <label className="font-bold">
                        Amenities Nearby (comma separated)
                      </label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="amenitiesNearby"
                        placeholder="e.g., Park, School, Hospital"
                        value={
                          values.amenitiesNearby.join
                            ? values.amenitiesNearby.join(", ")
                            : ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const arr = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setFieldValue("amenitiesNearby", arr);
                        }}
                      />
                      {errors.amenitiesNearby && touched.amenitiesNearby && (
                        <p className="text-red-400 text-center ">
                          {errors.amenitiesNearby}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="py-2 px-10 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                      >
                        {fun}Home
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

export default HomesModal;
