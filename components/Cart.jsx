import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useForm } from "react-hook-form";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { runFireworks } from "../lib/utils";

const Cart = () => {
  const { Moralis, isAuthenticated, isWeb3Enabled, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (formdata) => {
    pay(totalPrice.toPrecision(2), formdata);
  };

  async function saveData(amount, formdata) {
    const Data = Moralis.Object.extend("Data");
    const data = new Data();
    data.set("CartItems", cartItems);
    data.set("MaticAddress", account);
    data.set("FormData", formdata);
    data.set("TotalPaid", amount);
    await data.save();
  }

  async function pay(amount, formdata) {
    if (isAuthenticated && isWeb3Enabled) {
      await Moralis.enableWeb3;
      let options = {
        contractAddress: "0xe0C78f4d638c2B70b7aF73E6ee7b8dDf445D2F98",
        functionName: "sendToken",
        abi: [
          {
            inputs: [],
            name: "sendToken",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ],
        Params: {},
        msgValue: Moralis.Units.ETH(amount),
      };

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          saveData(amount, formdata);
          setShowCart(false);
          runFireworks();
          toast.success("Success!");
        },
        onError: (err) => {
          toast.error(
            "Attention! Insufficient funds to complete the transaction"
          );
          /* if (err.code === "INSUFFICIENT_FUNDS") {
            toast.error(
              "Attention! Insufficient funds to complete the transaction"
            );
          } */
        },
      });

    } else {
      toast.error("You first need to connect your wallet!");
    }
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>
                      {item.price + " "}
                      <img
                        src={"../polygon-token.png"}
                        width={18}
                        height={18}
                      />
                    </h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="form-bgg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Full Name</label>
                <input
                  {...register("fullName", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />

                <label>Phone Number</label>
                <input
                  {...register("phoneNumber", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />

                <label>Address</label>
                <input
                  {...register("address", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />

                <label>Country</label>
                <input
                  {...register("country", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />

                <label>City</label>
                <input
                  {...register("city", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />

                <label>Zip Code</label>
                <input
                  {...register("zipcode", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <br />
                {(errors?.fullName?.type === "required" ||
                  errors?.phoneNumber?.type === "required" ||
                  errors?.address?.type === "required" ||
                  errors?.country?.type === "required" ||
                  errors?.city?.type === "required" ||
                  errors?.zipcode?.type === "required") && (
                  <script type="text/javascript">
                    {toast.error("All fields are required")}
                  </script>
                )}

                <div className="total">
                  <h3>Subtotal:</h3>
                  <h3>
                    {totalPrice.toPrecision(2) + " "}
                    <img src={"../polygon-token.png"} width={18} height={18} />
                  </h3>
                </div>
                <div className="btn-container">
                  <input type="submit" className="btn" value="Pay with Matic" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
