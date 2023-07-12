import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { SyncLoader } from "react-spinners";

type Props = {};

export default function Loading({}: Props) {
  const { isLoadingAuth } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { isLoadingChangeProfile } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { isLoadingRoomAPI } = useSelector(
    (state: RootState) => state.roomReducer
  );
  const { isLoadingLocationAPI } = useSelector(
    (state: RootState) => state.locationReducer
  );

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#e8e8e8",
        display:
          isLoadingAuth ||
          isLoadingChangeProfile ||
          isLoadingRoomAPI ||
          isLoadingLocationAPI
            ? "flex"
            : "none",
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
