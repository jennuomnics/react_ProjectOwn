import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";

import { addLatLng, getLocationDetails } from "../Slices/mapStore";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface Props {
    openMap:boolean,
    setOpenMap:(e:boolean) => void,
    handleOpenMap:() => void,
    handleCloseMap:() => void,
    handleOpenOld:() => void,
}

const MapView = ({openMap,setOpenMap,handleOpenMap,handleCloseMap,handleOpenOld}:Props) => {
  const { lat, lng } = useSelector((state: RootState) => state.maps);
   
  const position = [lat, lng];

  return (
    <Modal
      open={openMap}
      onClose={handleCloseMap}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={() => {
            handleCloseMap()
            handleOpenOld()
          }
          }
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
          Select Location
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
          <div style={{ height: "500px", width: "100%" }}>
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }} // ✅ This is critical
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <DetectClick />
            </MapContainer>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default MapView;

function DetectClick(): TSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  useMapEvents({
    click: (e) => {
      dispatch(addLatLng(e.latlng));
      dispatch(getLocationDetails(e.latlng));
    },
  });
}
