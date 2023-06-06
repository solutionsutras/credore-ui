import React, { useEffect, useState } from "react";
import axios from "axios";

const GetApiKey = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");

  var localUser, authStr, auth;

  useEffect(() => {
    localUser = localStorage.getItem("user");
    authStr = JSON.parse(localUser);
    console.log("authStr: ", authStr);

    if (!authStr) return;
    auth = authStr.data[0];
    console.log("auth: ", auth);

    setEmail(auth.email);
    setName(auth.name);
    setId(auth.id);
    setCustomerId(auth.customerId);
  }, []);

  let userData = {
    name: name,
    email: email,
    registration_id: customerId,
  };
  console.log("userData: ", userData);

  try {
    // First Get ApiKey
    axios
      .post("https://dev.credore.xyz/users/client", userData)
      .then((response) => {
        console.log("1. response: ", response);
        localStorage.setItem(
          "myApiKey",
          response.data.apiKeys[0].key
        );
        const myApiKey = response.data.apiKeys[0].key;
        return myApiKey;
      })
      .catch((error) => {
        console.log("API error: ", error.response.data.message);
        return "error";
      });
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export default GetApiKey;
