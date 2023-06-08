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

const BankDashboard = () => {
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

  useEffect(() => {
    let bankuser = localStorage.getItem("bankuser");
    const auth = JSON.parse(bankuser);
    console.log("auth: ", auth);

    if (!auth) return;

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

      const myConfig = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const bankerAPIKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
      console.log(
        `https://dev.credore.xyz/invoice/financeRequests/${bankerAPIKey}`
      );
      // Now get Invoices data
      axios
        .get(
          `https://dev.credore.xyz/invoice/financeRequests/${bankerAPIKey}`,
          myConfig
        )
        .then((response) => {
          setData(response.data.financeRequests);
          console.log("line -113- response: ", response);
          const result = response.data;

          console.log("Result is >>>>", result);
          if (result.length > 0) {
            localStorage.setItem("bankInvoices", JSON.stringify(result));
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

  const viewInvoice = (item) => {
    console.log("viewInvoice - item: ", item);
    localStorage.setItem("currentBankInvoice", JSON.stringify(item));
    router.push("/view_bank_invoice");
  };

  return (
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
        <nav className="p-2px">
          <ul>
            <li>
              <a className="active" href={``}>
                Pending Invoices
              </a>
            </li>
          </ul>
        </nav>
      </div>
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
                <h1 className="font-bold text-xl">Finance Requests</h1>
                {/* <div className="pb-2">
                  <Link href={"/new_invoice"}>
                    <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B]">
                      Add Invoice
                    </Button>
                  </Link>
                </div> */}
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
                          Invoice Id
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Borrower Id
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2">
                          Invoice Value
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-2"></th>
                      </tr>
                    </thead>
                    {data.map((item, index) => (
                      <>
                        <tbody>
                          <tr className="my-0 text-sm bg-white dark:border-gray-700 dark:bg-gray-800 items-center">
                            <td className="  text-gray-900 dark:text-white font-medium px-6 py-1 text-center">
                              {item.invoice_id}
                            </td>
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1 text-center">
                              {item.borrower_id}
                            </td>
                            <td className="text-gray-900 dark:text-white font-medium px-6 py-1 text-center">
                            {item.invoice_value}
                            </td>
                            <td className="dark:text-white font-medium px-6 py-1 text-center">
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

export default BankDashboard;
