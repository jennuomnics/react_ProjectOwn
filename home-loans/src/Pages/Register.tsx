
import { Field, Form, Formik,type FormikHelpers} from "formik";
import Header from '../Components/Header';

import { registerSchema } from '../schema/register';
import api from '../axios.ts'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Values {
    firstName:string,
    lastName:string,
    password:string,
    email:string,
    confirmPassword:string,
}

const Register = () => {

 const navigate = useNavigate()
 const handleSubmit = async (values:Values,actions:FormikHelpers<Values>): Promise<void> => {
    
  try {
  const response = await api.post("/register", values);
  actions.resetForm();
  toast.success("user as Registed Successfully");
  if (response.status === 201) {
    navigate("/Login");
  }
  }
  catch(error) {
   if(axios.isAxiosError(error)) {
    toast.error(`${error.response?.data?.message}`)
   }
  }

 }

  return (
    <div className="felx flex-col h-screen">
      <Header />
      <div className="h-[90%] overflow-auto">
        <div className="mt-8 bg-white flex justify-center p-4 ">
          <Formik<Values>
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-xl rounded-md p-3 ">
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col  mb-3">
                    <label className="font-bold ">First Name</label>
                    <Field
                      type="text"
                      className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                      name="firstName"
                      placeholder="enter first name"
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-400  ">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col  mb-3 ">
                    <label className="font-bold ">last Name</label>
                    <Field
                      type="text"
                      className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                      name="lastName"
                      placeholder="enter last name"
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-400 ">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col  mb-3">
                  <label className="font-bold ">Email</label>
                  <Field
                    type="text"
                    className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                    name="email"
                    placeholder="enter Email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400  ">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col  mb-3 relative">
                  <label className="font-bold ">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="enter email"
                    className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-400 ">{errors.password}</p>
                  )}
                </div>
                <div className="flex flex-col  mb-3 relative">
                  <label className="font-bold ">confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm your Password"
                    className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-400  ">{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="py-2 px-10 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                  >
                    SignUp
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register