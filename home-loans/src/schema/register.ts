import * as yup from "yup";

const validPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup.string().email("enter valid Email").required("Email is Required"),
  password: yup
    .string()
    .matches(validPassword, "password is not Strong")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password Not Matched")
    .required("confirm the above Password"),
});

export const addHomeValidation = yup.object({
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be greater than 0"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().required("ImageUrl is required"),
  bhkType: yup.string().required("BHK Type is required"),
  bedrooms: yup
    .number()
    .required("Bedrooms count is required")
    .min(1, "Must be at least 1"),
  bathrooms: yup
    .number()
    .required("Bathrooms count is required")
    .min(1, "Must be at least 1"),
  kitchenCount: yup
    .number()
    .required("Kitchen count is required")
    .min(1, "Must be at least 1"),
  pujaRoom: yup.boolean().required("Puja Room info is required"),
  ac: yup.boolean().required("AC info is required"),
  amenitiesNearby: yup
    .array()
    .of(yup.string())
    .required("Amenities nearby are required"),
});


export const addPlotValidation = yup.object({
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be greater than 0"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().required("Image URL is required"),
  areaSqFt: yup
    .number()
    .required("Area (sq ft) is required")
    .positive("Area must be greater than 0"),
  plotType: yup.string().required("Plot type is required"),
  facingDirection: yup.string().required("Facing direction is required"),
  roadWidth: yup.string().required("Road width is required"),
  availability: yup.string().required("Availability is required"),
  nearbyAmenities: yup
    .array()
    .of(yup.string())
    .min(1, "At least one amenity is required")
    .required("Nearby amenities are required"),
});

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
    .test("fileType", "unsupported file format", (value) => {
      return (
        value &&
        value instanceof File &&
        ["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
          value.type
        )
      );
    }),
});
