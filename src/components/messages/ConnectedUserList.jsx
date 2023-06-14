import React, { useEffect } from "react";
import ConnectedUser from "./ConnectedUser";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  activeChat,
  connectedUser,
  connectedUserStatus,
  getConnectedUser,
  getSavedMessage,
  getYourMessage,
} from "./messageSlice";
import UserLoading from "../loading/UserLoading";

const ConnectedUserList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const connectedUsers = useSelector(connectedUser);
  const connetuserStatus = useSelector(connectedUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnectedUser({ token }));
  }, [dispatch]);

  const viewMessage = (id, token) => {
    try {
      if(id == user.id){
        dispatch(getSavedMessage({id, token}))
      }else{
        dispatch(getYourMessage({id, token}));

      }
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-row  md:w-96 flex-shrink-0 bg-gray-100 p-4 mb-16">
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        {/* <Header/> */}
        <div className="h-full overflow-hidden relative pt-2">
          <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
            {connetuserStatus == "loading" ? (
              <UserLoading/>
            ) : connetuserStatus == "succeeded" ? (
              connectedUsers.map((user) => {
                return (
                  <ConnectedUser
                  key={user._id}
                    onViewMessage={() => {
                      viewMessage(user._id,token);
                      dispatch(activeChat(user))
                    }}
                    hoursAgo={"1:30"}
                    lastMessage={`${user._id} Good after noon! how can i help you?`}
                    userName={`${user.firstName} ${user.lastName}`}
                  />
                );
              })
            ) : (
              <p>please try again</p>
            )}
          </div>
          <div className="absolute bottom-0 right-0">
            <button 
            style={{
              background:'#054112',
           }}
            className="flex items-center justify-center shadow-sm h-10 w-10 text-white rounded-full">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUserList;
