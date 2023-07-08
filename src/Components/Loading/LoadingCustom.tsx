import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { SyncLoader } from "react-spinners";


type Props = {};

export default function LoadingCustom({ }: Props) {
  const { isLoading } = useSelector((state: RootState) => state.authReducer);

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#e8e8e8",
        display: isLoading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        color: "#fff",
      }}
    >

      <SyncLoader color="#36d7b7" />

    </div>
  );
}
