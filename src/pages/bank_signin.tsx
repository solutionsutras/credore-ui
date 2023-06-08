import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useFormik } from "formik";
import { AiTwotoneMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "Yup";

const BankSignin = () => {
  const [email, setEmail] = useState();
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [Datas, setDatas] = useState([]);
  const router = useRouter();

  //   const handlePasswordChange = (evnt) => {
  //     setPasswordInput(evnt.target.value);
  //   }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  // Formic and Yup setup
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      checked: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    }),
    onSubmit: async (values) => {
      let user = {
        email: values.email,
        password: values.password,
      };
      console.log("user", user);
      try {
        axios
          .post("https://dev.credore.xyz/auth/signin", user)
          .then((response) => {
            // setDatas(response);
            console.log("response.data: ", response.data);
            localStorage.setItem("bankuser", JSON.stringify(response.data));

            location.href = "/bank_dashboard";
          })
          .catch((error) => {
            console.log("Fetch error: ", error);
            alert("SIgnup Error - " + error.response.data.message);
          });
      } catch (error) {
        alert("Something went wrong - " + error.response.data);
        console.log("Something went wrong: ", error.response.data);
      }
    },
  });

  return (
    <>
      <div className="bg-[#F5F5F5] flex flex-col items-center justify-center h-[100%] w-full">
        {/* logo container */}

        <div className="mt-[50px]">
          <img
            src="https://www.credore.xyz/assets/images/Logo.png"
            alt="img"
            width={160}
            height={32}
            loading="lazy"
          />
        </div>

        {/* login heading */}
        <div className="flex flex-col items-center justify-center bg-[#FFFFFF] shadow-2xl rounded-xl p-10 w-[90%] max-w-[550px] gap-y-4 mt-10">
          <h1 className="text-[#29564b] font-bold text-xl">
            Financial Institution Login
          </h1>

          {/* form starts */}
          <form
            className="flex flex-col items-center justify-center w-full mt-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formik?.values?.email}
                // className="bg-[#FEFEFE] px-5 py-3  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="Your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.email && formik?.errors?.email
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-3 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />

              <AiTwotoneMail className="absolute h-5 right-1  bottom-4 pr-2 w-8" />
            </div>
            <div className="w-full relative">
              <input
                type="password"
                id="password"
                name="password"
                pattern="[a-z0-9]{1,15}"
                // className="bg-[#FEFEFE] py-3 px-5 w-full mt-5 border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                className={` ${
                  formik?.touched?.password && formik?.errors?.password
                    ? "border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full  px-5 py-3 mt-5 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70  focus:border-gray-500 focus:border-1 peer`}
                value={formik?.values?.password}
                // value={"sell1234"}
                placeholder="******"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/* {formik?.touched?.password && formik?.errors?.password && (
                <small className="text-red-600">
                  {formik?.errors?.password}
                </small>
              )} */}

              <AiFillEyeInvisible className="absolute h-5 right-1  bottom-4 pr-2 w-8" />
            </div>

            <button
              // className=" text-white bg-violet-500 opacity-70 px-15 py-2 rounded-md shadow block w-full"
              className="bg-orange-500 rounded-[19px] font-medium text-richblack-900 w-full h-[55px] mt-6 text-center text-white text-xl "
              type="submit"
              disabled={!formik?.values?.email || !formik?.values?.password}
              // onClick={(e: any) => formik.handleSubmit()}
            >
              Login
            </button>
          </form>
        </div>

        {/* footer  */}
        <div className=" flex gap-4 items-center mt-5 w-[400px] ">
          <img
            src="https://play-lh.googleusercontent.com/mrmyna8Br6lxrXJlOYeemtD83ZDiH7mR7ERMp03XufE3B5CTbeO2nUVyLy4LjrTzHSY=w480-h960-rw"
            alt=""
            className="h-5"
          />
          <p className="text-gray-600 text-sm">
            We use advanced data protection to ensure your personal and
            financial details are kept safe.
          </p>
        </div>
      </div>
    </>
  );
};

export default BankSignin;
