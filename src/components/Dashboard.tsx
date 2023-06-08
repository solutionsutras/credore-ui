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
    console.log("55-myCofig: ", myConfig);
    const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";
    const url = `https://dev.credore.xyz/invoice/invoiceDetail/${myApiKey}`;

    axios
      .get(`https://dev.credore.xyz/invoice/invoiceDetail/${myApiKey}`, myConfig)
      .then((response) => {
        setData(response.data);
        console.log("response: ", response);
        const result = response.data;
        setInvoiceCount(response.data.length)

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
              <div className="flex justify-start w-full">
                {/* <div className="flex flex-row items-center"> */}
                <Link href={"/invoices"}>
                  <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B] m-5 w-200">
                    {invoiceCount} Invoices
                  </Button>
                </Link>

                <Link href={"/pnotes"}>
                  <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B] m-5  w-200">
                    {pNotesCount} Promissory Notes
                  </Button>
                </Link>
                {/* </div> */}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
