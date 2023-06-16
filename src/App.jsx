import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./features/signup/Signup.jsx";
import Login from "./features/login/Login";
import Home from "./features/home/Home";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import NotFound from "./components/error page/NotFound";
import Inbox from "./features/dashboard/Inbox";
import ProductPage from "./features/home/ProductPage";
import UserTraining from "./features/training/UserTraining";
import TrainingDetailPage from "./features/training/TrainingDetailPage";
import Profile from "./features/signup/Profile";
import MyProducts from "./features/product/MyProducts";
import EditProductPage from "./features/home/EditProductPage";
import SellProduct from "./features/home/SellProduct";
import MyOrders from "./features/orders/MyOrders";
import MyOffers from "./features/orders/MyOffers";
import PaymentSuccess from "./components/PaymentSuccess";
import UserEarning from "./features/signup/UserEarning";
import OrderDetail from "./features/orders/OrderDetail";
// import Signup from './features/signup/Signup.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/product/:id" element={<ProductPage/> }/>
      <Route path="/messages" element={<Layout><Inbox/></Layout>}/>
      <Route path="/trainings" element={<UserTraining/>} />
      <Route path="/training/:id"  element={<TrainingDetailPage/>}/>
      <Route path="/profile/:id" element = {<Profile/>} />
      <Route path="/myproducts" element= {<MyProducts/>} />
      <Route path="/editproduct/:id" element={<EditProductPage/>} />
      <Route path="/sellproduct" element={<SellProduct/>} />
      <Route path="/myorders" element = {<MyOrders/>} />
      <Route path="/myoffers" element = {<MyOffers/>} />
      <Route path="/payment_succeessful" element = {<PaymentSuccess/>} />
      <Route path="/user_earning" element ={<UserEarning/>} />
      <Route path="/order/:id" element={<OrderDetail/>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
