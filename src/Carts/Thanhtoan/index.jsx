import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "./thanhtoan.scss";
function Thanhtoan({ setShowThanhToan, setShowDialog, show1 }) {
  const toast = useRef(null);
  const show2 = () => {
    toast.current.show({
      severity: "warn",
      summary: "Thông báo!",
      detail: "Vui lòng điền đầy đủ thông tin",
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
          placeholder="Tên người nhận"
          className="w-full"
        />
      </div>
      <div className="mt-3">
        <InputText
          onChange={(e) => setValue2(e.target.value)}
          placeholder="Số điện thoại"
          className="w-full"
        />
      </div>
      <div className="mt-3">
        <InputTextarea
          onChange={(e) => setValue3(e.target.value)}
          placeholder="Địa chỉ người nhận"
          className="w-full address"
        />
      </div>
      <div className="flex justify-content-center mt-3">
        {" "}
        <Button
          label="Hoàn thành"
          onClick={() => {
            if (value1.length > 0 && value2.length > 0 && value3.length > 0) {
              show1();
              setShowDialog(false);
              setShowThanhToan(false);
            } else {
              show2();
            }
          }}
        />
      </div>
    </div>
  );
}
export default Thanhtoan;
