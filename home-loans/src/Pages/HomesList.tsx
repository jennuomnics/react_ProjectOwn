import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik, type FormikHelpers } from "formik";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { addHomeValidation } from "../schema/register";
import { deleteHome, fetchData, updateHome } from "../Slices/homeSlice";
import { addToCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";

export interface homeSchema {
  id: number;
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

interface addHomeSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface HomeListProps {
  home: homeSchema;
}

const HomesList = ({ home }: HomeListProps) => {
  const { id, title, location, price, description, imageUrl } = home;

  const { cart } = useSelector((state: RootState) => state.cart);

  const isAdded = cart.find((item) => item.id === id)
 

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdateHome = (
    values: addHomeSchema,
    actions: FormikHelpers<addHomeSchema>
  ) => {
    dispatch(updateHome({ id, newHome: values }));
    handleClose();
    actions.resetForm();
  };

  const handleAddtoCart = () => {
    const cartItem = {
      id,
      title,
      location,
      price,
      description,
      imageUrl,
      quantity: 1,
      totalPrice: price,
    };
    dispatch(addToCart(cartItem));
    toast.success(`${title} added to Cart`)
  };

  const handleDelete = async () => {
    await dispatch(deleteHome(id));
    dispatch(fetchData()); // ✅ Refetch homes after deletion
  };

  return (
    <li className="bg-white shadow-2xl  rounded-md flex flex-col  w-90">
      <img
        src={imageUrl}
        className=""
        style={{ height: "250px", objectFit: "fill" }}
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-stone-800 font-bold">{title}</h1>

          <MdDelete
            className="text-2xl cursor-pointer"
            onClick={handleDelete}
          />
          <FaEdit className="text-2xl cursor-pointer" onClick={handleOpen} />
        </div>
        <p className="font-bold text-green-800 text-center bg-green-100 mb-3">
          {price} Availble in Less Cost
        </p>
        <p className="bg-stone-200 text-dark px-3 text-center py-1">
          {description}
          🏟️{location}
        </p>
        <div className="flex justify-between p-3 items-center">
          <button
            onClick={handleAddtoCart}
            disabled={isAdded ? true:false}
            className={`py-2 px-10 rounded-2xl font-bold cursor-pointer transition-opacity ${
              isAdded
                ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
                : "bg-yellow-400 text-black"
            }`}
          >
            {isAdded ? "Already Added" : "Add to Cart"}
          </button>

          <button className="py-2 px-10 rounded-2xl bg-green-600 text-white font-bold cursor-pointer">
            Buy
          </button>
        </div>
      </div>

      <div>
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
                initialValues={{
                  title,
                  location,
                  price,
                  description,
                  imageUrl,
                }}
                validationSchema={addHomeValidation}
                onSubmit={handleUpdateHome}
              >
                {({ errors, touched }) => (
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
                      />
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
    </li>
  );
};

export default HomesList;
