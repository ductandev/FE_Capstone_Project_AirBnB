"use client";

import useRegisterModal from "../../Hooks/useRegisterModal";
import useLoginModal from "../../Hooks/useLoginModal";

import Modals from "./Modals";
import Heading from "../Header/Navbar/Heading";
import Input from "../Input/Input";

import { useFormik } from "formik";
import * as yup from "yup";

import { DispatchType, RootState } from "../../Redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { loginAsyncAction } from "../../Redux/reducers/authReducer";

export interface UserLoginFrm {
  email: string;
  password: string;
}

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { hideInputBtn } = useSelector((state: RootState) => state.authReducer);
  const dispatch: DispatchType = useDispatch();

  const loginFrm = useFormik<UserLoginFrm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email không được bỏ trống!")
        .email("Email không hợp lệ!"),
      password: yup
        .string()
        .required("Password không được bỏ trống!")
        .min(6, "Password phải từ 6 đến 32 ký tự.")
        .max(32, "Password phải từ 6 đến 32 ký tự."),
    }),
    onSubmit: (values: UserLoginFrm) => {
      const actionApi = loginAsyncAction(values);
      dispatch(actionApi);
    },
  });

  const bodyContent = (
    <div>
      <Heading
        title="Chào mừng trở lại"
        subtitle="Đăng nhập ngay tài khoản của bạn!"
      />
      <div className="rounded-t-xl overflow-hidden border border-gray-400 mt-4">
        <Input
          id="email"
          name="email"
          label="Email"
          disabled={hideInputBtn}
          required
          onInput={loginFrm.handleChange}
        />
        {loginFrm.errors.email && (
          <p className="text-rose-500 text-sm ms-4">{loginFrm.errors.email}</p>
        )}
      </div>

      <div className="rounded-b-xl overflow-hidden border border-gray-400 border-t-0">
        <Input
          id="password"
          name="password"
          label="Mật khẩu"
          type="password"
          disabled={hideInputBtn}
          required
          onInput={loginFrm.handleChange}
        />
        {loginFrm.errors.password && (
          <p className="text-rose-500 text-sm ms-4">
            {loginFrm.errors.password}
          </p>
        )}
      </div>
    </div>
  );

  const footerContent = (
    <div className="">
      <hr />
      <div
        className="
          text-neutral-500 
          text-center 
          p-4 
          font-light
        "
      >
        <p>
          Người mới tới Airbnb?
          <span
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
          >
            {" "}
            Tạo tài khoản.
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <form onSubmit={loginFrm.handleSubmit}>
      <Modals
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        title="Đăng nhập"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Đăng nhập"
        disabled={hideInputBtn}
      />
    </form>
  );
};

export default LoginModal;
