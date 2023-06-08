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
const Modal1 = () => {
  return (
    <Modal size="5xl" show={visible} popup={true}>
      <div className="px-5 pt-8 pb-3 flex justify-between">
        <p className="text-2xl font-bold">Promissory Note</p>
      </div>
      <Divider className="bg-gray-300" />
      <div className="w-full bg-white"></div>
      <Modal.Body>
        <Table className="mb-7">
          <Table.Head className="bg-[#238f74]">
            <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-white ">
              The Makers of this promissory note
            </Table.HeadCell>
            <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-white ">
              Makes commitment to pay the order of
            </Table.HeadCell>
            <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-white ">
              On Due Date
            </Table.HeadCell>
            <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-white "></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <>
                <Table.Cell className="  text-gray-900 dark:text-white font-medium ">
                  {item.beneficiaryOrgName}
                </Table.Cell>
                <Table.Cell className="  text-gray-900 dark:text-white font-medium ">
                  {item.obligorOrgName}
                </Table.Cell>
                <Table.Cell className="  text-gray-900 dark:text-white font-medium ">
                  {moment(item.dueDate).format("MMM Do YY")}
                </Table.Cell>
                <Table.Cell className="  text-gray-900 dark:text-white font-medium ">
                  <p className="font-semibold text-blue-600 underline cursor-pointer">
                    Download PDF
                  </p>
                </Table.Cell>
              </>
            </Table.Row>
          </Table.Body>
        </Table>
        <div className="pt-3">
          <p className="text-xl font-bold text-[#f36e28]">The sum of</p>

          <p className="text-3xl font-medium">${item.amount}</p>

          <p className="w-1/2 font-medium">
            {item.currency.toUpperCase()}{" "}
            {converter
              .toWords(item.amount)
              .replace(/^(.)|\s+(.)/g, (c: any) => c.toUpperCase())}{" "}
          </p>

          <p className="text-xs text-gray-700 py-3">
            This note and any contractual obligations arising out of or in
            connection with it will be governed by and construed in accordance
            with the laws of the State of Delaware without regard to conflict of
            laws principles .
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
                    ? moment(item.signedDateByCommitter).format("MMM Do YY")
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
                  ? moment(item.signedDateByCommitter).format("MMM Do YY")
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
  );
};

const Invoices = () => {
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

  console.log("verify: ", verify);
  const testInvoiceData = [
    {
      id: "ac2605da-8bb2-407c-b3c0-da361bd8583c",
      invoice_number: "INV000235",
      invoice_date: "2023-05-30T04:59:19.539Z",
      due_date: "2023-06-30T04:59:19.539Z",
      amount: "10000",
      currency: "EU",
      supplier_name: "Textile",
      supplier_address: "BBSR",
      supplier_vat_number: "IN1234567890123Z1",
      supplier_contact_email: "aditimishra537@gmail.com",
      supplier_contact_name: "Jay",
      supplier_contact_phone: "88888888888",
      customer_name: "Puma",
      customer_address: "UK",
      customer_vat_number: "GB123456789",
      customer_contact_name: "Kevin",
      customer_contact_email: "test234@gmail.com",
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
      invoice_number: "INV000235",
      invoice_date: "2023-05-30T04:59:19.539Z",
      due_date: "2023-06-30T04:59:19.539Z",
      amount: "10000",
      currency: "EU",
      supplier_name: "Textile",
      supplier_address: "BBSR",
      supplier_vat_number: "IN1234567890123Z1",
      supplier_contact_email: "aditimishra537@gmail.com",
      supplier_contact_name: "Jay",
      supplier_contact_phone: "88888888888",
      customer_name: "Puma",
      customer_address: "UK",
      customer_vat_number: "GB123456789",
      customer_contact_name: "Kevin",
      customer_contact_email: "test234@gmail.com",
      Invoice_Lines: [
        {
          id: "2a0d321e-b353-4c82-b20a-c4209f2a4bfc",
          invoice_id: "ac2605da-8bb2-407c-b3c0-da361bd8583d",
          description: "best for sneakers",
          quantity: "2",
          unit_price: "5000",
          line_total: "10",
        },
      ],
    },
  ];

  useEffect(() => {
    const newInvoice = localStorage.getItem("newInvoice");
    console.log("newInvoice: ", newInvoice);

    const authStr = localStorage.getItem("user");
    console.log("authStr: ", authStr);

    if (!authStr) return;
    const auth: USER = JSON.parse(authStr);
    // const auth:USER = authStr;
    console.log("auth.customerName: ", auth.customerName);

    setId(auth.customerId);
    setName(auth.customerName);
    setEmail(auth.email);
    setToken(auth.token);

    const myConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    setConfig(myConfig);

    const myEmail = auth.email;
    try {
      let userData = {
        name: name,
        email: email,
        registration_id: id,
      };
      console.log("userData: ", userData);

      console.log("myConfig: ", myConfig);

      setData(testInvoiceData);
      // axios
      //   .post("https://dev.credore.xyz/users/client", userData)
      //   .then((response) => {
      //     console.log("1. response: ", response);
      //     localStorage.setItem("apiKey", response.data.apiKeys.key);
      //     const myApiKey = response.data.apiKeys[0].key;

      //     // Now get Invoices data
      //     axios
      //       .get(`https://dev.credore.xyz/invoice/invoice/${myApiKey}`, myConfig)
      //       .then((response) => {
      //         setData(response.data);
      //         console.log("response: ", response);
      //         const result = response.data;

      //         console.log("Result is >>>>", result);
      //         if (result.length > 0) {
      //           setData(result);
      //           localStorage.setItem("resultItem", JSON.stringify(result));
      //         } else {
      //           return;
      //         }
      //         // alert("response.data: " + response.data);
      //         // localStorage.setItem("user", JSON.stringify(response));
      //         // location.href = "/dashboard";
      //       })
      //       .catch((error) => {
      //         // alert(error.response.data.message);
      //         console.log("Fetch error: ", error.response.data);
      //       });
      //   })
      //   .catch((error) => {
      //     console.log("API error: ", error.response);
      //   });
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
                  <>
                    <Table className="text-sm">
                      <Table.Head className="bg-[#238f74]">
                        <Table.HeadCell className="border-gray-400 text-sm text-white ">
                          Invoice Number
                        </Table.HeadCell>
                        <Table.HeadCell className="border-gray-400 text-sm text-white ">
                          Amount
                        </Table.HeadCell>
                        <Table.HeadCell className="border-gray-400 text-sm text-white ">
                          Issue Date
                        </Table.HeadCell>
                        <Table.HeadCell className="border-gray-400 text-sm text-white ">
                          Due date
                        </Table.HeadCell>
                        <Table.HeadCell className="border-gray-400 text-sm text-white "></Table.HeadCell>
                        <Table.HeadCell className="border-gray-400 text-sm text-white "></Table.HeadCell>
                      </Table.Head>
                    </Table>
                    {data.map((item, index) => (
                      <>
                        {/* {item.amount} */}
                        <Table className="my-0 text-sm">
                          
                          <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <>
                                <Table.Cell className="  text-gray-900 dark:text-white font-medium px-3 py-1">
                                  {item.invoice_number}
                                </Table.Cell>
                                <Table.Cell className="  text-gray-900 dark:text-white font-medium px-3 py-1">
                                  {item.amount}
                                </Table.Cell>
                                <Table.Cell className="  text-gray-900 dark:text-white font-medium px-3 py-1">
                                  {moment(item.invoice_date).format(
                                    "Do MMM YYYY"
                                  )}
                                </Table.Cell>
                                <Table.Cell className="  text-gray-900 dark:text-white font-medium px-3 py-1">
                                  {moment(item.dueDate).format("Do MMM YYYY")}
                                </Table.Cell>
                                <Table.Cell className="underline dark:text-white font-medium px-3 py-1">
                                  <Button
                                    onClick={() => setVisible(true)}
                                    className="px-10 bg-transparent text-blue-900 hover:bg-transparent"
                                  >
                                    View
                                  </Button>
                                </Table.Cell>
                                <Table.Cell className="underline dark:text-white font-medium px-3 py-1">
                                  <Button
                                    onClick={() => setShow(true)}
                                    className="px-10 bg-transparent text-blue-900 hover:bg-transparent"
                                  >
                                    Verify
                                  </Button>
                                </Table.Cell>
                              </>
                            </Table.Row>
                          </Table.Body>
                        </Table>

                        <div className="flex flex-row mt-5">
                          <div className="pl-2"></div>
                          {/* Modal 1 */}

                          <div className="px-10">{/* Modal 2 */}</div>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            )}

            <div className="mt-10">
              <Divider />
            </div>
            <div className="py-2">
              <h1 className="font-bold text-xl pb-2">As a drawee</h1>
              <Divider />
            </div>

            {/* <Drawee /> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
