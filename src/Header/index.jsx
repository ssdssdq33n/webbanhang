import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";
import logo from "../imgs/img_logo.jpg";
import "../Header/header.scss";
import { useState, useRef } from "react";
import Products from "../Products";
import { FilterMatchMode } from "primereact/api";
import { Badge } from "primereact/badge";
function Header() {
  const toast = useRef(null);
  const [soluong, setSoluong] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Thành công",
      detail: "Mua thành công",
    });
  };
  const show2 = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Successful purchase",
    });
  };
  const [giatri, setGiatri] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const options = ["VNM", "ENG"];
  const [value, setValue] = useState(options[0]);
  return (
    <div className="gird">
      <div
        className="flex justify-content-around align-items-center"
        style={{ backgroundColor: "#f7fff4" }}
      >
        <Image
          src={logo}
          alt=""
          width="150"
          height="150"
          preview
          zoomSrc={logo}
        />
        <div
          className=" flex justify-content-center align-items-center"
          style={{ width: "45%" }}
        >
          <div className="p-inputgroup flex-1 p-float-label">
            <InputText
              onChange={(e) =>
                setGiatri({
                  ...giatri,
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.CONTAINS,
                  },
                })
              }
              id="username"
              className="timkiem"
              style={{ width: "100% !important" }}
            />
            <label htmlFor="username">
              {value === "VNM" ? "Tìm kiếm" : "Search"}
            </label>
            <Button
              icon="pi pi-search"
              className="p-button-warning icontimkiem"
            />
          </div>
        </div>
        <div
          className="flex justify-content-between align-items-center"
          style={{ width: "23%" }}
        >
          <span
            className="pi pi-user flex justify-content-center align-items-center"
            style={{
              border: "2px solid #000",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontWeight: "600 !important",
            }}
          ></span>
          <span
            onClick={() => setShowDialog(true)}
            className="pi pi-shopping-cart p-overlay-badge  flex justify-content-center align-items-center"
            style={{
              border: "2px solid #000",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontWeight: "600 !important",
              cursor: "pointer",
            }}
          >
            <Badge value={soluong} severity="danger"></Badge>
          </span>
          <div className="card flex justify-content-center">
            <SelectButton
              value={value}
              onChange={(e) => setValue(e.value)}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className="">
        <Toast ref={toast} position="top-left" />
        <Products
          giatri={giatri}
          value={value}
          show={show}
          show2={show2}
          setSoluong={setSoluong}
          setShowDialog={setShowDialog}
          showDialog={showDialog}
        />
      </div>
    </div>
  );
}
export default Header;
