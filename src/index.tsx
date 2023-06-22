import ReactDOM from "react-dom/client";

import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate, } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";

import HomeTemplate from "./Templates/HomeTemplate";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import ProfileTablet from "./Pages/Profile/ProfileTablet";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Favourite from "./Pages/Favourite/Favourite";
import { store } from "./Redux/configStore";
import { Provider } from "react-redux";
import Loading from "./Components/Loading/Loading";
import ResponsiveItem from "./Templates/ResponsiveItem";
import Home from "./Pages/Home/Home";
import HomeMobile from "./Pages/Home/HomeMobile";
import Detail from "./Pages/Detail/Detail";
import Category from "./Pages/Category/Category";
import DetailMobile from "./Pages/Detail/DetailMobile";
import Search from "./Pages/Search/Search";
import CartMobile from "./Pages/Cart/CartMobile";

export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <Loading></Loading>
    {/* <LoadingCustom></LoadingCustom> */}
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<ResponsiveItem component={Home} tabletComponent={HomeMobile} />}></Route>
          <Route path="category" element={<Category />}></Route>
          <Route path="detail">
            <Route path=':id' element={<ResponsiveItem component={Detail} largeTableComponent={DetailMobile} />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="profile" element={<ResponsiveItem component={Profile} largeTableComponent={ProfileTablet}/>}></Route>
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<ResponsiveItem component={Cart} tabletComponent={CartMobile} />}></Route>
          <Route path="favourite" element={<Favourite />} />

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>

      </Routes>
    </HistoryRouter>
  </Provider>
);

/*
  type React
  <div></div>: JSX.element
  function (props) => jsx : React.FC

*/
