import { Divider } from "@mui/material";
import {
  Button,
  Card,
  Alert,
  Dropdown,
  Modal,
  Table,
  Tabs,
} from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { alertService } from "../services";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const ViewInvoice = () => {
  const router = useRouter();
  var converter = require("number-to-words");
  const [notariseAlertVisible, setNotariseAlertVisible] =
    useState<boolean>(false);
  const [tokeniseAlertVisible, setTokeniseAlertVisible] =
    useState<boolean>(true);
  const [data, setData] = useState([]);
  const [orgli, setOrgli] = useState<string | null>();
  const [id, setId] = useState("");
  const [email, setEmail] = useState<string | null>();
  const [verify, setVerify] = useState<VERIFY[]>([]);
  const [hide, setHide] = useState(false);
  const [select, setSelect] = useState("xinfin");
  const [name, setName] = useState("");

  const [invoice, setInvoice] = useState({});
  const [notarised, setNotarised] = useState<boolean>(false);
  const [tokenised, setTokenised] = useState<boolean>(false);
  const [notarisedData, setNotarisedData] = useState({
    asset: {
      asset_id: "",
      nft_id: "",
      assetMerkleRoot: "",
      assetType: "",
      glei: "",
      gleiVerificationDate: "",
      verificationDate: "",
      originator: "",
      status: "",
      erc1155_address: "",
      owner_pubkey_address: "",
      chain: "",
    },
    txHash: "",
  });
  const [tokenisedData, setTokenisedData] = useState({
    id: "",
    dsaAddress: "",
    trustedForwarder: "",
    nftRecipient: "",
    nft_id: "",
    assetMerkleRoot: "",
    assetType: "",
    glei: "",
    gleiVerificationDate: "",
    originator: "",
    sigForTransfer: "",
    methodData: "",
    chain: "",
    txHashUrl: "",
  });
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [financeOption, setFinanceOption] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState({});
  const [config, setConfig] = useState({});
  const [config1, setConfig1] = useState({});
  const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
  const [chain, setChain] = useState("polygon");

  useEffect(() => {
    let inv: {} = localStorage.getItem("currentInvoice");
    const currentInvoice = JSON.parse(inv);
    setInvoice(currentInvoice);

    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);
    setAuthUser(authStr);

    if (!authStr) return;

    setId(authStr.customerId);
    setName(authStr.customerName);
    setEmail(authStr.email);
    setInvoiceItems(currentInvoice.Invoice_Lines);

    const myConfig = {
      headers: {
        Authorization: `Bearer ${authStr.token}`,
      },
    };
    setConfig(myConfig);

    const myConfig1 = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStr.token}`,
      },
    };
    setConfig1(myConfig1);

    getCurrentInvoice(currentInvoice.invoice_number, authStr.token);

    if (currentInvoice.latestStatus) {
      if (
        currentInvoice.latestStatus === "notarised" ||
        currentInvoice.latestStatus === "accepted" ||
        currentInvoice.latestStatus === "tokenised" ||
        currentInvoice.latestStatus === "funded"
      ) {
        setNotarised(true);
      } else {
        setNotarised(false);
      }

      if (
        currentInvoice.latestStatus === "accepted" ||
        currentInvoice.latestStatus === "tokenised" ||
        currentInvoice.latestStatus === "funded"
      ) {
        setTokenised(true);
      } else {
        setTokenised(false);
      }
    } else {
      setNotarised(false);
      setTokenised(false);
    }
  }, []);

  useEffect(() => {
    console.log("notarisedData: ", notarisedData);
    if (Object.keys(notarisedData).length === 0) {
      return;
    } else {
      if (notarisedData.txHash !== "") {
        setNotariseAlertVisible(true);
      }
    }
  }, [notarisedData]);

  useEffect(() => {
    console.log("tokenisedData: ", tokenisedData);
    if (Object.keys(tokenisedData).length === 0) {
      return;
    } else {
      if (tokenisedData.txHashUrl !== "") {
        setTokeniseAlertVisible(true);
      }
    }
  }, [notarisedData]);

  const getCurrentInvoice = (invoiceId, token) => {
    console.log("In getCurrentInvoice - invoice_number: ", invoiceId);
    console.log("In getCurrentInvoice - token: ", token);

    const url = `https://dev.credore.xyz/invoice/invoice/${invoiceId}/${myApiKey}`;
    // Now get Invoices data
    axios
      .post(url, config)
      .then((response) => {
        setData(response.data);
        console.log("177. response: ", response);
        const result = response.data;

        console.log("Result is >>>>", result);
        if (result.length > 0) {
          localStorage.setItem("resultItem", JSON.stringify(result));
        } else {
          return;
        }
      })
      .catch((error) => {
        // alert(error.response.data.message);
        console.log("Fetch error: ", error.response.data);
      });
  };

  const notarise = (item) => {
    try {
      let url = `https://dev.credore.xyz/invoice/merkleRoot/${myApiKey}`;
      axios
        .post(url, item, config1)
        .then((response) => {
          let configData = JSON.parse(response.config.data);
          console.log("Notarise Input: ", configData);

          let this_date: Date = new Date();
          console.log("this_date: ", this_date);
          let newDate = this_date.toISOString();

          let notariseInput = {
            invoice_id: item.invoice_number,
            assetMerkleRoot: response.data.merkleRoot,
            assetType: "invoice",
            glei: "335800E6C75YGSGD5T66",
            gleiVerificationDate: newDate,
            verificationDate: newDate,
            originator: configData.supplier_contact_email,
            status: "notarised",
          };
          console.log("notariseInput: ", notariseInput);
          console.log("189-config1: ", config1);

          let url1 = `https://dev.credore.xyz/invoice/addasset/meta/${myApiKey}/${chain}`;

          axios
            .post(url1, notariseInput, config1)
            .then((response) => {
              setNotarised(true);
              setNotarisedData(response.data);
              console.log("notarise response: ", response);
              let i = invoice;
              i.latestStatus = "notarised";
              setInvoice(i);
              localStorage.setItem("currentInvoice", JSON.stringify(i));
              router.push("/view_invoice");
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
    let invoiceId = item.invoice_number;
    console.log("config1: ", config1);
    let url = `https://dev.credore.xyz/invoice/proof/verify/${invoiceId}/${chain}/${myApiKey}`;
    axios
      .get(url, config)
      .then((response) => {
        alert("Invoice Verified Successfully");
        console.log("verify response: ", response);
      })
      .catch((error) => {
        console.log("Verify error: ", error);
      });
  };

  const requestFinance = (item) => {
    localStorage.setItem("financeReqData", JSON.stringify(item));
    router.push("/request_finance");
  };

  const tokeniseInvoice = (item) => {
    let tokeniseInput = {
      id: item.invoice_number,
      chain: "polygon",
      data: "tokenization request",
      signerEmail: item.supplier_contact_email,
    };
    let url = `https://dev.credore.xyz/invoice/issueNFT/relay/${myApiKey}`;

    axios
      .post(url, tokeniseInput, config1)
      .then((response) => {
        setTokenised(true);
        setTokenisedData(response.data);
        let i = invoice;
        i.latestStatus = "tokenised";
        setInvoice(i);
        localStorage.setItem("currentInvoice", JSON.stringify(i));
        router.push("/view_invoice");

        // alert("Invoice Tokenised Successfully");
        console.log("Tokenisation response: ", response);
      })
      .catch((error) => {
        console.log("Tokenisation error: ", error);
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
                          <>
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
                          </>
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
              {!tokenised ?(
                <Button
                onClick={() => tokeniseInvoice(invoice)}
                color="white"
                className="w-60 px-10 py5 bg-[#221e1f] text-white"
              >
                Tokenise
              </Button>

              ):(null)}
            </div>
          </div>
        </div>
      </div>
      {notarisedData.txHash && (
        <>
          <Modal size="6xl" show={notariseAlertVisible} popup={true}>
            <div className="px-5 pt-8 pb-3 flex justify-between">
              <p className="text-2xl font-bold">
                Invoice Notarised Successfully
              </p>
            </div>
            <Divider className="bg-gray-300" />
            <div className="w-full bg-white"></div>
            <Modal.Body>
              <div className="my-7 mb-5 text-sm">
                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    Asset Id:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {notarisedData.asset.asset_id}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    Merkleroot:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {notarisedData.asset.assetMerkleRoot}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2">
                  <label className="text-base font-semibold text-gray-700 w-[15%]">
                    Verification Date:{" "}
                  </label>
                  <span className="text-base font-medium text-gray-500 ml-2">
                    {moment(notarisedData.asset.verificationDate).format(
                      "MMM Do YYYY"
                    )}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    txHash:{" "}
                  </label>
                  <span className="ml-2 text-blue-600">
                    <Link href={notarisedData.txHash}>
                      <a target="_blank">{notarisedData.txHash}</a>
                    </Link>
                  </span>
                </div>
              </div>

              <div className="items-center">
                <Button className="mt-10" onClick={() => {}} color="success">
                  <Link href={notarisedData.txHash}>
                    <a target="_blank">Check txHash</a>
                  </Link>
                </Button>
              </div>
              <Button
                className="mt-10"
                onClick={() => {
                  setNotariseAlertVisible(false);
                  router.push("/invoices");
                }}
                color="failure"
              >
                Close
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}

      {tokenisedData.txHashUrl && (
        <>
          <Modal size="6xl" show={tokeniseAlertVisible} popup={true}>
            <div className="px-5 pt-8 pb-3 flex justify-between">
              <p className="text-2xl font-bold">
                Invoice Tokenised Successfully
              </p>
            </div>
            <Divider className="bg-gray-300" />
            <div className="w-full bg-white"></div>
            <Modal.Body>
              <div className="my-7 mb-5 text-sm">
                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    Id:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">{tokenisedData.id}</span>
                </div>
                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    dsaAddress:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {tokenisedData.dsaAddress}
                  </span>
                </div>

                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    Merkleroot:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {tokenisedData.assetMerkleRoot}
                  </span>
                </div>

                {/* <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    sigForTransfer:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {tokenisedData.sigForTransfer}
                  </span>
                </div>

                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    methodData:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {tokenisedData.methodData}
                  </span>
                </div> */}

                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    Chain:{" "}
                  </label>
                  <span className="text-gray-500 ml-2">
                    {tokenisedData.chain}
                  </span>
                </div>

                <div className="flex flex-row items-center mb-2">
                  <label className="font-semibold text-gray-700 w-[15%]">
                    txHashUrl:{" "}
                  </label>
                  <span className="ml-2 text-blue-600">
                    <Link href={tokenisedData.txHashUrl}>
                      <a target="_blank">{tokenisedData.txHashUrl}</a>
                    </Link>
                  </span>
                </div>
              </div>

              <div className="items-center">
                <Button className="mt-10" onClick={() => {}} color="success">
                  <Link href={tokenisedData.txHashUrl}>
                    <a target="_blank">Check txHashUrl</a>
                  </Link>
                </Button>
              </div>
              <Button
                className="mt-10"
                onClick={() => {
                  setTokeniseAlertVisible(false);
                  router.push("/invoices");
                }}
                color="failure"
              >
                Close
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ViewInvoice;
