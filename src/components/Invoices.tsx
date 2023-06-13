import { Divider } from "@mui/material";
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiTwotoneMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useRouter } from "next/router";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";
import Sidebar from "./Sidebar";
import axios from "axios";
import { withRouter } from "next/router";

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
  const router = useRouter();
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
      console.log("Line 218 - myConfig: ", myConfig);
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
            invoice_id: item.invoice_number,
            assetMerkleRoot: response.data.merkleRoot,
            assetType: "invoice",
            glei: auth.organisationLei,
            gleiVerificationDate: newDate,
            verificationDate: newDate,
            originator: configData.supplier_contact_email,
            status: "notarised",
          };
          console.log("nData: ", nData);
          let chain = "polygon";
          console.log("Line 249 - myConfig: ", myConfig);

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

  const viewInvoice = (item) => {
    console.log("viewInvoice - item: ", item);
    localStorage.setItem("currentInvoice", JSON.stringify(item));
    router.push("/view_invoice");
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
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Status
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
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1">
                              {item.currency} {item.amount}
                            </td>
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1">
                              {moment(item.invoice_date).format("Do MMM YYYY")}
                            </td>
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1">
                              {moment(item.due_date).format("Do MMM YYYY")}
                            </td>
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1">
                              {item.latestStatus ? item.latestStatus : 'created'}
                            </td>
                            <td className="dark:text-white font-medium px-6 py-1">
                              <div className="flex">
                              
                                <Button
                                  onClick={() => {
                                    viewInvoice(item);
                                  }}
                                  className="px-0 py-0 bg-transparent hover:bg-transparent text-[#0786c3] font-[600] hover:border-[#238f74] text-sm"
                                >
                                  <AiFillEye className="w-5" />
                                  View Invoice
                                </Button>
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
