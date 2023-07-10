"use client";

import { useCallback, useState } from "react";

import useRegisterModal from "../../Hooks/useRegisterModal";
import useLoginModal from "../../Hooks/useLoginModal";

import Modals from "./Modals";
import Heading from "../Header/Navbar/Heading";
import Input from "../Input/Input";
import { toast } from "react-hot-toast";
import Button from "../Button/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DispatchType } from "../../Redux/configStore";
import { useDispatch } from "react-redux";
import { registerAsyncAction } from "../../Redux/reducers/authReducer";

export interface UserRegisterFrm {
  email: string;
  name: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
}

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: DispatchType = useDispatch();

  const registerFrm = useFormik<UserRegisterFrm>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Họ và tên không được bỏ trống!")
        .matches(/^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/, "Tên chỉ được chứa chữ cái."),
      email: yup
        .string()
        .required("Email không được bỏ trống!")
        .email("Email không hợp lệ!"),
      password: yup
        .string()
        .required("Mật khẩu không được bỏ trống!")
        .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
        .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
      phone: yup
        .string()
        .required("Số điện thoại không được bỏ trống!")
        .matches(/\d$/, "Vui lòng chỉ điền số!")
        .min(10, "Số điện tối thiểu là 10 số!")
        .max(10, "Số điện tối đa là 10 số!"),
      birthday: yup
        .string()
        .required("Ngày sinh không được bỏ trống!"),
    }),
    onSubmit: (values: UserRegisterFrm) => {
      console.log(values);
      const actionApi = registerAsyncAction(values);
      dispatch(actionApi);
    },
  });

  const bodyContent = (
    <div>
      <Heading title="Chào mừng đến với" subtitle="Tạo tài khoản!" />


      <div className="rounded-t-xl overflow-hidden border border-gray-400">
        <Input
          id="name"
          name="name"
          label="Họ và tên"
          disabled={isLoading}
          onInput={registerFrm.handleChange}
        />
        {registerFrm.errors.name && (
          <p className="text-rose-500 text-sm ms-4">
            {registerFrm.errors.name}
          </p>
        )}
      </div>


      <div className="overflow-hidden border border-gray-400 border-t-0">
        <Input
          id="email"
          name="email"
          label="Email"
          disabled={isLoading}
          onInput={registerFrm.handleChange}
        />
        {registerFrm.errors.email && (
          <p className="text-rose-500 text-sm ms-4">
            {registerFrm.errors.email}
          </p>
        )}
      </div>


      <div className="overflow-hidden border border-gray-400 border-t-0">
        <Input
          id="password"
          name="password"
          label="Mật khẩu"
          type="password"
          disabled={isLoading}
          onInput={registerFrm.handleChange}
        />
        {registerFrm.errors.password && (
          <p className="text-rose-500 text-sm ms-4">
            {registerFrm.errors.password}
          </p>
        )}
      </div>


      <div className="overflow-hidden border border-gray-400 border-t-0">
        <Input
          id="phone"
          name="phone"
          label="Điện thoại"
          disabled={isLoading}
          onInput={registerFrm.handleChange}
        />
        {registerFrm.errors.phone && (
          <p className="text-rose-500 text-sm ms-4">
            {registerFrm.errors.phone}
          </p>
        )}
      </div>


      <div className="overflow-hidden border border-gray-400 border-t-0">
        <Input
          id="birthday"
          name="birthday"
          label="Ngày tháng năm sinh"
          disabled={isLoading}
          onInput={registerFrm.handleChange}
          type="date"
        />
        {registerFrm.errors.birthday && (
          <p className="text-rose-500 text-sm ms-4">
            {registerFrm.errors.birthday}
          </p>
        )}
      </div>


      <div className="rounded-b-xl overflow-hidden border border-gray-400 border-t-0  ps-4">
        <p className="text-zinc-400">Giới tính</p>
        <input
          className="me-1 scale-125"
          id="gender1"
          name="gender"
          type="radio"
          value="true"
          onInput={registerFrm.handleChange}
        />
        <label className="me-3" htmlFor="gender1">
          Nam
        </label>
        <input
          className="me-1 scale-125"
          id="gender2"
          name="gender"
          type="radio"
          value="false"
          onInput={registerFrm.handleChange}
        />
        <label className="me-1" htmlFor="gender2">
          Nữ
        </label>
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
          font-light
          p-3
        "
      >
        <p>
          Bạn đã có tài khoản?
          <span
            // onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            onClick={() => {
              loginModal.onOpen();
              registerModal.onClose();
            }}
          >
            {" "}
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <form onSubmit={registerFrm.handleSubmit}>
      <Modals
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Đăng ký"
        actionLabel="Đăng ký"
        onClose={registerModal.onClose}
        body={bodyContent}
        footer={footerContent}
      />
    </form>
  );
};

export default RegisterModal;
