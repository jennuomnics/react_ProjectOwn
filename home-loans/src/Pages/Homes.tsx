import { useEffect, useRef, useState } from "react";

import HomesList from "./HomesList.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState} from "../store.tsx";
import { addHome, fetchData, type homesStructure } from "../Slices/homeSlice.tsx";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Field, Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { addHomeValidation } from "../schema/register.ts";
import MapView from "../Components/MapView.tsx";


 interface addHomeSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
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


interface homeSchema {
  id: number;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Homes = () => {

  const dispatch = useDispatch<AppDispatch>()
  const {homes,error,isLoading} = useSelector((state:RootState) => state.homes)
  const {location} = useSelector((state:RootState) => state.maps)

  const formikRef = useRef<FormikProps<addHomeSchema>>(null);
  const [openMap, setOpenMap] = useState(false);
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);



   const [open, setOpen] =useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);


  const handleAddHome = (values: addHomeSchema, actions:FormikHelpers<addHomeSchema>) => {
     
    dispatch(addHome(values));
    handleClose();
    actions.resetForm()
  };


  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  useEffect(() => {
    if (location && formikRef.current) {
      formikRef.current.setFieldValue("location", location);
    }
  }, [location]);

    if (isLoading) {
      return <p>Loading</p>;
    }

    if(error) {
      return <p>{error}</p>
    }


  return (
    <div className="flex flex-col items-center p-5 h-[90vh] overflow-y-auto">
      <div className="flex items-center gap-20 p-4">
        <h1 className="text-stone-800 font-bold text-xl ">Homes</h1>
        <button
          onClick={handleOpen}
          className="py-2 px-10 rounded-2xl bg-blue-400 text-black font-bold cursor-pointer"
        >
          Add Home
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {homes.map((home: homeSchema) => (
          <HomesList home={home} key={home.id} />
        ))}
      </ul>

      <div>
        <MapView
          openMap={openMap}
          setOpenMap={setOpenMap}
          handleOpenMap={handleOpen}
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
              Add new Home
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <Formik
                innerRef={formikRef}
                initialValues={{
                  title: "",
                  location: "",
                  price: 0,
                  description: "",
                  imageUrl: "",
                }}
                validationSchema={addHomeValidation}
                onSubmit={handleAddHome}
              >
                {({ errors, touched,values}) => (
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
                        <p className="text-red-400 text-center bg-red-200">
                          {errors.title}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col mb-3">
                      <label className="font-bold">location</label>
                      <Field
                        type="text"
                        className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                        name="location"
                        placeholder="enter location"
                        value={values.location}
                      />
                      <button
                        type="button"
                        onClick={() => setOpenMap(true)}
                        className="py-2 px-10 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                      >
                        Select Loction
                      </button>
                      {errors.location && touched.location && (
                        <p className="text-red-400 text-center bg-red-200">
                          {errors.location}
                        </p>
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
                        <p className="text-red-400 text-center bg-red-200">
                          {errors.price}
                        </p>
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
                        <p className="text-red-400 text-center bg-red-200">
                          {errors.description}
                        </p>
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
                        <p className="text-red-400 text-center bg-red-200">
                          {errors.imageUrl}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="py-2 px-10 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                      >
                        AddHome
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Homes;
