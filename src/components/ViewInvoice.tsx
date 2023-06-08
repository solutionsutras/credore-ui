import { Divider } from "@mui/material";
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

const ViewInvoice = () => {
  const router = useRouter();
  var converter = require("number-to-words");
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [orgli, setOrgli] = useState<string | null>();
  const [id, setId] = useState("");
  const [email, setEmail] = useState<string | null>();
  const [verify, setVerify] = useState<VERIFY[]>([]);
  const [hide, setHide] = useState(false);
  const [select, setSelect] = useState("xinfin");
  const [name, setName] = useState("");
  const [token, setToken] = useState();
  const [config, setConfig] = useState({});

  const [invoice, setInvoice] = useState({});
  const [notarised, setNotarised] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [financeOption, setFinanceOption] = useState<boolean>(false);

  useEffect(() => {
    let inv: {} = localStorage.getItem("currentInvoice");
    const currentInvoice = JSON.parse(inv);

    setInvoice(currentInvoice);
    console.log("currentInvoice: ", currentInvoice);

    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);

    if (!authStr) return;
    const auth = authStr;
    setId(auth.customerId);
    setName(auth.customerName);
    setEmail(auth.email);
    setInvoiceItems(currentInvoice.Invoice_Lines);

    if (currentInvoice.latestStatus) {
      if (currentInvoice.latestStatus !== "notarised") {
        setNotarised(false);
      } else {
        setNotarised(true);
      }
    } else {
      setNotarised(false);
    }
  }, []);

  useEffect(() => {
    console.log("invoice.Invoice_Lines: ", invoice.Invoice_Lines);
  }, [invoice]);

  const notarise = (item) => {
    try {
      let authStr = localStorage.getItem("user");
      authStr = JSON.parse(authStr);
      console.log("authStr: ", authStr);

      if (!authStr) return;
      // const auth: USER = authStr.data[0];
      const auth = authStr;

      const myConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
      axios
        .post(
          `https://dev.credore.xyz/invoice/merkleRoot/${myApiKey}`,
          item,
          myConfig
        )
        .then((response) => {
          alert("Merkle Root Created Successfully");

          console.log("merkelRoot response: ", response);
          let configData = JSON.parse(response.config.data);
          console.log("Notarise Input: ", configData);

          let this_date: Date = new Date();
          console.log("this_date: ", this_date);
          let newDate = this_date.toISOString();

          let nData = {
            invoice_id: item.invoice_number,
            assetMerkleRoot: response.data.merkleRoot,
            assetType: "invoice",
            glei: "335800E6C75YGSGD5T66",
            gleiVerificationDate: newDate,
            verificationDate: newDate,
            originator: configData.supplier_contact_email,
            status: "notarised",
          };
          console.log("nData: ", nData);
          console.log("104-myConfig: ", myConfig);
          const chain = "polygon";

          axios
            .post(
              `https://dev.credore.xyz/invoice/addasset/meta/${myApiKey}/${chain}`,
              nData,
              myConfig
            )
            .then((response) => {
              setNotarised(true);
              alert("Invoice Notarised Successfully");
              console.log("notarise response: ", response);
              //   let configData = JSON.parse(response.config.data);
              //   console.log("configData: ", configData);
            })
            .catch((error) => {
              console.log("Notarise error: ", error);
            });
        })
        .catch((error) => {
          console.log("API post error: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyInvoice = (item) => {
    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);
    // console.log("authStr: ", authStr);

    if (!authStr) return;
    // const auth: USER = authStr.data[0];
    const auth = authStr;

    const myConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    console.log("148-myconfig: ", myConfig);

    let invoiceId = item.invoice_number;
    let chain = "polygon";
    const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
    const verifyInput = {};
    axios
      .get(
        `https://dev.credore.xyz/invoice/proof/verify/${invoiceId}/${chain}/${myApiKey}`,
        myConfig
      )
      .then((response) => {
        alert("Invoice Verified Successfully");
        console.log("verify response: ", response);
        //   let configData = JSON.parse(response.config.data);
        //   console.log("configData: ", configData);
      })
      .catch((error) => {
        console.log("Verify error: ", error);
      });
  };

  const requestFinance = (item) => {
    console.log("line-182-item: ", item);
    localStorage.setItem("financeReqData", JSON.stringify(item));
    router.push("/request_finance");
  };

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
            <div>
              <div className="px-5 pt-8 pb-3 flex justify-between">
                <p className="text-2xl font-bold">Invoice Details</p>
              </div>

              <div className="flex">
                <label className="mb-1 block text-base font-semibold text-gray-700 ">
                  Status
                </label>
                <span className="mb-1 block text-base font-medium text-gray-500 ml-5">
                  {invoice.latestStatus ? invoice.latestStatus : "Created"}
                </span>
              </div>

              <div className="items-center col-md-12 mt-3 gap-1 flex-col">
                <div className="col-md-3 flex flex-row justify-between">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Invoice No
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                    {invoice.invoice_number}
                  </span>
                </div>
                <div className="col-md-3 flex flex-row justify-between">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Invoice Date
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                    {moment(invoice.invoice_date).format("Do MMM YYYY")}
                  </span>
                </div>
                <div className="col-md-3 flex flex-row justify-between">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Due Date
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                    {moment(invoice.due_date).format("Do MMM YYYY")}
                  </span>
                </div>
                <div className="col-md-3 flex flex-row justify-between">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Amount
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                    {invoice.currency} {invoice.amount}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 col-md-12 mt-6">
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_name}
                  </span>
                </div>
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier Address
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_address}
                  </span>
                </div>
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier Tax Id
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_vat_number}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 col-md-12 mt-1">
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier Contact Person
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_contact_name}
                  </span>
                </div>
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier Contact Email
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_contact_email}
                  </span>
                </div>

                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Supplier Contact Phone
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.supplier_contact_phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 col-md-12 mt-6">
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Customer Name
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.customer_name}
                  </span>
                </div>
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Customer Address
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.customer_address}
                  </span>
                </div>

                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Customer Tax ID
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.customer_vat_number}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-1 col-md-12 mt-1">
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Customer Contact Email
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.customer_contact_name}
                  </span>
                </div>
                <div className="col-md-4 flex">
                  <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                    Customer Contact Email
                  </label>
                  <span className="mb-1 block text-sm font-medium text-gray-500 ml-2">
                    {invoice.customer_contact_email}
                  </span>
                </div>
              </div>

              <div className="col-md-12 mt-10">
                <p className="font-medium">{invoiceItems.length} Items</p>
                <div className="">
                  {invoiceItems.length == 0 ? (
                    <p className="font-medium">No Items</p>
                  ) : (
                    <div>
                      <table className="border">
                        <thead>
                          <tr className="bg-transparent">
                            <th className="text-sm text-gray-900 font-bold px-6 py-2 border">
                              Item Name
                            </th>
                            <th className="text-sm text-gray-900 font-bold px-6 py-2 border">
                              Quantity
                            </th>
                            <th className="text-sm text-gray-900 font-bold px-6 py-2 border">
                              Unit Price
                            </th>
                            <th className="text-text-gray-900 font-bold px-6 py-2 border">
                              Item Total
                            </th>
                          </tr>
                        </thead>

                        {invoiceItems.map((item, index) => (
                          <tr className="my-0 text-sm bg-white dark:border-gray-700 dark:bg-gray-800 items-center">
                            <td className="text-gray-600 font-medium px-6 py-1">
                              {item.description}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1">
                              {item.quantity}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1">
                              {invoice.currency}.{item.unit_price}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1">
                              {invoice.currency}.{item.line_total}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center">
            <div className="my-5">
              {notarised ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => verifyInvoice(invoice)}
                    color="white"
                    className="w-60 px-10 py5 bg-[#238f74] text-white"
                  >
                    Verify Invoice
                  </Button>

                  <Button
                    onClick={() => requestFinance(invoice)}
                    color="white"
                    className="w-60 px-10 py5 bg-[#f15928] text-white"
                  >
                    Request Finace
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => notarise(invoice)}
                    color="white"
                    className="w-60 px-10 py5 bg-[#238f74] text-white"
                  >
                    Notarise Invoice
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
