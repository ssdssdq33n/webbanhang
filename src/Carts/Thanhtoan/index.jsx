import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "./thanhtoan.scss";
function Thanhtoan({
  setShowThanhToan,
  setShowDialog,
  show1,
  value,
  show5,
  setSoluong,
}) {
  const toast = useRef(null);
  const show2 = () => {
    toast.current.show({
      severity: "warn",
      summary: "Thông báo!",
      detail: "Vui lòng điền đầy đủ thông tin",
    });
  };
  const show4 = () => {
    toast.current.show({
      severity: "warn",
      summary: "Announcement!",
      detail: "Please fill in the information",
    });
  };
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
  console.log(value1.length);
  return (
    <div>
      <div>
        <Toast ref={toast} />
        <InputText
          onChange={(e) => setValue1(e.target.value)}
          placeholder={value === "VNM" ? "Tên người nhận" : "User"}
          className="w-full"
        />
      </div>
      <div className="mt-3">
        <InputText
          onChange={(e) => setValue2(e.target.value)}
          placeholder={value === "VNM" ? "Số điện thoại" : "Number"}
          className="w-full"
        />
      </div>
      <div className="mt-3">
        <InputTextarea
          onChange={(e) => setValue3(e.target.value)}
          placeholder={
            value === "VNM" ? "Địa chỉ người nhận" : "Recipient address"
          }
          className="w-full address"
        />
      </div>
      <div className="flex justify-content-center mt-3">
        {" "}
        <Button
          label={value === "VNM" ? "Hoàn thành" : "Complete"}
          onClick={() => {
            if (value1.length > 0 && value2.length > 0 && value3.length > 0) {
              {
                value === "VNM" ? show1() : show5();
              }
              setShowDialog(false);
              setShowThanhToan(false);
              setSoluong(0);
            } else {
              {
                value === "VNM" ? show2() : show4();
              }
            }
          }}
        />
      </div>
    </div>
  );
}
export default Thanhtoan;
