import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Login from "./Pages/Login/Login";
import AppLayout from "./Components/AppLayout";
import Register from "./Pages/Register/Register";
import Home from "./Components/Home";
import Homes from "./Pages/Homes/Homes";
import Cart from "./Pages/Cart/Cart";
import CheckOuth from "./Components/CheckOuth";
import Plots from "./Pages/Plots/Plots";
import { FlatContext } from "./Contexts/FlatsContext";
import Flats from "./Pages/Flats/Flats";


const App = () => {
  return (
    <BrowserRouter>
      <FlatContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        
          <Route
            path="/designs"
            element={
              <CheckOuth>
                <AppLayout />
              </CheckOuth>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Homes />} />
            <Route path="plot" element={<Plots />} />
            <Route path="cart" element={<Cart />} />
            <Route path="flat" element={<Flats />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </FlatContext>
    </BrowserRouter>
  );
}


export default App;