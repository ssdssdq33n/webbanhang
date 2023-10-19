import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import Thanhtoan from "./Thanhtoan";
import { Toast } from "primereact/toast";
function Carts({ clicks, setCount, count, setShowDialog, show1 }) {
  const [cart, setCart] = useState({});
  const [showThanhToan, setShowThanhToan] = useState(false);
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "Thông báo",
      detail: "Chưa có sản phẩm trong giỏ hàng",
    });
  };
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const itemTemplate = (product) => {
    let coin = product.price * product.quantity;
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={product.img}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">
                    Số lượng: {product.quantity}
                  </span>
                </span>
                <Tag
                  value={product.inventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${coin}.000 VND</span>
              <Button
                label="Xóa"
                onClick={() => {
                  setCount(count - 1);
                  setCart(product);
                  let index = clicks.findIndex(
                    (item) => item.id === product.id
                  );
                  clicks.splice(index, 1);
                }}
                severity="danger"
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  let res = clicks.reduce((total, currentValue) => {
    return total + currentValue.quantity * currentValue.price;
  }, 0);
  console.log(cart);
  const header = (
    <h2 className="flex justify-content-center">Thông tin mua hàng</h2>
  );
  return (
    <div className="card">
      <Toast ref={toast} position="top-left" />
      <DataView value={clicks} itemTemplate={itemTemplate} />
      <div className="flex justify-content-around align-items-center">
        <h3>Tổng tiền : ${res}.000 VND</h3>
        <Button
          label="Đặt hàng"
          onClick={() => {
            if (res > 0) {
              setShowThanhToan(true);
            } else {
              show();
            }
          }}
        />
      </div>
      <Dialog
        visible={showThanhToan}
        header={header}
        onHide={() => setShowThanhToan(false)}
      >
        <Thanhtoan
          setShowThanhToan={setShowThanhToan}
          setShowDialog={setShowDialog}
          show1={show1}
        />
      </Dialog>
    </div>
  );
}
export default Carts;
