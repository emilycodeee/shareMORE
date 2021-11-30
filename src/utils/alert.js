import Swal from "sweetalert2";

const successAlert = (text) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

const errorAlert = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

const warningAlert = (text) => {
  Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: text,
  });
};

const textAlert = (text) => {
  Swal.fire({
    text: text,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

const deleteAlert = (callBack, text) => {
  Swal.fire({
    title: "確定要刪除嗎?",
    text: "刪除將不可恢復，請再次確認是否刪除！",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      callBack();
      Swal.fire("Deleted!", text, "success");
    }
  });
};

export { successAlert, errorAlert, warningAlert, textAlert, deleteAlert };
