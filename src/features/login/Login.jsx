import { useState } from "react";
import AuthRight from "../../components/AuthRight.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./loginSlice.jsx";
import logoimg from "../../assets/images/flogo22.png";
import { setupRecaptcha } from "../../thirdparty/firebase.js";
import { set } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // login info
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [conformObj, setConformObj] = useState("");
  const [error, setError] = useState();

  const logo = logoimg;

  const loginInfo = {
    phoneNumber,
    password,
  };
  const getPhoneNumber = (e) => setPhoneNumber(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);
  //idle | loading | net | failed
  // request status
  const [loginStatus, setLoginStatus] = useState("idle");
  // can save
  const canSave = [phoneNumber, password].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus("idle");

    if (canSave) {
      try {
        setLoginStatus("pending");
        const response = await dispatch(loginUser(loginInfo)).unwrap();
        console.log(response);
        if (response == "ERR_BAD_REQUEST") {
          setLoginStatus("bad_err");
        }
        if (response == "ERR_NETWORK") {
          setLoginStatus("net_err");
        }
        if (response.accessToken) {
          setPassword("");
          setPhoneNumber("");
          setLoginStatus("idle");
          localStorage.setItem("user", JSON.stringify(response));
          const user = JSON.parse(localStorage.getItem("user"));
          if (user && (user.roles[0] == "admin" || user.roles[0] == "agent")) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        setLoginStatus("failed");
      }
    }
  };
  const onSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoginStatus("pending")
    try {
      // +251953890542
      const response = await setupRecaptcha("+251941406578");
      setConformObj(response);
      setFlag(true);
      setLoginStatus("idle")
    } catch (error) {
      setError(error);
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    setLoginStatus("pending")
    if (otp === "" || otp === undefined)
      return setError("Wrong atp confirmation is added ");
    try {
      await conformObj.confirm(otp);
      handleSubmit(e);
      // navigate("/")
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section className="bg-neutral-200 h-screen flex justify-center">
      <div className="container h-full p-2">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div
              style={{ height: "610px" }}
              className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800"
            >
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div
                  style={{ height: "610px" }}
                  className="px-4 md:px-0 lg:w-6/12"
                >
                  <div className="md:mx-6 md:p-5">
                    {/* Logo */}
                    <div className="text-center">
                      <img className="mx-auto w-58" src={logo} alt="logo" />
                    </div>
                    {/* handleSubmit */}

                    <form
                      onSubmit={handleSubmit}
                      className={`${flag ? "hidden" : null}`}
                    >
                      {loginStatus == "net_err" ? (
                        <p className="text-red-600 mb-4 italic animate-bounce">
                          Pleace check your connection
                        </p>
                      ) : loginStatus == "bad_err" ? (
                        <p className="text-red-600 mb-4 italic animate-bounce">
                          wrong phone number / password
                        </p>
                      ) : loginStatus == "faild" ? (
                        <p className="mb-4 animate-bounce">
                          error happen please try again
                        </p>
                      ) : (
                        <p className="mb-4	animate-bounce animate-pulse">
                          Please login to your account
                        </p>
                      )}

                      {/* Phone number input */}
                      <div className="relative h-10 w-full min-w-[200px] mb-4">
                        <input
                          type="text"
                          id="phoneNumber"
                          onChange={getPhoneNumber}
                          value={phoneNumber}
                          className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          required={true}
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Phone Number
                        </label>
                      </div>

                      {/* Password input */}
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          type="password"
                          id="password"
                          onChange={getPassword}
                          value={password}
                          className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          required={true}
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Password
                        </label>
                      </div>
                      {/* Submit button */}
                      <button
                        style={{
                          background: "#054112",
                        }}
                        className="mb-6 mt-5 py-2 flex justify-center hover:bg-gray-950 rounded-lg text-center w-full"
                      >
                        {loginStatus == "pending" ? (
                          <div>
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                        <p className="font-bold uppercase  text-white">
                          Log in
                        </p>

                        {/* Forgot password link */}
                      </button>
                      <div className="flex justify-center mb-2">
                        <a className="text-center" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-4">
                        <div>
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button
                            style={{
                              color: "white",
                              background: "#13591C",
                              hover: "#3DA12E",
                            }}
                            onClick={() => {
                              navigate("/signup");
                            }}
                            type="button"
                            className="inline-block rounded-lg border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </div>
                        <div
                          onClick={() => {
                            navigate("/");
                          }}
                          className="underline cursor-pointer text-green-950"
                        >
                          Home
                        </div>
                      </div>
                    </form>

                    <form
                      // style={{ display: flag ? "block" : "none" }}
                      className={`${flag ? "" : "hidden"}`}
                    >
                      <input
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        placeholder="OTP"
                        className="border border-green-500 focus:border-green-950 px-2 py-1 mb-3 block rounded-lg w-full h-11"
                      />
                      <div id="recaptcha-container"></div>
                      <div
                        onClick={onVerifyOtp}
                        type="submit"
                        className="bg-green-900 flex justify-center rounded-lg mt-3 text-center text-white p-2 mb-3  cursor-pointer"
                      >
                        {loginStatus == "pending" ? (
                          <div>
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                        <span>Verify OTP</span>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <AuthRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
