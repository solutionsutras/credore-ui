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

const Invoices = () => {
  var converter = require("number-to-words");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [authUser, setAuthUser] = useState({});
  const router = useRouter();
  const myApiKey = "7cda0428-8b7a-43c2-bf57-46caacb08d6e";

  useEffect(() => {
    const newInvoice = localStorage.getItem("newInvoice");
    console.log("newInvoice: ", newInvoice);

    let authStr = localStorage.getItem("user");
    authStr = JSON.parse(authStr);
    console.log("authStr: ", authStr);

    if (!authStr) return;
    setAuthUser(authStr);
    console.log("authStr.customerName: ", authStr.customerName);
    setName(authStr.customerName);

    try {
      const myConfig = {
        headers: {
          Authorization: `Bearer ${authStr.token}`,
        },
      };

      const url = `https://dev.credore.xyz/invoice/${myApiKey}`;
      // Now get Invoices data
      axios
        .get(url, myConfig)
        .then((response) => {
          setData(response.data);
          const result = response.data;
          console.log("Result is >>>>", result);
          if (result.length > 0) {
            localStorage.setItem("resultItem", JSON.stringify(result));
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log("Fetch error: ", error.response.data);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  const viewInvoice = (item) => {
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
          <Card className="gap-2">
            <div className="pt-3">
              <div className="flex justify-between item-center">
                <h1 className="font-bold text-xl">My Invoices</h1>
                <div className="pb-2">
                  <Link href={"/new_invoice"}>
                    <Button className="bg-[#F15928] focus:bg-[#29564B]  hover:bg-[#29564B]">
                      + Add Invoice
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
                      <tbody key={item.id}>
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
                            {item.latestStatus ? item.latestStatus : "created"}
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
