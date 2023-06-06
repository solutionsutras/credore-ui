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

const Dashboard = () => {
  var converter = require("number-to-words");
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [pNotesCount, setPNotesCount] = useState(0);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const authStr = localStorage.getItem("user");
    console.log("In Dashboard - authStr: ", authStr);

    if (!authStr) return;
    // const auth: USER = JSON.parse(authStr).data[0];
    const auth = JSON.parse(authStr);
    setName(auth.customerName);
    const myConfig = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
    const url = `https://dev.credore.xyz/invoice/invoice/${myApiKey}`;

    axios
        .get(`https://dev.credore.xyz/invoice/invoice/${myApiKey}`, myConfig)
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
    
  }, []);

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
        <div className="p-4 flex flex-row items-center justify-start">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-[#29564b] w-[600px]">
            Welcome, {name}
          </h5>
          {/* <div className="flex flex-row items-center"> */}
          <Link href={"/invoices"}>
            <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B] mx-5">
              {invoiceCount} Invoices
            </Button>
          </Link>

          <Link href={"/pnotes"}>
            <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B] mx-5">
              {pNotesCount} Promissory Notes
            </Button>
          </Link>
          {/* </div> */}
        </div>
        <div className="px-3">
          <Card>
            {data.length === 0 ? (
              <div className="flex flex-row items-center">
                <p>No invoices found for this user, Please add a new invoice</p>
                <Link href={"/new_invoice"}>
                  <Button className="bg-[#039370] focus:bg-[#F15928]  hover:bg-[#29564B] m-5">
                    + Add Invoice
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-start w-full">
                {!data ? (
                  <div>
                    <p className="text-lg font-bold underline">
                      No invoices found for this user, Please add a new invoice
                    </p>
                    <Link href={"/new_invoice"}>
                      <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B]">
                        Add Invoice
                      </Button>
                    </Link>
                  </div>
                ) : (
                  data.map((item, index) => (
                    <>
                      {/* {item.amount} */}
                      <div className="grid grid-cols-3 gap-36 px-1 py-5">
                        <div className="ml-9 ">
                          <p className="w-full text-lg font-bold underline">
                            dlpcId
                          </p>
                          <p key={index}>{item.dlpcId}</p>
                        </div>
                        <div className="pl-10">
                          <Button onClick={() => setVisible(true)}>View</Button>
                          <Modal size="5xl" show={visible} popup={true}>
                            <div className="px-5 pt-8 pb-3 flex justify-between">
                              <p className="text-2xl font-bold">
                                Promissory Note
                              </p>
                            </div>
                            <Divider className="bg-gray-300" />
                            <div className="w-full bg-white"></div>
                            <Modal.Body>
                              <Table className="my-7">
                                <Table.Head>
                                  <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
                                    The Makers of this promissory note
                                  </Table.HeadCell>
                                  <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
                                    Makes commitment to pay the order of
                                  </Table.HeadCell>
                                  <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
                                    On Due Date
                                  </Table.HeadCell>
                                  <Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] "></Table.HeadCell>
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
                                        {moment(item.dueDate).format(
                                          "MMM Do YY"
                                        )}
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
                                  This note and any contractual obligations
                                  arising out of or in connection with it will
                                  be governed by and construed in accordance
                                  with the laws of the State of Delaware without
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
                        </div>

                        <div className="px-10">
                          <Button onClick={() => setShow(true)}>Verify</Button>
                          <Modal show={show} popup={true}>
                            <Modal.Body className="">
                              <div className="flex justify-between">
                                <h3 className="py-5 text-2xl font-semibold">
                                  Blockchain
                                </h3>
                                <div className="py-5 justify-self-end">
                                  <select
                                    value={select}
                                    onChange={(e) => setSelect(e.target.value)}
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
                                  <div className={hide ? "hidden" : "block"}>
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
                      </div>
                    </>
                  ))
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
