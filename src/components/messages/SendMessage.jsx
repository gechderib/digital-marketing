import React, { useState } from "react";
import { activeuser, addNewMessage, messageFromOneUser, messageStatus } from "./messageSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SendMessage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const navigate = useNavigate("")
  const dispatch = useDispatch()
  const currentUser = useSelector(activeuser)

  const messageInfo = {
    message: message,
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setRequestStatus("idle");
    console.log("pppppppppppppppppppppooooooooooooooo")
    if (user) {
      const token = user.accessToken;
      const canSave = [message, token].every(Boolean);
      if(canSave) {
        try {
          setRequestStatus("pending");
          const response = await dispatch(
            addNewMessage({ initalData: messageInfo, token,id:currentUser._id })
          ).unwrap();
          if (response == "ERR_BAD_REQUEST") {
            
            setRequestStatus("bad_err");
          }
          if (response == "ERR_NETWORK") {
            
            setRequestStatus("net_err");
          }
          if (response.message) {
            setMessage("");
            // navigate("/messages")
          }
        } catch (err) {
          console.log(err)
          setRequestStatus("failed");
        }
      }
    }
  };

  return (
    <form onSubmit={sendMessage} className="flex flex-row items-center mb-16">
      <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
        <div className="w-full">
          <input
            type="text"
            className=" w-full focus:outline-none text-sm h-10 flex items-center px-3"
            placeholder="Type your message...."
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
          ></input>
        </div>
      </div>
      <div className="ml-6">
        <button 
        style={{
          background:'#054112',
          color: "white"
       }}
        type="submit" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
