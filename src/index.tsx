import ReactDOM from "react-dom/client";

import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate, } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";

import HomeTemplate from "./Templates/HomeTemplate";
import Profile from "./Pages/Profile/Profile";
import Favourite from "./Pages/Favourite/Favourite";

// Setup redux
import { store } from "./Redux/configStore";
import { Provider } from "react-redux";

import Loading from "./Components/Loading/Loading";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import Search from "./Pages/Search/Search";
import TripHistory from "./Pages/TripHistory/TripHistory";
import Book from "./Pages/Book/Book";

export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <Loading></Loading>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home/>}></Route>
          <Route path="detail">
            <Route path=':id' element={<Detail/>}></Route>
          </Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="trips" element={<TripHistory/>}></Route>
          <Route path="favourite" element={<Favourite />} />
          <Route path="book">
            <Route path=':id' element={<Book/>}></Route>
          </Route>
          <Route path="search" element={<Search />} />

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>

      </Routes>
    </HistoryRouter>
  </Provider>
);
