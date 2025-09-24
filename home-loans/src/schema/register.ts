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
  bhkType: yup.string().required("BHK Type is required"),
  bedrooms: yup
    .number()
    .typeError("Bedrooms must be a number")
    .required("Bedrooms is required")
    .min(0, "Must be at least 0"),
  bathrooms: yup
    .number()
    .typeError("Bathrooms must be a number")
    .required("Bathrooms is required")
    .min(0, "Must be at least 0"),
  balconies: yup
    .number()
    .typeError("Balconies must be a number")
    .required("Balconies is required")
    .min(0, "Must be at least 0"),
  floorNumber: yup
    .number()
    .typeError("Floor Number must be a number")
    .required("Floor Number is required")
    .min(0, "Must be at least 0"),
  totalFloors: yup
    .number()
    .typeError("Total Floors must be a number")
    .required("Total Floors is required")
    .min(0, "Must be at least 0"),
  furnishing: yup.string().required("Furnishing is required"),
  availability: yup.string().required("Availability is required"),
  parking: yup.string().required("Parking is required"),
  nearbyAmenities: yup
    .array()
    .of(yup.string())
    .min(1, "At least one nearby amenity is required")
    .required("Nearby Amenities is required"),
  areaSqFt: yup
    .number()
    .typeError("Area must be a number")
    .required("Area is required")
    .min(0, "Must be at least 0"),
  acAvailable: yup.boolean(),
  liftAvailable: yup.boolean(),
  security: yup.boolean(),
  powerBackup: yup.boolean(),
});
