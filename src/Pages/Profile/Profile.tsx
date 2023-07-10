import React from "react";
import {useNavigate} from  'react-router-dom'

type Props = {};

export default function Profile({ }: Props) {

  const navigate = useNavigate();


  return (
    <div className="container mx-auto xl:max-w-[1220px] mt-4">
      <h1 className="text-[32px] font-extrabold text-[#484848] mb-8">
        Thông tin cá nhân
      </h1>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 me-[88px]">
          <div className="flex flex-col">

            <div className="flex flex-row items-start justify-between my-6">
              <div>
                <h2>Tên pháp lý</h2>
                <p className="text-sm text-gray-500">Nguyễn đức tấn</p>
              </div>
              <div>
                <button className="text-black font-bold underline ">Chỉnh sửa</button>
              </div>
            </div>
            <hr />


            <div className="flex flex-row items-start justify-between my-6">
              <div>
                <h2>Địa chỉ email</h2>
                <p className="text-sm text-gray-500">duc***@gmail.com</p>
              </div>
              <div>
                <button className="text-black font-bold underline ">Chỉnh sửa</button>
              </div>
            </div>
            <hr />


            <div className="flex flex-row items-start justify-between my-6">
              <div>
                <h2>Số điện thoại</h2>
                <p className="text-sm text-gray-500">0908246133</p>
              </div>
              <div>
                <button className="text-black font-bold underline ">Chỉnh sửa</button>
              </div>
            </div>
            <hr />


            <div className="flex flex-row items-start justify-between my-6">
              <div>
                <h2>Ngày tháng năm sinh</h2>
                <p className="text-sm text-gray-500">16/04/1998</p>
              </div>
              <div>
                <button className="text-black font-bold underline ">Chỉnh sửa</button>
              </div>
            </div>
            <hr />


            <div className="flex flex-row items-start justify-between my-6">
              <div>
                <h2>Giới tính</h2>
                <p className="text-sm text-gray-500">nam</p>
              </div>
              <div>
                <button className="text-black font-bold underline ">Chỉnh sửa</button>
              </div>
            </div>
            <hr />



          </div>
        </div>



        <div className="col-span-1 hidden md:block rounded-2xl border-[1px]">
          <div className="p-6">


            <div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 48,
                  width: 48,
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
              >
                <g>
                  <g stroke="none">
                    <path
                      d="M27 5l.585.005c4.29.076 8.837.984 13.645 2.737l.77.288V35.4l-.008.13a1 1 0 0 1-.47.724l-.116.06L27 42.716V25a1 1 0 0 0-.883-.993L26 24H12V8.029l.77-.286c4.797-1.75 9.336-2.658 13.62-2.737L27 5z"
                      fillOpacity=".2"
                    />
                    <path d="M27 1c5.599 0 11.518 1.275 17.755 3.816a2 2 0 0 1 1.239 1.691L46 6.67V35.4a5 5 0 0 1-2.764 4.472l-.205.097-15.594 6.93L27 47l-2.461-1h2.451a.01.01 0 0 0 .007-.003L27 45.99v-1.085l15.218-6.763a3 3 0 0 0 1.757-2.351l.019-.194.006-.196V6.669l-.692-.278C37.557 4.128 32.121 3 27 3S16.443 4.128 10.692 6.391L10 6.67 9.999 24H8V6.669a2 2 0 0 1 1.098-1.786l.147-.067C15.483 2.275 21.401 1 27 1z" />
                  </g>
                  <g fill="none" strokeWidth={2}>
                    <path d="M4 24h22a1 1 0 0 1 1 1v20.99a.01.01 0 0 1-.01.01H4a1 1 0 0 1-1-1V25a1 1 0 0 1 1-1z" />
                    <path d="M21 25v-5a6 6 0 1 0-12 0v5" />
                    <circle cx={15} cy={35} r={2} />
                  </g>
                </g>
              </svg>
              <h1 className="text-xl font-extrabold my-4">
                Tại sao thông tin của tôi không được hiển thị ở đây?
              </h1>
              <p className="mb-6 text-gray-500">
                Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính
                của bạn.
              </p>
            </div>
            <hr />


            <div className="mt-6">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 48,
                  width: 48,
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
              >
                <g stroke="none">
                  <path d="m39 15.999v28.001h-30v-28.001z" fillOpacity=".2" />
                  <path d="m24 0c5.4292399 0 9.8479317 4.32667079 9.9961582 9.72009516l.0038418.27990484v2h7c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v32c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-34c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-32c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h7v-2c0-5.5228475 4.4771525-10 10-10zm17 14h-34v32h34zm-17 14c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm0 2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1 1-.4477153 1-1-.4477153-1-1-1zm0-28c-4.3349143 0-7.8645429 3.44783777-7.9961932 7.75082067l-.0038068.24917933v2h16v-2c0-4.418278-3.581722-8-8-8z" />
                </g>
              </svg>
              <h1 className="text-xl font-extrabold my-4">
                Bạn có thể chỉnh sửa những thông tin nào?
              </h1>
              <p className="mb-6 text-gray-500">
                Bạn có thể chỉnh sửa thông tin liên hệ và thông tin cá nhân. Nếu
                sử dụng thông tin này để xác minh danh tính, bạn sẽ cần phải xác
                minh lần nữa vào lần đặt tiếp theo, hoặc để tiếp tục đón tiếp
                khách.
              </p>
            </div>
            <hr />


            <div className="mt-6">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 48,
                  width: 48,
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
              >
                <g stroke="none">
                  <path
                    d="M24 9C14.946 9 7.125 15.065 4.74 23.591L4.63 24l.013.054c2.235 8.596 9.968 14.78 18.99 14.943L24 39c9.053 0 16.875-6.064 19.26-14.59l.11-.411-.013-.052c-2.234-8.597-9.968-14.78-18.99-14.944L24 9z"
                    fillOpacity=".2"
                  />
                  <path d="M24 5c11.18 0 20.794 7.705 23.346 18.413l.133.587-.133.587C44.794 35.295 35.181 43 24 43 12.82 43 3.206 35.295.654 24.588l-.133-.587.048-.216C2.985 12.884 12.69 5 24 5zm0 2C13.88 7 5.16 13.887 2.691 23.509l-.12.492.032.14c2.288 9.564 10.728 16.513 20.65 16.846l.377.01L24 41c10.243 0 19.052-7.056 21.397-16.861l.031-.14-.031-.138c-2.288-9.566-10.728-16.515-20.65-16.848l-.377-.01L24 7zm0 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                </g>
              </svg>
              <h1 className="text-xl font-extrabold my-4">
                Thông tin nào được chia sẻ với người khác?
              </h1>
              <p className="text-gray-500">
                Airbnb chỉ tiết lộ thông tin liên lạc cho Chủ nhà/Người tổ chức và
                khách sau khi đặt phòng/đặt chỗ được xác nhận.
              </p>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}
