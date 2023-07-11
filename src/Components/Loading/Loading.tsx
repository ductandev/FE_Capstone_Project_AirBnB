import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { SyncLoader } from "react-spinners";


type Props = {};

export default function Loading({ }: Props) {
  const { isLoading } = useSelector((state: RootState) => state.authReducer);
  const {isLoadingChangeProfile} =  useSelector((state:RootState) => state.userReducer)

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#e8e8e8",
        display: isLoading || isLoadingChangeProfile ? "flex" : "none",
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
