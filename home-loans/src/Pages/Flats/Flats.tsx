import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import type { FormikHelpers } from "formik";
import { useFlats} from "../../Contexts/FlatsContext";
import FlatItems from "./FlatsItems";
import FlatsModal from "../../Components/FlatsModal";
import type { addFlatSchema, flatsSchema } from "./FlatsSchema";

const initialValues = {
  title: "",
  location: "",
  price: 0,
  description: "",
  imageUrl: null,
  bhkType: "",
  bedrooms: 0,
  bathrooms: 0,
  balconies: 0,
  floorNumber: 0,
  totalFloors: 0,
  furnishing: "",
  availability: "",
  parking: "",
  nearbyAmenities: [],
  areaSqFt: 0,
  acAvailable: false,
  liftAvailable: false,
  security: false,
  powerBackup: false,
};


const Flats = () => {
  const { flats, getFlats, isLoading, addFlat } = useFlats();
  const isAdmin = localStorage.getItem('isAdmin')

  useEffect(() => {
    getFlats();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");


  const handleSubmit = (
    values: addFlatSchema,
    actions: FormikHelpers<addFlatSchema>
  ) => {
    if (values.imageUrl) {
      const createImageUrl = URL.createObjectURL(values.imageUrl);
      const addValues = {
        ...values,
        imageUrl: createImageUrl,
      };
      addFlat(addValues);
      getFlats();
    }

    setOpen(false);
    actions.resetForm();
  };


  const filteredFlats = flats?.filter((flat: flatsSchema) => {
    const matchesSearch =
      flat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flat.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBhk = bhkFilter ? flat.bhkType === bhkFilter : true;

  

    return matchesSearch && matchesBhk;
  });

  return (
    <div className="p-5 h-[90vh] overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Flats</h1>
        {isAdmin && (
          <button
            className="rounded-md bg-blue-600 py-2 px-4 text-sm text-white shadow-md hover:bg-blue-700"
            onClick={handleOpen}
          >
            + Add Flat
          </button>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          value={bhkFilter}
          onChange={(e) => setBhkFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All BHK Types</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="4 BHK">4 BHK</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredFlats.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredFlats.map((flat: flatsSchema) => (
            <FlatItems flat={flat} key={flat.id} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No flats found matching your filters.
        </div>
      )}

      {open && (
        <FlatsModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          intialValues={initialValues}
          fun="Add"
          handleSubmit={handleSubmit}
          previewImage=""
        />
      )}
    </div>
  );
};

export default Flats;
