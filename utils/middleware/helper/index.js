import Swal from "sweetalert2";

export const disablePlusMinusPeriod = (e) => {
  if (e.code == "Minus") {
    return false;
  }
  if (e.code == "Period") {
    return false;
  }
  if (e.code == "NumpadAdd") {
    return false;
  }
  if (e.code == "NumpadSubtract") {
    return false;
  }
  if (e.code == "Equal") {
    return false;
  }
};

export const SweetAlert = (title, message, status) => {
  Swal.fire({
    icon: status, // error || success
    title: title,
    text: message,
    confirmButtonText: "Tutup",
  });
};
