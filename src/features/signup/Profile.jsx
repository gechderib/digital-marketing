import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import UploadImage from "../../components/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { changePass, toggleChangePass } from "./signupSlice";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch()
  const changP = useSelector(changePass)

  const [firstName , setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [currentPass, setCurrentPass] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPass, setConfirmNewPass] = useState("")
  const [roles, setRoles] = useState(user.roles)
  const [profilePicture, setProfilePicture] = useState(user.profilePicture)
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-2 font-mono my-16">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Account Setting</h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="mb-6">
                <div className="w-full md:w-full px-3 mb-6 md:flex justify-center gap-5">
                  <img
                    src={profilePicture}
                    alt="profile pic"
                    className="h-40 w-40 rounded-full"
                  />
                  <UploadImage />
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    pick your role
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <select
                      value={roles[0]}
                      className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                    >
                      <option>choose ...</option>
                      <option value={"farmer"}>Farmer</option>
                      <option value={"sse"}>SSE</option>
                      <option value={"customer"}>Customer</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    language
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                      <option>choose ...</option>
                      <option>English</option>
                      <option>አማርኛ</option>
                    </select>
                  </div>
                </div>
                <div className="personal w-full border-t border-gray-400 pt-4">
                  <h2 className="text-2xl text-gray-900">Personal info:</h2>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        first name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        last name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="w-full md:w-full px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      password
                    </label>
                    <button 
                     style={{
                      background:'#054112',
                      color:'white'
                   }}
                    onClick={()=>{
                        dispatch(toggleChangePass())
                    }} type="button" className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">
                      change your password
                    </button>
                  </div>
                  {changP?<div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Current Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={currentPass}
                        onChange={(e)=>setCurrentPass(e.target.value)}
                      ></input>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        New Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Confirm New Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        value={confirmNewPass}
                        onChange={(e)=>setConfirmNewPass(e.target.value)}
                      ></input>
                    </div>
                  </div>:null}
               

                  <div className="flex justify-end">
                    <button
                    style={{
                      background:'#054112',
                      color:'white'
                   }}
                      className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                      type="submit"
                    >
                      save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
