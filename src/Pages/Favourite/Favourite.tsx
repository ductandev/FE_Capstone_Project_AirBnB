import React from "react";

type Props = {};

export default function Favourite({}: Props) {
  return (
  <div className="container mx-auto">
      <h1 className="pt-9 pb-6 text-4xl font-bold  text-[#484848]">Yêu thích</h1>
      <h3 className="text-xl font-bold mt-4">Tạo danh sách Yêu thích đầu tiên</h3>
      <p className="mt-4 text-[#717171]">Trong quá trình tìm kiếm, hãy nhấp vào biểu tượng hình trái tim để lưu các chỗ <br />
         ở và Trải nghiệm bạn thích vào Danh sách yêu thích.</p>
  </div>
  );

}
