import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AiTwotoneMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "Yup";

const onboard = () => {
  // const [fullName, setFullName] = useState();
  // const [email, setEmail] = useState();
  // const [phone, setPhone] = useState();
  const [emailId, setEmailId] = useState();
  const [token, setToken] = useState();
  const [config, setConfig] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Datas, setDatas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const authStr = localStorage.getItem("user");
    console.log("authStr: ", authStr);

    if (!authStr) return;
    const auth: USER = JSON.parse(authStr);
    console.log("auth: ", auth);

    // if (auth.user.email) {
    //   const lsemail = auth.user.email;
    //   console.log("lsemail", lsemail);
    //   setEmailId(auth.user.email);
    // }
    // setEmailId(auth.user.email);
    setToken(auth.token);

    return () => {};
  }, []);

  useEffect(() => {
    setConfig({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return () => {};
  }, [token]);

  useEffect(() => {
    console.log("config: ", config);
    return () => {};
  }, [config]);

  // Formic and Yup setup
  const formik = useFormik({
    initialValues: {
      customerName: "",
      companyName: "",
      lei: "",
      taxId: "",
      city: "",
      country: "",
      phoneNumber: "",
      postalCode: "",
      streetAddress: "",
      checked: false,
    },
    validationSchema: Yup.object({
      customerName: Yup.string()
        .required("Name Required.")
        .min(3, "Minimum 3 letter")
        .max(100, "Maximum 100 letter"),
      companyName: Yup.string()
        .required("Company Name Required.")
        .min(3, "Minimum 3 letter")
        .max(100, "Maximum 100 letter"),
      lei: Yup.string()
        .required("LEI Required.")
        .min(3, "Minimum 3 letter")
        .max(100, "Maximum 50 letter"),
      taxId: Yup.string()
        .required("Tax ID/GSTN Required.")
        .min(3, "Minimum 3 letter")
        .max(100, "Maximum 20 letter"),
      city: Yup.string().required("City Required."),
      country: Yup.string(),

      email: Yup.string()
        // .required("Email Required.")
        .email("Enter valid email"),
      countryCode: Yup.string(),
      phoneNumber: Yup.number()
        .test("minlength", "phone number at list 10 digits", (val) =>
          Boolean(val && val.toString().length >= 6)
        )
        .test("len", "phone number can not be more then 16 digits", (val) =>
          Boolean(val && val.toString().length <= 16)
        )
        .required("Phone number is required"),
      postalCode: Yup.string().required("PIN Required."),
      streetAddress: Yup.string().required("Address field Required."),
    }),
    onSubmit: async (values) => {
      let sellerData = {
        email: emailId,
        customerName: values.customerName,
        companyName: values.companyName,
        lei: values.lei,
        taxId: values.taxId,
        city: values.city,
        country: values.country,
        phoneNumber: values.phoneNumber,
        postalCode: values.postalCode,
        streetAddress: values.streetAddress,
      };
      console.log("sellerData: ", sellerData);
      try {
        axios
          .post("https://dev.credore.xyz/users/register", sellerData, config)
          .then((response) => {
            setDatas(response.data);
            console.log("response.data: ", response);
            // alert("response.data: " + response.data);
            // localStorage.setItem("user", JSON.stringify(response));
            // let user = {
            //   email: emailId,
            //   password: values.password,
            // };
            // console.log("user", user);
            
            //   axios
            //     .post("https://dev.credore.xyz/auth/signin", user)
            //     .then((response) => {
            //       // setDatas(response);
            //       console.log("response.data: ", response.data);
            //       localStorage.setItem("user", JSON.stringify(response.data));
            //       console.log('!response.data.customerId: ', !response.data.customerId)
            //       if(!response.data.customerId){
            //         location.href = "/onboard";  
            //       }else{
            //         location.href = "/dashboard";
            //       }
            //     })
            //     .catch((error) => {
            //       console.log("Fetch error: ", error);
            //       alert("SIgnup Error - " + error.response.data.message);
            //       console.log("Signin Error: ", error.response.data.message);
            //     });
            location.href = "/signin";
          })
          .catch((error) => {
            console.log("API error: ", error.response.data);
          });
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  return (
    <>
      <div className="bg-[#F5F5F5] flex flex-col items-center justify-center h-[100%] w-full">
        {/* logo container */}

        <div className="mt-[20px]">
          <img
            src="https://www.credore.xyz/assets/images/Logo.png"
            alt="img"
            width={160}
            height={32}
            loading="lazy"
          />
        </div>

        {/* login heading */}
        <div className="flex flex-col items-center justify-center bg-[#FFFFFF] shadow-2xl rounded-xl p-10 w-[90%] max-w-[550px] gap-y-3 mt-5">
          <p className="text-gray-500 opacity-50 tracking-widest">
            WELCOME ONBOARD
          </p>
          <span>{emailId !== undefined ? emailId : ""}</span>
          <p className="text-gray-500 text-sm opacity-50 tracking-widest">
            We need a bit of information from you to go ahead...
          </p>

          {/* ============================================================
          form starts
          ============================================================ */}
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={formik.handleSubmit}
          >
            {/* Input for Seller Name */}
            <div className="w-full relative">
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formik?.values?.customerName}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="Your Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.customerName && formik?.errors?.customerName
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />
            </div>

            {/* Input for Company Name */}
            <div className="w-full relative mt-5">
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formik?.values?.companyName}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="Organization Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.companyName && formik?.errors?.companyName
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full relative mt-5">
              {/* Input for LEI */}
              <input
                type="text"
                id="lei"
                name="lei"
                value={formik?.values?.lei}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="LEI"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.lei && formik?.errors?.lei
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />

              {/* Input for TAX ID */}
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formik?.values?.taxId}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="Tax ID / GSTN"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.taxId && formik?.errors?.taxId
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full relative mt-5">
              {/* Input for country */}
              <select
                id="country"
                name="country"
                value={formik?.values?.country}
                onChange={formik.handleChange}
                className={` ${
                  formik?.touched?.country && formik?.errors?.country
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              >
                <option value="INDIA">INDIA</option>
              </select>

              {/* Input for city */}
              <input
                type="text"
                id="city"
                name="city"
                value={formik?.values?.city}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="City"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.city && formik?.errors?.city
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />
            </div>

            <div className="flex items-center justify-center gap-2 col-md-12 mt-5">
              <div className="flex col-md-2">
                <div className="w-full relative">
                  {/* Input for country code */}
                  <select
                    className={` ${
                      formik?.touched?.country && formik?.errors?.country
                        ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                        : "border-gray-400 bg-[#FEFEFE]"
                    } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                  >
                    <option selected>+91</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-center col-md-6">
                <div className="w-full relative">
                  {/* Input for phone number */}
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik?.values?.phoneNumber}
                    placeholder="Your phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` ${
                      formik?.touched?.phoneNumber &&
                      formik?.errors?.phoneNumber
                        ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                        : "border-gray-400 bg-[#FEFEFE]"
                    } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center col-md-4">
                <div className="w-full relative">
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formik?.values?.postalCode}
                    // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                    placeholder="PIN Code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` ${
                      formik?.touched?.postalCode && formik?.errors?.postalCode
                        ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                        : "border-gray-400 bg-[#FEFEFE]"
                    } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                  />
                </div>
              </div>
            </div>

            {/* Input for Company Name */}
            <div className="w-full relative mt-5">
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formik?.values?.streetAddress}
                // className="bg-[#FEFEFE] px-5 py-2  w-full mt-5  border-b-2 border-gray-500 border-solid outline-none focus:border-gray-500 focus:border-1 peer"
                placeholder="Street address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${
                  formik?.touched?.streetAddress &&
                  formik?.errors?.streetAddress
                    ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                    : "border-gray-400 bg-[#FEFEFE]"
                } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
              />
            </div>

            <button className="bg-orange-500 rounded-[19px] font-medium text-richblack-900 w-full h-[55px] mt-6 text-center text-white text-xl ">
              Create Account
            </button>
          </form>

          {/* forgot password and signup session */}
          <div className="flex gap-2 items-center mt-5">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="h-5 "
            />
            <p className="font-bold pr-2 cursor-pointer text-sm mr-3 border-r-2 border-gray-500">
              Forgot your Password
            </p>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAYFBMVEX///8AAAD+/v5/f39QUFDg4ODa2toZGRnw8PAbGxv39/ceHh4GBgahoaHQ0NBMTExAQEAODg5dXV0UFBTp6elGRka9vb2qqqp5eXlYWFgxMTElJSXIyMiQkJBsbGxlZWX6w7CCAAAECElEQVR4nO2bbXerIAyAhVZqrfZ17bo7t/3/f3kFpUVeJA4CvefcfFlPZeQxCUlEWhRIQoMuJyBIIDS/FWhuK9DsBPklRbDP6kjhhOx+zg7wAhkngRHmFaRwQv606r3LBMsNXYMPAJkg+w16hRYvQIkMUNd5Aer39fF4f0PU4OMvr4TLpkREmGdghDSCgeAxeKxQnYkUNIZZhJIV1YdE2ODEw7wNyk2vtj5KhjuGfm8ckC0r6HpEOHrXpqkirHCVQu8f9oiH3yAs/o8JwXZQ/FnKeFgvn2S+V/bGgQyBXVlQEQ/vyxFChDWPxUg+WVF//MIPgV5QCGQ8qGsSNHsQQrkjE9m+FRVLSsAuRJMNmwzwzx5YOlmjE2hVCjB/YBwYNtDqA2T6qHHARXFDggdfdjIAtqoN8DvEUidoJnGQ4JFMZmWVYWIDdIQ+DvTV0DD/vy2Qrl1Z5V4N1/s40Al2UXul/dUM9UG6YUBJDIJLVIKbC+AiCczVGNcLe0JO02iXd7wfCTYGwSVuHFzJycy7XEY16HFQdIMNDmtdpBdMgiZy194STuDse2z5IK4XaLHisx5c1y1ZeekTnL9VFgiu/rPUfNA007oQLKJRnUPwVmeIEs++cjGL4KnOMAJABXUjMBNg8WoEFS8nQmkSXBZUZ7HJBKufLoQY1RlYwR0Ilqx8WtKtc+3QFsKO8Obp0qK2aXaElWkDvD7RilDz6D+qBDIrV1GVOxFoXzgI+aoVBrkWujtsqQciULGF0xu+OowWeOSDjqwQnhdsCF3/1Xf/qZJ2GAn2lx4hfrOsI3AFfP9GtEyjL2Tz0n9cRVZvRRhUnfnn8munrEZumwQIwsb3/ptbb/ZvkRwe/cE6DQKXin/zfTvr+SAOgiWQVIQh0Fo1H6yeuzgprDAsN/qsDsdW3ciKgmBbTYYjHk825266k+ZBAO1vWAcZK+JnALgb/VG4FRwZRUcQvdKmtdSCeQRAwnINsSD83Kxj5xAgAM4rhiMYcwyeQQC1UGAEt8xaATIBLkKQABDoLEJ44QxGCG9gwh2Bj/AwdK5YUG4xE4JqZBwE+XBv3+LQnHzAQOBuHroDwAuudzGwjU1AxZ6fsIOx3aXJ2NDv4xIMf5xbrza5Lp0dNGi/BAFuhEUdjHMD2JQbmAD0ouw5xr0NrnlhiQ2ofx9mct31MkCVtgMDwF7Vob5EoVCMUBXuy5kPzaU5yhV09gCfIIW8AEB2hATiOaibn+AFnPD/nG4SBHwFuTO7x8oJMg76caPMAttlytnASIasgq0e8oYkRaf66gSoClI0MPkb1XlJ8pu2/LeZXV4goeUnyK0kzc/qMgsuAP6JcO/kYW+JoiBkB/DbADuxo59J/xcEv4VZktD+AotNGQ4EuriNAAAAAElFTkSuQmCC"
              alt=""
              className="h-6 "
            />
            <p>Already registered?</p>
            <button onClick={() => router.push("/signin")}>
              <p className="font-bold cursor-pointer text-sm border-b-2 border-gray-600">
                Sign in
              </p>
            </button>
          </div>
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

export default onboard;
