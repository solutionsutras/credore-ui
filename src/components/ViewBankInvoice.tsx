import { Divider } from "@mui/material";
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";
import Sidebar from "./Sidebar";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const ViewBankInvoice = () => {
  var converter = require("number-to-words");
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState<string | null>();
  const [verify, setVerify] = useState<VERIFY[]>([]);
  const [hide, setHide] = useState(false);
  const [select, setSelect] = useState("xinfin");
  const [name, setName] = useState("");
  const [token, setToken] = useState();
  const [config, setConfig] = useState({});

  const [invoice, setInvoice] = useState({});
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [verifiedResponse, setVerifiedResponse] = useState({});
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    let currentBankInvoice = localStorage.getItem("currentBankInvoice");
    currentBankInvoice = JSON.parse(currentBankInvoice);
    console.log("currentBankInvoice: ", currentBankInvoice);

    let authStr = localStorage.getItem("bankuser");
    authStr = JSON.parse(authStr);

    if (!authStr) return;
    const auth = authStr;
    setName(auth.customerName);
    setEmail(auth.email);
    setVerifiedResponse({
      invoice_number: "",
      verification: [],
      chain: "",
    });

    try {
      const myConfig = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const bankerApiKey = "44814c85-546d-436f-82e1-449da4397e40";
      const invoiceId = currentBankInvoice.invoice_id;
      const url = `https://dev.credore.xyz/invoice/single/${invoiceId}/${bankerApiKey}`;
      console.log("url", url);

      // Now get Invoices information
      axios
        .get(url, myConfig)
        .then((response) => {
          console.log("response: ", response);
          const result = response.data;
          console.log("result: ", result);

          localStorage.setItem("bankInvoices", JSON.stringify(result));
          setInvoice(result);
          setInvoiceItems(result.Invoice_Lines);
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    console.log("useeffect - verifiedResponse: ", verifiedResponse);
  }, [verifiedResponse]);

  const ShowDialog = (item) => {
    console.log("item: ", item);
    handleOpen();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verifyInvoice = (item) => {
    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);

    if (!authStr) return;
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
        // alert("Invoice Verified Successfully \n"+ "\n" + "Invoice No: "+ response.data.invoice_number + "\n"+"");
        alert("Invoice Verified Successfully");
        setVerifiedResponse(JSON.stringify(response.data));
        console.log("verify response: ", response);
        handleOpen();
      })
      .catch((error) => {
        console.log("Verify error: ", error);
      });
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
              <div className="pb-1 mb-2 border-b-2 border-solid">
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

              <div className="items-center col-md-12 mt-3 gap-1 flex-col border-dotted border-2 py-3 px-2">
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

              <div className="flex items-center justify-start gap-2 col-md-12 pt-3">
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

              <div className="flex items-center justify-start gap-2 col-md-12 mt-1 pb-3 border-dotted border-b-2">
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

              <div className="flex items-center justify-start gap-1 col-md-12 mb-3 border-dotted border-b-2">
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

              <div className="col-md-12 pt-3">
                <p className="font-medium mb-1 ml-1">Items</p>
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
                            <td className="text-gray-600 font-medium px-6 py-1 text-center">
                              {item.description}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1 text-center">
                              {item.quantity}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1 text-center">
                              {invoice.currency}.{item.unit_price}
                            </td>
                            <td className="text-gray-600 font-medium px-6 py-1 text-center">
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

          <div>
            <div className="my-5">
              <Button
                onClick={() => verifyInvoice(invoice)}
                color="white"
                className="w-60 px-10 py5 bg-[#238f74] text-white"
              >
                Verify Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {verifiedResponse.invoice_number && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Verification details
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <h1>Invoice Verified Successfully</h1>
                <p>Invoice Number - {verifiedResponse.invoice_number}</p>

                <p>Blockchain- {verifiedResponse.chain}</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ViewBankInvoice;
