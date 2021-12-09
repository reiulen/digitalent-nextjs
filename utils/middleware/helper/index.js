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

export const SweatAlert = (title, message, status) => {
  Swal.fire({
    icon: status, // error || success
    title: title,
    text: message,
    confirmButtonText: "Tutup",
  });
};

export const helperRegexNumber = /^[0-9\b]+$/;
export const helperRegexAlphabet = /^[A-Za-z ]+$/;
export const helperRegexNumberIpk = /^[0-9.\b]+$/;
// CARA PAKAI REGEX
// if (
//   e.target.value === "" ||
//   helperRegexNumber.test(e.target.value)
// ) {
//   setKodePosKtp(e.target.value);
// }
export const helperRegexGPA =
  /^(([0-4]{1}\s)|([0-3]{1}\.\d{0,2}\s))|[4]\.[0]{0,2}\s/gm;

// if (
//   e.target.value === "" ||
//   helperRegexNumber.test(e.target.value)
// ) {
//   setKodePosDomisili(e.target.value);
// }

export const today = new Date();
export const dd = today.getDate();
export const mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
export const yyyy = today.getFullYear();

export const helperRemoveZeroFromIndex0 = (value, setValue) => {
  // cara pakai removeZeroFromIndex0(e.target.value, setName)

  if (value.toString().charAt(0) === "0") {
    setValue(value.replace("0", ""));
  } else {
    setValue(value);
  }
};

export const helperDigitsCount = (n) => {
  var count = 0;
  if (n >= 1) ++count;
  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }
  return count;
};

export const helperTextLimitMax = (value, min, max, funct) => {
  if (value < min) {
    funct(min);
  } else if (value > max) {
    funct(max);
  } else if (value === "000") {
    funct("");
  }
};
// CARA PAKE
{
  /* <input
      type="text"
      name="durasi" name yang dikirim
      placeholder="123"
      maxLength={3}
      className="form-control"
      aria-describedby="basic-addon2"
      value={duration}
      onKeyUp={(e) =>
        helperTextLimitMax(e.target.value, 0, 360, "durasi", setDuration)
  }
/> */
}

export const helperUserStatusColor = (status, setLabel) => {
  // get data.status and setLabel for the tags on the top right screen
  if (status?.includes("tidak") || status?.includes("ditolak"))
    return setLabel("danger");

  if (status?.includes("menunggu") || status?.includes("seleksi"))
    return setLabel("warning");

  if (
    status?.includes("LPJ") ||
    status?.includes("lpj") ||
    status == "survey belum tersedia" ||
    status == "LPJ belum tersedia"
  )
    return setLabel("primary");

  if (
    status?.includes("seleksi administrasi") ||
    status?.includes("menunggu") ||
    status?.includes("belum tersedia")
  )
    return setLabel("warning");

  if (status?.includes("lulus") || status?.includes("Lulus"))
    return setLabel("success");

  if (
    status?.includes("tes substansi") ||
    status?.includes("pelatihan") ||
    status?.includes("survey")
  )
    return setLabel("primary");
  else return setLabel("primary");
};
