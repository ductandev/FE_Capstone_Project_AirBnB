// tsrfc
import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ResponsiveItem from "./ResponsiveItem";
import { Outlet } from "react-router-dom";

type Props = {};

  const HomeTemplate: React.FC = ({}: Props): JSX.Element => {
  return (
    <>
      {/* <ResponsiveItem component={Header} largeTableComponent={HeaderMobile} /> */}
      <Header />
      <div className="content-layout pt-20" style={{ minHeight: "80vh" }}>
        <Outlet></Outlet>
      </div>
      <Footer/>
    </>
  );
};

export default HomeTemplate;
