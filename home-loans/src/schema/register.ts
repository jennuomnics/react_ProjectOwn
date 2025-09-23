import * as yup from 'yup';

const validPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const registerSchema = yup.object({
    firstName:yup.string().required('First Name is Required'),
    lastName:yup.string().required('Last Name is Required'),
    email:yup.string().email('enter valid Email').required('Email is Required'),
    password:yup.string().matches(validPassword,'password is not Strong').required("password is required"),
    confirmPassword:yup.string().oneOf([yup.ref('password')],"password Not Matched").required('confirm the above Password')
})


export const addHomeValidation = yup.object({
  title:yup.string().required('Title is Required'),
  location:yup.string().required('location is Required'),
  price:yup.number().required('Price is Required'),
  description:yup.string().required('Description is Required'),
  imageUrl:yup.string().required('ImageUrl is Required')
})


export const addFlatValidation = yup.object({
  title: yup.string().required("Title is Required"),
  location: yup.string().required("Location is Required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is Required"),
  description: yup.string().required("Description is Required"),
  imageUrl: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File too large (max 800KB)", (value) => {
      // @ts-ignore
      console.log(value, value?.size);
      return value && value instanceof File && value.size <= 800 * 1024;
    })
    .test('fileType',"unsupported file format",value => {
      return (
        value &&
        value instanceof File &&
        ["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
          value.type
        )
      );
    })
});