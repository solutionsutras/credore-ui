import React, { useEffect, useState } from "react";
import { Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import { AiTwotoneMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  useFormik,
  Field,
  FieldArray,
  Form,
  FormikErrors,
  FormikProps,
  withFormik,
  Formik,
  FormikProvider,
} from "formik";
import * as Yup from "Yup";
import CountrySelector from "./CountrySelector";
import { motion } from "framer-motion";
import LocationSelector from "./LocationSelector";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import note from "../assets/animation/note.json";
import Lottie from "lottie-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
let dlpcId = uuidv4();
let refId = uuidv4();

const buttonVariants = {
  hover: {
    scale: 1.1,
    // textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
    transition: {
      // yoyo: 10,
      // yoyo: Infinity,
      duration: 0.5,
    },
  },
};

type USER = {
  id: number;
  email: string;
  name: string;
  customerId: string;
  userCreatedAt: string;
  organisationName: string;
  lei: string;
  taxId: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  country: string;
};

// const [orgli, setOrgli] = useState<string | null>();

const NewInvoice = () => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [commiter, setCommiter] = useState("");
  const [commite, setCommite] = useState("");
  const [chain, setChain] = useState("");
  const [tx, setTx] = useState("");

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [organisationId, setOrganisationId] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [lei, setLei] = useState("");
  const [taxId, setTaxId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [token, setToken] = useState();
  const [config, setConfig] = useState({});

  var localUser, authStr, auth;

  useEffect(() => {
    localUser = localStorage.getItem("user");
    authStr = JSON.parse(localUser);
    console.log("authStr: ", authStr);

    if (!authStr) return;
    // auth = authStr.data[0];
    auth = authStr;
    console.log("auth: ", auth);

    setId(auth.customerId);
    setEmail(auth.email);
    setName(auth.customerName);
    setCustomerId(auth.customerId);
    setOrganisationId(auth.organisationId);
    setOrganisationName(auth.organisationName);
    setLei(auth.organisationLei);
    setTaxId(auth.organisationTaxId);
    setPhoneNumber(auth.phoneNumber);
    setCity(auth.city);
    setStreetAddress(auth.streetAddress);
    setPostalCode(auth.postalCode);
    setCountry(auth.country);
    // setToken(authStr.config.headers);
  }, []);

  const formattedDate = (date) => {
    let this_date: Date = new Date(date);
    console.log("this_date: ", this_date);
    let result = this_date.toISOString();
    console.log("result: ", result);
    return result;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      amount: "",
      currency: "",
      supplierName: "",
      supplierAddress: "",
      supplierVat: "",
      supplierContactEmail: "",
      supplierContactName: "",
      supplierContactPhone: "",
      customerName: "",
      customerAddress: "",
      customerVat: "",
      customerContactName: "",
      customerContactEmail: "",
      Invoice_Lines: [
        {
          description: "",
          quantity: "",
          unit_price: "",
          line_total: "",
        },
      ],
    },

    validationSchema: Yup.object({
      invoiceNumber: Yup.string().required("Invoice Number required"),
      invoiceDate: Yup.string().required("Invoice Date required"),
      dueDate: Yup.date().required("Date is required"),
      amount: Yup.string()
        .min(1, "Must be more than 1 characters")
        .required("This field is requried"),
      currency: Yup.string()
        .required("currency Required.")
        .min(3, "Minimum 3 letter")
        .max(10, "Maximum 100 letter"),
      supplierName: Yup.string().required(" required"),
      supplierAddress: Yup.string().required(" required"),
      supplierVat: Yup.string().required(" required"),
      supplierContactEmail: Yup.string().required(" required"),
      supplierContactName: Yup.string().required(" required"),
      supplierContactPhone: Yup.string().required(" required"),
      customerName: Yup.string().required(" required"),
      customerAddress: Yup.string().required(" required"),
      customerVat: Yup.string().required(" required"),
      customerContactName: Yup.string().required(" required"),
      customerContactEmail: Yup.string().required(" required"),
      Invoice_Lines: Yup.array().of(
        Yup.object().shape({
          description: Yup.string().required(" required"),
          quantity: Yup.number().required(" required"),
          unit_price: Yup.number().required(" required"),
          line_total: Yup.number().required(" required"),
        })
      ),
    }),

    onSubmit: async (values) => {
      console.log("values: ", values);

      let invoiceData = {
        invoice_number: values.invoiceNumber,
        invoice_date: formattedDate(values.invoiceDate),
        due_date: formattedDate(values.dueDate),
        currency: values.currency,
        amount: values.amount,
        supplier_name: values.supplierName,
        supplier_address: values.supplierAddress,
        supplier_vat_number: values.supplierVat,
        supplier_contact_email: values.supplierContactEmail,
        supplier_contact_name: values.supplierContactName,
        supplier_contact_phone: values.supplierContactPhone,
        customer_name: values.customerName,
        customer_address: values.customerAddress,
        customer_vat_number: values.customerVat,
        customer_contact_name: values.customerContactName,
        customer_contact_email: values.customerContactEmail,
        Invoice_Lines: values.Invoice_Lines,
      };

      let userData = {
        name: name,
        email: email,
        registration_id: id,
      };
      console.log("userData: ", userData);

      try {
        // First Get ApiKey

        localUser = localStorage.getItem("user");
        authStr = JSON.parse(localUser);
        console.log("authStr: ", authStr);

        if (!authStr) return;
        // auth = authStr.data[0];
        auth = authStr;
        console.log("auth: ", auth);
        // Add new invoice
        console.log("invoiceData: ", invoiceData);
        const myConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };
        console.log("myConfig - ", myConfig);
        const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
        axios
          .post(
            `https://dev.credore.xyz/invoice/peppol/${myApiKey}`,
            invoiceData,
            myConfig
          )
          .then((response) => {
            alert("Invoice added Successfully");
            console.log("2. response: ", response);
            localStorage.setItem("newInvoice", JSON.stringify(response.data));
            location.href = "/invoices";
          })
          .catch((error) => {
            console.log("API post error: ", error);
          });

        // formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="flex justify-between">
        {/* Sidebar Start*/}
        <div id="sidebar">
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <a className="active" href={`invoices`}>
                  Invoice
                </a>
              </li>
              <li>
                <a href={`pnotes`}>Promissory Note</a>
              </li>
              <li>
                <a href={`2`}>Bill Of Exchange</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Sidebar End*/}

        <div id="detail">
          <div className="p-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-[#29564b]">
              Hello! {name !== "" ? ", " + name : ""}
            </h5>
          </div>

          <div className="px-3">
            <Card>
              <h5 className="text-[#29564b] mx-3">
                Please enter the below information to ass the invoice
              </h5>
              <div className="flex  justify-between m-auto border-1 border-theme1">
                <div className="w-full px-5 py-3 bg-white">
                  <form
                    className="flex flex-col items-center justify-center w-full"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <h1 className="items-left border-[#333] border-b border-b-1">
                        Invoice Information
                      </h1>
                    </div>
                    <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                      {/* Invoice Number Field */}
                      <div className="col-md-6">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Invoice No.
                        </label>

                        <input
                          className={` ${
                            formik?.touched?.invoiceNumber &&
                            formik?.errors?.invoiceNumber
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="invoiceNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.invoiceNumber}
                          placeholder="Invoice Number"
                        />
                      </div>

                      {/* Invoice date Field */}
                      <div className="col-md-3">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Invoice Date
                        </label>

                        <input
                          className={` ${
                            formik?.touched?.invoiceDate &&
                            formik?.errors?.invoiceDate
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="date"
                          name="invoiceDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.invoiceDate}
                          placeholder="Date"
                        />
                        <span className="text-xs font-light text-red-600">
                          {formik.touched.invoiceDate &&
                            formik.errors.invoiceDate}
                        </span>
                      </div>

                      {/* Due date Field */}
                      <div className="col-md-3">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Due Date
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-white px-4 py-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                            formik.touched.dueDate &&
                            Boolean(formik.errors.dueDate)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="date"
                          name="dueDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dueDate}
                          placeholder="Date"
                        />
                        <span className="text-xs font-light text-red-600">
                          {formik.touched.dueDate && formik.errors.dueDate}
                        </span>
                      </div>
                    </div>

                    {/* Amount Field */}

                    <div className="flex items-center justify-start gap-4 col-md-12 mt-5">
                      <div className="col-md-6">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Amount
                        </label>
                        <div className="flex w-full flex-col gap-3 md:flex-row">
                          <input
                            className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-3/4 lg:w-full  ${
                              formik.touched.amount &&
                              Boolean(formik.errors.amount)
                                ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                                : "border-[#81A79D] bg-[#FEFEFE]"
                            } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                            type="text"
                            name="amount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>

                      {/* Currency Field */}
                      <div className="col-md-6">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Currency
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.currency &&
                            Boolean(formik.errors.currency)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="currency"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.currency}
                          placeholder="Enter currency"
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="items-left border-[#333] border-b border-b-1 mt-10">
                        Supplier Information
                      </h1>
                    </div>
                    {/* Supplier Name Field */}

                    <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                      <div className="col-md-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier Name
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierName &&
                            Boolean(formik.errors.supplierName)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierName}
                          placeholder="Supplier Name"
                        />
                      </div>

                      {/* Supplier Address Field */}
                      <div className="col-md-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier Address
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierAddress &&
                            Boolean(formik.errors.supplierAddress)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierAddress"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierAddress}
                          placeholder="Supplier Address"
                        />
                      </div>

                      <div className="col-md-4">
                        {/* Supplier Vat Field */}
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier VAT
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierVat &&
                            Boolean(formik.errors.supplierVat)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierVat"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierVat}
                          placeholder="Supplier GSTN"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-start gap-4 col-md-12 mt-5">
                      <div className="col-md-4">
                        {/* Supplier Vat Field */}
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier Contact Person Name
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierContactName &&
                            Boolean(formik.errors.supplierContactName)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierContactName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierContactName}
                          placeholder="Supplier Contact Person Name"
                        />
                      </div>
                      <div className="col-md-4">
                        {/* Supplier Contact Email Field */}

                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier Contact Email
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierContactEmail &&
                            Boolean(formik.errors.supplierContactEmail)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierContactEmail"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierContactEmail}
                          placeholder="Supplier Contact Email"
                        />
                      </div>

                      <div className="col-md-4">
                        {/* Supplier Contact Phone Field */}
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Supplier Contact Phone
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.supplierContactPhone &&
                            Boolean(formik.errors.supplierContactPhone)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="supplierContactPhone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.supplierContactPhone}
                          placeholder="Supplier Contact Phone"
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="items-left border-[#333] border-b border-b-1 mt-10">
                        Customer Information
                      </h1>
                    </div>
                    {/* Customer Name Field */}
                    <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                      <div className="col-md-6">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Customer Name
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.customerName &&
                            Boolean(formik.errors.customerName)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="customerName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.customerName}
                          placeholder="Customer Name"
                        />
                      </div>
                      {/* Customer Address Field */}
                      <div className="col-md-6">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Customer Address
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.customerAddress &&
                            Boolean(formik.errors.customerAddress)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="customerAddress"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.customerAddress}
                          placeholder="Customer Address"
                        />
                      </div>
                    </div>

                    {/* Customer Vat Field */}
                    <div className="flex items-center justify-start gap-4 col-md-12 mt-5">
                      <div className="col-md-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Customer VAT
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.customerVat &&
                            Boolean(formik.errors.customerVat)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="customerVat"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.customerVat}
                          placeholder="Customer GSTN"
                        />
                      </div>

                      <div className="col-md-4">
                        {/* Customer Contact Person Name Field */}
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Customer Contact Person Name
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.customerContactName &&
                            Boolean(formik.errors.customerContactName)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="customerContactName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.customerContactName}
                          placeholder="Customer Contact Person"
                        />
                      </div>

                      {/* Customer Contact Email Field */}
                      <div className="col-md-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Customer Contact Email
                        </label>

                        <input
                          className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
                            formik.touched.customerContactEmail &&
                            Boolean(formik.errors.customerContactEmail)
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="customerContactEmail"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.customerContactEmail}
                          placeholder="Customer Contact Email"
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="items-left border-[#333] border-b border-b-1 mt-10">
                        Items Information
                      </h1>
                    </div>

                    <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                      <FieldArray
                        name="Invoice_Lines"
                        render={(arrayHelpers) => (
                          <div className="">
                            {
                              // values.Invoice_Lines && values.Invoice_Lines.length > 0 ? (
                              formik.values.Invoice_Lines.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-5 mb-3"
                                >
                                  <Field
                                    name={`Invoice_Lines.${index}.description`}
                                    className="block w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full border-[#81A79D] bg-[#FEFEFE] w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer"
                                    placeholder={"Item Description"}
                                  />
                                  <Field
                                    name={`Invoice_Lines.${index}.quantity`}
                                    className="block w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full border-[#81A79D] bg-[#FEFEFE] w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer"
                                    placeholder={"Item Quantity"}
                                  />
                                  <Field
                                    name={`Invoice_Lines.${index}.unit_price`}
                                    className="block w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full border-[#81A79D] bg-[#FEFEFE] w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer"
                                    placeholder={"Unit Price"}
                                  />
                                  <Field
                                    name={`Invoice_Lines.${index}.line_total`}
                                    className="block w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full border-[#81A79D] bg-[#FEFEFE] w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer"
                                    placeholder={"Item Total"}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove a amenity from the list
                                    className="border py-2 px-5 rounded-md bg-[red] text-[white] text-sm"
                                  >
                                    Remove
                                  </button>
                                  {/* {errors.Invoice_Lines} */}
                                </div>
                              ))
                            }
                            <button
                              type="button"
                              className="border py-2 px-5 rounded-md bg-[green] text-[white] text-sm"
                              onClick={() =>
                                arrayHelpers.push({
                                  description: "",
                                  quantity: "",
                                  unit_price: "",
                                  line_total: "",
                                })
                              }
                            >
                              {/* show this when user has removed all amenities from the list */}
                              + Add an Item
                            </button>
                          </div>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        className="primary-inset rounded-lg px-5 py-3 font-medium text-white bg-[#3e1f92]"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <p>Submit</p>
                      </motion.button>
                    </div>
                  </form>
                </div>

                <div>
                  {/* <Button variant="outlined" onClick={handleClickOpen}>
					Open alert dialog
				</Button> */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Promissory note details
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <h1>Promissory Note Initiated {id}</h1>
                        <p>Drawer - {commiter}</p>
                        <p>Amount- {amount}</p>
                        <p>Currency- {currency}</p>
                        <p>Due date- {date}</p>
                        <p>Drawee- {commite}</p>
                        <p>Blockchain- {chain}</p>
                        <p>
                          TX details-
                          <a
                            className="underline decoration-blue-500"
                            target="_blank"
                            href={tx}
                          >
                            {tx}
                          </a>
                        </p>
                        {/* <p>TX details- {tx}</p> */}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </FormikProvider>
  );
};

export default NewInvoice;
