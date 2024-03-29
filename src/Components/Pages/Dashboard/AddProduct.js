import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../../firebase.init";
import swal from "sweetalert";

const AddProduct = () => {
  const [user] = useAuthState(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: e.target.name?.value,
      price: e.target.price?.value,
      image: e.target.image?.value,
      minimum: e.target.minimum?.value,
      stock: e.target.stock?.value,
      email: user?.email,
    };

    if (
      product.name &&
      product.price &&
      product.image &&
      product.minimum &&
      product.stock
    ) {
      fetch(" https://hidden-dawn-20976.herokuapp.com/product/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Your product successfully added!", "success");
        });

    }

    

    e.target.reset();
  };

  const { register } = useForm();
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="card w-96 h-[550px] bg-base-300 shadow-xl  ">
        <h2 className="text-2xl text-center mt-4">Add Items</h2>
        <div className="card-body">
          <form className="my-5 " onSubmit={handleSubmit}>
            <input
              className="input my-2 "
              {...register("name", { required: true, maxLength: 20 })}
              placeholder="Name"
            />
            <input
              className="input my-2"
              {...register("minimum", { required: true })}
              type="number"
              placeholder="Minimum "
            />
            <input
              className="input my-2"
              {...register("stock", { required: true })}
              type="number"
              placeholder="Stock"
            />
            <input
              className="input my-2"
              {...register("email", { required: true })}
              placeholder="email"
            />
            <input
              className="input my-2"
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
            />
            <input
              className="input my-2 "
              {...register("image", { required: true })}
              type="text"
              placeholder="Image"
            />
            <br />
            <button><input className="input mx-auto btn btn-outline " type="submit" value="Submit" /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
