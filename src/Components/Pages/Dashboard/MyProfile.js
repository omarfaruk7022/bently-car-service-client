import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../../firebase.init";
import { useQuery } from "react-query";
import swal from "sweetalert";

const MyProfile = (e) => {
  const [user] = useAuthState(auth);

  const { isLoading, refetch } = useQuery();

  const email = user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = {
      name: user?.displayName,
      education: e.target.education?.value,
      job: e.target.job?.value,
      phone: e.target.phone?.value,
      city: e.target.city?.value,
    };

    if (
      users.name &&
      users.education &&
      users.job &&
      users.phone &&
      users.city
    ) {
      fetch(` https://hidden-dawn-20976.herokuapp.com/profile/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(users),
      })
        .then((res) => res.json())
        .then((data) => {
          
        });

      e.target.reset();
      refetch();
    }
  };

  const { register } = useForm();
  const [profile, setProfile] = useState();
  // if(isLoading){
  //   return <Loading/>
  // }

  fetch(` https://hidden-dawn-20976.herokuapp.com/profile/${email}`)
    .then((res) => res.json())
    .then((data) => {
      setProfile(data);
    });

  return (
    <div className="flex justify-center items-center">
      <div className="m-5 grid lg:grid-cols-2 grid-cols-1">
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title"> Name : {profile?.name}</h2>
            <p>Education : {profile?.education}</p>
            <p>Job : {profile?.job}</p>
            <p>City : {profile?.city}</p>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-200  shadow-xl grid grid-cols-1 ">
        <div className="card-body">
          <h2 className="card-title">{user.displayName}</h2>
          <p>{user.email}</p>
          <form className="my-5 " onSubmit={handleSubmit}>
            <input
              className="input my-2 "
              {...register("job")}
              placeholder="Job"
            />
            <input
              className="input my-2 "
              {...register("education")}
              placeholder="Education"
            />

            <input
              className="input my-2 "
              type="number"
              {...register("phone")}
              placeholder="Phone"
            />

            <input
              className="input my-2 "
              {...register("city")}
              placeholder="City"
            />

            <br />
            <input className="input mx-auto cursor-pointer " type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
