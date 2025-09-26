import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { updateStatus } from "../Slices/cartSlice";

interface bookSchema {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  setOpen: (a: boolean) => void;
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

const BookedModal = ({
  open,
  setOpen,
  handleClose,
  handleOpen,
}: bookSchema) => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const dispatch = useDispatch<AppDispatch>()

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 12; hour++) {
     if(hour === 9) {
        slots.push({ label: `0${hour}:00 AM`, value: `0${hour}:00` });
     }
     else{
         slots.push({ label: `${hour}:00 AM`, value: `0${hour}:00` });
     }
     
    }

    for (let hour = 1; hour <= 5; hour++) {
      slots.push({ label: `0${hour}:00 PM`, value: `0${hour}:00` });
    }

    return slots;
  };

  const slots = generateTimeSlots();

  const handleConfirmBooking = () => {
    dispatch(updateStatus())
    handleClose()
  }
  
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            style={{ fontWeight: "bold" }}
            className="text-3xl font-bold mb-2"
          >
            Book Your Slot To Contact With The Broker
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <div className="max-w-2xl ">
              <p className="text-gray-600 mb-6">Date: {today}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlot(slot.value)}
                    className={`cursor-pointer py-2 px-4 rounded-lg border transition-all duration-200 
              ${
                selectedSlot === slot.value
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
              <button className="mt-5 bg-blue-600 text-white border-blue-700 py-2 px-4 rounded-lg border transition-all duration-200"
              onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BookedModal;
