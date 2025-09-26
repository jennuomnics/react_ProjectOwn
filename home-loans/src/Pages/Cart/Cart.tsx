import {useSelector } from "react-redux";
import CartItems from './CartItems';
import {type AppDispatch, type RootState } from "../../store";
import { OriginalPrice,  } from "../../Slices/cartSlice";

import { useState } from "react";
import BookedModal from "../../Components/BookedModal";


const Cart = () => {

  const {cart,bookingStatus} = useSelector((state:RootState) => state.cart)




    const [open, setOpen] =useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

  const originalPrice = useSelector(OriginalPrice)
  const storePickUp = 99 
  const tax = 799 
  const total_price = originalPrice  + storePickUp + tax


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900  p-5 h-[90vh] overflow-y-auto mt-5 ml-5">
      <div className="mx-auto w-full px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Saved Properties
        </h2>
        {cart.length === 0 && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg"
            height={"350px"}
            width={"800px"}
          />
        )}
        <div className="flex">
          <div className=" w-full flex-none ">
            <div className=" grid grid-cols-1   xl:grid-cols-3 gap-3">
              {cart.map((cart) => (
                <CartItems cart={cart} key={cart.id} />
              ))}
            </div>
            {cart.length > 0 && (
              <div className="flex items-center">
                <button
                  disabled={bookingStatus ? true : false}
                  onClick={() => setOpen(true)}
                  className="bg-gray-900 my-4 mx-2 text-white hover:bg-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-300 shadow disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {bookingStatus ? "Booked" : "Book now"}
                </button>
                {!bookingStatus && (
                  <p className="text-red-600 bg-red-100 p-2">
                    Not Booked Your Contact Slot
                  </p>
                )}
                {bookingStatus && (
                  <p className="text-green-600 bg-green-100 p-2">
                    Your Slot has Booked Sucessfully Our Broker Will Contact You
                  </p>
                )}
              </div>
            )}
          </div>
          {open && (
            <BookedModal
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          )}

          {/* {cart.length > 0 && (
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pricing summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${originalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Side Charges
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${storePickUp}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${tax}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${total_price}
                    </dd>
                  </dl>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <p
                    onClick={() => navigate(-1)}
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}

export default Cart