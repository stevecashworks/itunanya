import { BiKey } from "react-icons/bi";
import {  CgCalendar, CgNametag } from "react-icons/cg";
import { FcContacts } from "react-icons/fc";

 


const inputs = [
  [
    {
      field: "firstName",
      text: "Your first name",
      Icon:CgNametag,
      type:"text"
    },
    {
      field: "lastName",
      text: "Your last name",
      Icon:CgNametag,
      type:"text"
    },
  ],

  [
    {
      field: "DOB",
      text: "Date Of Birth",
      type:"date",
      Icon : CgCalendar
    },
    {
      field: "phone",
      text: "Email or phone",
      Icon:FcContacts
    },
  ],
  [
    {
        field:"password",
        text:"type a strong password",
        Icon:BiKey,
        type:"password"
    }
  ]
];

export default inputs