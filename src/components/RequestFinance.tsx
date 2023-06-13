import { Divider } from "@mui/material";
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
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useRouter } from "next/router";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const RequestFinance = () => {
  const router = useRouter();
  var converter = require("number-to-words");
  const [data, setData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState<string | null>();
  const [verify, setVerify] = useState<VERIFY[]>([]);
  const [hide, setHide] = useState(false);
  const [select, setSelect] = useState("xinfin");
  const [name, setName] = useState("");
  const [token, setToken] = useState();
  const [config, setConfig] = useState({});

  const [invoice, setInvoice] = useState({});
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [financeOption, setFinanceOption] = useState<boolean>(false);

  useEffect(() => {
    let inv: {} = localStorage.getItem("financeReqData");
    const finData = JSON.parse(inv);

    setInvoice(finData);
    console.log("finData: ", finData);

    let authStr = localStorage.getItem("user");
    let auth = JSON.parse(authStr);
    console.log("line 41-auth: ", auth);

    if (!auth) return;
    setId(auth.customerId);
    setName(auth.customerName);
    setEmail(auth.email);
    setInvoiceNo(finData.invoice_number);

    // Get Registered Banks
    const myConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const sellerAPIKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";

    axios
      .get(`https://dev.credore.xyz/invoice/banks/${sellerAPIKey}`, myConfig)
      .then((response) => {
        let banksResponse = response.data.banks;
        setBankData(response.data.banks);
        console.log("Line-74-banks: ", banksResponse);

        if (Object.keys(banksResponse).length === 0) {
          alert("no banks found");
          return;
        } else {
        }
      })
      .catch((error) => {
        console.log("Line-83-error: ", error);
      });
  }, []);

  useEffect(() => {
    console.log("useEffet-line-88-bankData: ", bankData);
  }, [bankData]);

  const formik = useFormik({
    initialValues: {
      bankId: "",
      invoiceValue: 0,
    },
    validationSchema: Yup.object({
      bankId: Yup.number().required("Bank Id Required."),
      invoiceValue: Yup.number()
        .required("Invoice Value Required.")
        .min(
            1,
            "Amount should be more than 0"
          )
        .max(
          invoice.amount,
          "Amount should not be more than invoice total of " + invoice.amount
        ),
    }),
    onSubmit: async (values) => {
      let authStr = localStorage.getItem("user");
      let auth = JSON.parse(authStr);
      let reqData = {
        bank_id: parseInt(values.bankId),
        invoice_id: invoice.invoice_number,
        invoice_value: values.invoiceValue,
      };
      console.log("reqData: ", reqData);
      const myConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const sellerAPIKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";

      try {
        axios
          .post(
            `https://dev.credore.xyz/invoice/financeRequest/${sellerAPIKey}`,
            reqData,
            myConfig
          )
          .then((response) => {
            alert("Finance request submitted successfully");
            // setDatas(response.data);
            console.log("Finance request response.data: ", response);
            router.push("/view_invoice");
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
    <div className="flex justify-between">
      {/* Sidebar Start*/}
      <Sidebar />
      {/* Sidebar End*/}

      <div id="detail">
        <div className="p-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-[#29564b]">
            Hello! {name}
          </h5>
          <Divider className="bg-gray-300" />
          <div className="w-full bg-white"></div>
        </div>

        <div className="px-3">
          <Card>
            <div className="mx-1">
              <h5 className="text-[#29564b] mb-3 font-medium text-xl">
                Requesting finance for Invoice Number -{" "}
                <span className="underline font-bold">{invoiceNo}</span>
              </h5>
              <p className="text-[#29564b] font-medium">
                Please enter the required details below
              </p>
              <div className="flex  justify-between m-auto">
                <div className="w-full px-5 py-3 bg-white">
                  <form
                    className="flex flex-col items-center justify-center w-full gap-5"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                      <div className="col-md-3">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Preffered Bank
                        </label>
                        {/* <label>{bankData.length}</label> */}

                        <select
                          id="bankId"
                          name="bankId"
                          value={formik?.values?.bankId}
                          onChange={formik.handleChange}
                          className={` ${
                            formik?.touched?.bankId && formik?.errors?.bankId
                              ? " border-red-600 text-red-700 bg-[#FFFFFF]"
                              : "border-gray-400 bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                        >
                          <option value="">Select a Bank</option>
                          {bankData.length > 0 ? (
                            <>
                              {bankData.map((item, index) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </>
                          ) : null}
                        </select>

                        <span className="text-xs font-light text-red-600">
                          {formik.touched.bankId && formik.errors.bankId}
                        </span>
                      </div>

                      <div className="col-md-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                          Amount .
                        </label>
                        <input
                          className={` ${
                            formik?.touched?.invoiceValue &&
                            formik?.errors?.invoiceValue
                              ? " border-[#F15928] text-red-700 bg-[#FFFFFF]"
                              : "border-[#81A79D] bg-[#FEFEFE]"
                          } w-full px-5 py-2 border-1 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70 focus:border-gray-500 focus:border-1 peer`}
                          type="text"
                          name="invoiceValue"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.invoiceValue}
                          placeholder="Bank Id"
                        />
                        <span className="text-xs font-light text-red-600">
                          {formik.touched.invoiceValue &&
                            formik.errors.invoiceValue}
                        </span>
                      </div>

                      <div className="col-md-4">
                        <Button
                          type="submit"
                          // onClick={() => applyForFinance(invoice)}
                          color="white"
                          className="w-60 px-10 py5 bg-[#238f74] text-white mt-5"
                          disabled={formik.isSubmitting}
                        >
                          Submit Request
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center">
            <div className="my-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFinance;
