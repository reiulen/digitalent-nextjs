import Swal from "sweetalert2";

export const disablePlusMinusPeriod = e => {
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

export const SweatAlert = (title, message, status) => {
  Swal.fire({
    icon: status, // error || success
    title: title,
    text: message,
    confirmButtonText: "Tutup",
  });
};

export const helperRegexNumber = /^[0-9\b]+$/;
// CARA PAKAI REGEX
// if (
//   e.target.value === "" ||
//   helperRegexNumber.test(e.target.value)
// ) {
//   setKodePosKtp(e.target.value);
// }
export const helperRegexGPA =
  /^(([0-4]{1}\s)|([0-3]{1}\.\d{0,2}\s))|[4]\.[0]{0,2}\s/gm;

export const today = new Date();
export const dd = today.getDate();
export const mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
export const yyyy = today.getFullYear();

export const edit0Value = (e, setValue) => {
  if(e.toString().charAt(0) === "0"){
    setValue(e.replace("0", ""))
  }else{
    setValue(e);
  }
}