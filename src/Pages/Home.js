import React, { useEffect, useState } from "react";
// import Card from "../Components/Card";
import SessionCheck from "../Components/SessionCheck";
import CardHeader from "../Components/CardHeader";

export default function User() {
  const [currentUser, setcurrentUser] = useState(null);
  const [dataCards, setdataCards] = useState([]);
  return (
    <div>
      <SessionCheck userData={(value) => setcurrentUser(value)} />
      <div className="container">
        <CardHeader />
      </div>
    </div>
  );
}
