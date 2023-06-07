import { Divider } from "@mui/material";
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";
import Sidebar from "./Sidebar";
import axios from "axios";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

type Product = {
  dlpcId: string;
  obligorOrgName: string;
  beneficiaryOrgName: string;
  signedByCommitter: boolean;
  signedByCommittee: boolean;
  amount: string;
  currency: string;
  applicableRules: string;
  dueDate: string;
  signedDateByCommitter: string;
};

type VERIFY = {
  chain: string;
  verified: boolean;
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

// type MYNAME = {
// 	MyName: string;
// };

const Invoices = () => {
  var converter = require("number-to-words");
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [notarised, setNotarised] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
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

  console.log("verify: ", verify);
  const testInvoiceData = [
    {
      id: "ac2605da-8bb2-407c-b3c0-da361bd8583c",
      invoice_number: "INV000994",
      invoice_date: "2023-05-30T04:59:19.539Z",
      due_date: "2023-06-30T04:59:19.539Z",
      amount: "10000",
      currency: "EU",
      supplier_name: "Textile",
      supplier_address: "BBSR",
      supplier_vat_number: "IN1234567890123Z1",
      supplier_contact_email: "swaroopsahoo@rediffmail.com",
      supplier_contact_name: "Jay",
      supplier_contact_phone: "88888888888",
      customer_name: "Puma",
      customer_address: "London, UK",
      customer_vat_number: "GB123456789",
      customer_contact_name: "Kevin",
      customer_contact_email: "kevin@gmail.com",
      Invoice_Lines: [
        {
          id: "2a0d321e-b353-4c82-b20a-c4209f2a4bfc",
          invoice_id: "ac2605da-8bb2-407c-b3c0-da361bd8583c",
          description: "best for sneakers",
          quantity: "2",
          unit_price: "5000",
          line_total: "10",
        },
      ],
    },
    {
      id: "ac2605da-8bb2-407c-b3c0-da361bd8583d",
      invoice_number: "INV0009995",
      invoice_date: "2023-03-30T04:59:19.539Z",
      due_date: "2023-09-30T04:59:19.539Z",
      amount: "20000",
      currency: "USD",
      supplier_name: "Textile",
      supplier_address: "BBSR",
      supplier_vat_number: "IN1234567890123Z1",
      supplier_contact_email: "swaroopsahoo@rediffmail.com",
      supplier_contact_name: "Jay",
      supplier_contact_phone: "7777777777",
      customer_name: "Nike",
      customer_address: "New York, USA",
      customer_vat_number: "GB123456999",
      customer_contact_name: "James",
      customer_contact_email: "james234@gmail.com",
      Invoice_Lines: [
        {
          id: "2a0d321e-b353-4c82-b20a-c4209f2a4bfc",
          invoice_id: "ac2605da-8bb2-407c-b3c0-da361bd8583d",
          description: "best for sneakers",
          quantity: "2",
          unit_price: "10000",
          line_total: "10",
        },
      ],
    },
  ];

  useEffect(() => {
    const newInvoice = localStorage.getItem("newInvoice");
    console.log("newInvoice: ", newInvoice);

    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);
    console.log("authStr: ", authStr);

    if (!authStr) return;
    // const auth: USER = authStr.data[0];
    const auth = authStr;
    // const auth:USER = authStr;
    console.log("auth.customerName: ", auth.customerName);

    // setId(auth.id);
    setId(auth.customerId);
    setName(auth.customerName);
    setEmail(auth.email);

    try {
      let userData = {
        name: auth.customerName,
        email: auth.email,
        registration_id: auth.customerId,
      };
      console.log("userData: ", userData);
      console.log("myConfig: ", myConfig);

      setData(testInvoiceData);
      const myConfig = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
      const url = `https://dev.credore.xyz/invoice/invoice/7cda0428-8b7a-43c2-bf57-46caacb08d6e`;
      // Now get Invoices data
      axios
        .get(`https://dev.credore.xyz/invoice/${myApiKey}`, myConfig)
        .then((response) => {
          setData(response.data);
          console.log("response: ", response);
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
    } catch (error) {
      console.log("error: ", error);
    }
  }, [email]);

  //   useEffect(() => {
  //     console.log("email: ", email);
  //   }, [email]);

  const handleShow = () => {
    setHide(!hide);
  };

  const notarise = (item) => {
    console.log("notarise - item: ", item);
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
          // alert("Merkle Root Created Successfully");

          console.log("response: ", response);
          let configData = JSON.parse(response.config.data);
          console.log("configData: ", configData);

          let this_date: Date = new Date();
          console.log("this_date: ", this_date);
          let newDate = this_date.toISOString();

          let nData = {
            invoice_id: item.id,
            assetMerkleRoot: response.data.merkleRoot,
            assetType: "invoice",
            glei: auth.organisationLei,
            gleiVerificationDate: newDate,
            verificationDate: newDate,
            originator: configData.supplier_contact_email,
            status: "notarised",
          };
          console.log("nData: ", nData);
          let chain = "xinfin";
          console.log("111 myConfig: ", myConfig);

          axios
            .post(
              `https://dev.credore.xyz/invoice/addasset/meta/${myApiKey}/${chain}`,
              myConfig
            )
            .then((response) => {
              alert("Invoice Notarised Successfully");
              console.log("notarise response: ", response);

              setNotarised(true);
            })
            .catch((error) => {
              console.log("Notarising error: ", error);
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
    let thisInvoiceId = item.id;
    let chain = "xinfin";
    try {
      axios
        .post(
          `https://dev.credore.xyz/invoice/proof/verify/${thisInvoiceId}/${chain}`,
          myConfig
        )
        .then((response) => {
          alert("Invoice Verified Successfully");
          console.log("verify response: ", response);

          setVerified(true);
        })
        .catch((error) => {
          console.log("Verify error: ", error);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex justify-between">
      {/* Sidebar Start*/}
      <Sidebar />
      {/* Sidebar End*/}

      <div id="detail">
        <div className="p-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-[#29564b]">
            Hello!, {name}
          </h5>
        </div>
        <div className="px-3">
          <Card>
            <div className="pt-3">
              <div className="flex justify-between item-center">
                <h1 className="font-bold text-xl">My Invoices</h1>
                <div className="pb-2">
                  <Link href={"/new_invoice"}>
                    <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B]">
                      Add Invoice
                    </Button>
                  </Link>
                </div>
              </div>
              <Divider />
            </div>
            {data.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className="flex flex-col justify-start w-full">
                {!data ? (
                  <p className="text-lg font-bold underline">
                    No invoices found for this user, Please add a new invoice
                  </p>
                ) : (
                  <table>
                    <thead>
                      <tr className="bg-[#238f74]">
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Invoice Number
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Amount
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Issue Date
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Due date
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2"></th>
                      </tr>
                    </thead>
                    {data.map((item, index) => (
                      <>
                        <tbody>
                          <tr className="my-0 text-sm bg-white dark:border-gray-700 dark:bg-gray-800 items-center">
                            <td className="  text-gray-900 dark:text-white font-medium px-6 py-1">
                              {item.invoice_number}
                            </td>
                            <td className="  text-gray-900 dark:text-white font-medium px-6 py-1">
                              {item.currency} {item.amount}
                            </td>
                            <td className="  text-gray-900 dark:text-white font-medium px-6 py-1">
                              {moment(item.invoice_date).format("Do MMM YYYY")}
                            </td>
                            <td className="  text-gray-900 dark:text-white font-medium px-6 py-1">
                              {moment(item.due_date).format("Do MMM YYYY")}
                            </td>
                            <td className="underline dark:text-white font-medium px-6 py-1">
                              <div className="flex">
                                <Button
                                  onClick={() => setVisible(true)}
                                  className="px-0 py-0 bg-transparent text-[#0786c3] font-[600] hover:bg-transparent border-0"
                                >
                                  View
                                </Button>
                                <Modal size="5xl" show={visible} popup={true}>
                                  <div className="px-5 pt-8 pb-3 flex justify-between">
                                    <p className="text-2xl font-bold">
                                      View Invoice Details
                                    </p>
                                  </div>
                                  <Divider className="bg-gray-300" />
                                  <div className="w-full bg-white"></div>
                                  <Modal.Body>
                                    <Card>
                                      <div className="items-center col-md-12 mt-3">
                                        <div className="col-md-12 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Invoice No
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.invoice_number}
                                          </span>
                                        </div>
                                        <div className="col-md-12 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Invoice Date
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.invoice_date}
                                          </span>
                                        </div>
                                        <div className="col-md-12 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Due Date
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.due_date}
                                          </span>
                                        </div>
                                        <div className="col-md-12 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Amount
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.currency} {item.amount}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_name}
                                          </span>
                                        </div>
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Address
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_address}
                                          </span>
                                        </div>
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Tax Id
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_vat_number}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Person
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_name}
                                          </span>
                                        </div>
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Email
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_email}
                                          </span>
                                        </div>

                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Phone
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_phone}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-start gap-4 col-md-12 mt-3">
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Person
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_name}
                                          </span>
                                        </div>
                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Email
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_email}
                                          </span>
                                        </div>

                                        <div className="col-md-4 flex">
                                          <label className="mb-1 block text-sm font-semibold text-gray-700 ">
                                            Supplier Contact Phone
                                          </label>
                                          <span className="mb-1 block text-sm font-medium text-gray-500 ml-5">
                                            {item.supplier_contact_phone}
                                          </span>
                                        </div>
                                      </div>
                                    </Card>
                                    <div>
                                      {notarised ? (
                                        <div className="mt-5">
                                          <Button
                                            onClick={() => verifyInvoice(item)}
                                            color="white"
                                            className="w-20 px-10 py5 bg-[#238f74] texy-white"
                                          >
                                            Verify
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="mt-5">
                                          <Button
                                            onClick={() => notarise(item)}
                                            color="white"
                                            className="w-20 px-10 py5 bg-[#238f74] texy-white"
                                          >
                                            Notarise
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                    <div className="pt-3">
                                      <p className="text-xl font-bold text-[#f36e28]">
                                        The sum of
                                      </p>

                                      <p className="text-3xl font-medium">
                                        ${item.amount}
                                      </p>

                                      <p className="w-1/2 font-medium">
                                        {item.currency.toUpperCase()}{" "}
                                        {converter
                                          .toWords(item.amount)
                                          .replace(/^(.)|\s+(.)/g, (c: any) =>
                                            c.toUpperCase()
                                          )}{" "}
                                      </p>

                                      <p className="text-xs text-gray-700 py-3">
                                        This note and any contractual
                                        obligations arising out of or in
                                        connection with it will be governed by
                                        and construed in accordance with the
                                        laws of the State of Delaware without
                                        regard to conflict of laws principles .
                                      </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <div className="mt-8 flex justify-start gap-10">
                                        <div className="flex flex-col justify-center items-center">
                                          <p className="text-md text-center font-bold text-[#f36e28]">
                                            Digitally Signed by beneficiary
                                          </p>
                                          <p className="text-md font-normal">
                                            <p>{item.beneficiaryOrgName}</p>
                                          </p>
                                        </div>

                                        <div className="flex flex-col justify-center items-center">
                                          <p className="text-md text-center font-bold text-[#f36e28]">
                                            Date of signature
                                          </p>
                                          <p className="text-sm font-bold text-gray-500">
                                            <p>
                                              {item.signedByCommitter === true
                                                ? moment(
                                                    item.signedDateByCommitter
                                                  ).format("MMM Do YY")
                                                : ""}
                                            </p>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-10 w-0.5 h-10 bg-slate-700"></div>

                                      <div className="mt-8 flex justify-start gap-10">
                                        <div className="flex flex-col justify-center items-center">
                                          <p className="text-md text-center font-bold text-[#f36e28]">
                                            Digitally Signed by obligor
                                          </p>
                                          <p className="text-md font-normal">
                                            <p>{item.obligorOrgName}</p>
                                          </p>
                                        </div>

                                        <div className="flex flex-col justify-center items-center">
                                          <p className="text-md text-center font-bold text-[#f36e28]">
                                            Date of signature
                                          </p>

                                          <p className="text-sm font-bold text-gray-500">
                                            {item.signedByCommittee === true
                                              ? moment(
                                                  item.signedDateByCommitter
                                                ).format("MMM Do YY")
                                              : ""}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <Button
                                      className="mt-10"
                                      onClick={() => setVisible(false)}
                                      color="failure"
                                    >
                                      Close
                                    </Button>
                                  </Modal.Body>
                                </Modal>
                                <Button
                                  onClick={() => setShow(true)}
                                  className="px-0  py-0 bg-transparent text-[#238f74] font-[600] hover:bg-transparent border-0"
                                >
                                  Verify
                                </Button>
                                <Modal show={show} popup={true}>
                                  <Modal.Body className="">
                                    <div className="flex justify-between">
                                      <h3 className="py-5 text-2xl font-semibold">
                                        Verify Invoice
                                      </h3>
                                      <div className="py-5 justify-self-end">
                                        <select
                                          value={select}
                                          onChange={(e) =>
                                            setSelect(e.target.value)
                                          }
                                        >
                                          <option>ethereum</option>
                                          <option>xinfin</option>
                                          <option>polygon</option>
                                        </select>

                                        {/* <DropdownBtn /> */}
                                      </div>
                                    </div>
                                    <Divider className="mb-5" />
                                    <Card className="my-10">
                                      <div className="flex gap-16">
                                        <Button
                                          className="w-20"
                                          onClick={handleShow}
                                          color="success"
                                        >
                                          Verify
                                        </Button>
                                        <div className="font-bold">
                                          <div>
                                            <p>Initiated</p>
                                          </div>
                                          <p>Effective</p>

                                          <p>Discharged</p>
                                        </div>
                                        <div
                                          className={hide ? "hidden" : "block"}
                                        >
                                          {verify?.map(
                                            (item, index) =>
                                              item.verified && (
                                                <p className="font-medium">{`Verified`}</p>
                                              )
                                          )}
                                          <p>Yet to Verify</p>
                                        </div>
                                      </div>
                                    </Card>

                                    <Button
                                      onClick={() => setShow(false)}
                                      color="failure"
                                    >
                                      Close
                                    </Button>
                                  </Modal.Body>
                                </Modal>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </table>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
