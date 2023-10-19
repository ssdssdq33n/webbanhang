import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import img1 from "../imgs/img_granola.jpg";
import img2 from "../imgs/img_granolanguyenban.jpg";
import img3 from "../imgs/img_granolasocola.jpg";
import img4 from "../imgs/img_mixnhiu.jpg";
import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import Carts from "../Carts";
import { Toast } from "primereact/toast";
function Products({
  giatri,
  value,
  show,
  show2,
  setSoluong,
  showDialog,
  setShowDialog,
}) {
  const toast = useRef(null);
  const show1 = () => {
    toast.current.show({
      severity: "success",
      summary: "Thông báo!",
      detail: "Thanh toán thành công",
    });
  };
  const [clicks, setClick] = useState([]);
  const [count, setCount] = useState(0);
  const data = [
    {
      id: 1,
      name: "GRANOLA MATCHA",
      price: 140,
      rating: 3,
      img: img1,
      quantity: 1,
      inventoryStatus: "Còn hàng",
      category: "Còn hàng",
    },
    {
      id: 2,
      name: "GRANOLA SOCOLA",
      price: 150,
      rating: 4,
      img: img3,
      quantity: 1,
      inventoryStatus: "Còn hàng",
      category: "Còn hàng",
    },
    {
      id: 3,
      name: "GRANOLA NGUYÊN BẢN",
      price: 120,
      rating: 5,
      img: img2,
      quantity: 1,
      inventoryStatus: "Còn hàng",
      category: "Còn hàng",
    },
    {
      id: 4,
      name: "OPTIONAL NUTS",
      price: 160,
      rating: 3,
      img: img4,
      quantity: 1,
      inventoryStatus: "Mix theo yêu cầu",
      category: "Còn hàng",
    },
  ];
  const imageBodyTemplate = (product) => {
    return (
      <img src={product.img} alt="" className="w-6rem shadow-2 border-round" />
    );
  };
  const priceBodyTemplate = (product) => {
    return <h3>{product.price}.000 VND</h3>;
  };
  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };
  const buttonBodyTemplate = (data) => {
    return (
      <Button
        onClick={() => {
          setCount(count + 1);
          if (clicks.length === 0) {
            setClick([...clicks, data]);
          } else {
            let check = clicks.find((item) => item.id === data.id);
            if (!check) {
              setClick([...clicks, data]);
            } else {
              let index = clicks.findIndex((item) => item.id === data.id);
              clicks[index].quantity += 1;
            }
          }
          value === "VNM" ? show() : show2();
        }}
        label={value === "VNM" ? "Mua" : "Buy"}
      />
    );
  };
  useEffect(() => {
    let res = clicks.reduce((total, currentValue) => {
      return total + currentValue.quantity;
    }, 0);
    setSoluong(res);
  }, [count]);
  console.log(clicks);
  return (
    <div>
      <Toast ref={toast} position="top-left" />
      <DataTable
        value={data}
        filters={giatri}
        tableStyle={{ minWidth: "60rem" }}
        paginator
        currentPageReportTemplate="Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
        rows={10}
        rowsPerPageOptions={[2, 4, 6]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      >
        <Column field="id" header="STT"></Column>
        <Column
          field="name"
          header={value === "VNM" ? "Tên sản phẩm" : "Name"}
        ></Column>
        <Column
          header={value === "VNM" ? "Ảnh sản phẩm" : "Image"}
          body={imageBodyTemplate}
        ></Column>
        <Column
          field="price"
          body={priceBodyTemplate}
          header={value === "VNM" ? "Giá sản phẩm" : "Price"}
        ></Column>
        <Column
          header={value === "VNM" ? "Mua ngay" : "Buy"}
          body={buttonBodyTemplate}
        ></Column>
        <Column
          field="rating"
          header={value === "VNM" ? "Đánh giá" : "Rating"}
          body={ratingBodyTemplate}
        ></Column>
      </DataTable>
      <div>
        <Dialog visible={showDialog} onHide={() => setShowDialog(false)}>
          <Carts
            clicks={clicks}
            setCount={setCount}
            setShowDialog={setShowDialog}
            count={count}
            show1={show1}
          />
        </Dialog>
      </div>
    </div>
  );
}
export default Products;
