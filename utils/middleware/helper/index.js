import Swal from "sweetalert2";
import OptionsReference from "../../../components/content/pelatihan/training/components/option-reference.component";
import RadioReference from "../../../components/content/pelatihan/training/components/radio-reference.component";
import CheckboxReference from "../../../components/content/pelatihan/training/components/checkbox-reference.component";

import { options, element, size } from "./data";

export const helperHandlePercentage = (totalAdd, total) => {
  if (+totalAdd != 0 && +total != 0) {
    return Math.ceil((100 * +totalAdd) / +total);
  }
  return 0;
};

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

export const helperFormatMoney = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

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

let SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

export const kFormatter = (number) => {
  // what tier? (determines SI symbol)
  let tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  // scale the number
  let scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
};

// CARA PAKE
// kFormatter(your value)

// RENDER FORM BUILDER PESERTA
export const helperElementRenderIndex = (row, propsToken) => {
  switch (row.element) {
    case "text":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
            placeholder={`Silahkan Masukkan ${row.name}`}
          />
        </div>
      );
      break;
    case "select":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <select name="" className="form-control" required={row.required}>
            <option value="">--Pilih Data--</option>
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <option value={dat} key={i}>
                  {dat}
                </option>
              ))
            ) : (
              <OptionsReference id={row.dataOption} token={propsToken} />
            )}
          </select>
        </div>
      );
      break;
    case "checkbox":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="checkbox"
                    name="plotRegistration"
                    className="form-check-input"
                    required={row.required}
                    value={dat}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <CheckboxReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "textarea":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "radio":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="radio"
                    name={row.name}
                    className="form-check-input"
                    value={dat}
                    required={row.required}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <RadioReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "file_image":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="image/png, image/jpeg , image/jpg"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "file_doc":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="application/pdf"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "date":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "triggered":
      return (
        <>
          <div
            style={{ maxWidth: "91%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              <option value="">--Pilih Data--</option>
              {row.option === "manual" &&
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))}
            </select>
          </div>
        </>
      );
      break;
    case "upload_document":
      return (
        <div
          style={{ maxWidth: "91%" }}
          className={`form-group mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <p>{row.fileName || row.dataOption}</p>
        </div>
      );
      break;
    default:
      break;
  }
};

export const helperElementRenderChildren = (row, propsToken) => {
  switch (row.element) {
    case "text":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
            placeholder={`Silahkan Masukkan ${row.name}`}
          />
        </div>
      );
      break;
    case "select":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <select name="" className="form-control" required={row.required}>
            <option value="">--Pilih Data--</option>
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <option value={dat} key={i}>
                  {dat}
                </option>
              ))
            ) : (
              <OptionsReference id={row.dataOption} token={propsToken} />
            )}
          </select>
        </div>
      );
      break;
    case "checkbox":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="checkbox"
                    name="plotRegistration"
                    className="form-check-input"
                    required={row.required}
                    value={dat}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <CheckboxReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "textarea":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "radio":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="radio"
                    name={row.name}
                    className="form-check-input"
                    value={dat}
                    required={row.required}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <RadioReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "file_image":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="image/png, image/jpeg , image/jpg"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "file_doc":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="application/pdf"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "date":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "triggered":
      return (
        <>
          <div
            style={{ maxWidth: "94%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              <option value="">--Pilih Data--</option>
              {row.option === "manual" &&
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))}
            </select>
          </div>
          {row.triggered_index.map((rowIndex, k) => (
            <>
              <div
                style={{ maxWidth: "91%" }}
                className={`form-group  mt-0 mb-0 col-md-12`}
              >
                <p className="mb-0 mt-3 fw-600 fz-16">
                  Opsi : {rowIndex.triggeredName}
                </p>
              </div>
              {rowIndex.triggeredForm.map((rowForm, index) => (
                <>{helperElementRenderIndex(rowForm, propsToken)}</>
              ))}
            </>
          ))}
        </>
      );
      break;
    case "upload_document":
      return (
        <div
          style={{ maxWidth: "94%" }}
          className={`form-group mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <p>{row.fileName || row.dataOption}</p>
        </div>
      );
      break;
    default:
      break;
  }
};

export const helperElementRenderParent = (row, propsToken) => {
  switch (row.element) {
    case "text":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
            placeholder={`Silahkan Masukkan ${row.name}`}
          />
        </div>
      );
      break;
    case "select":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <select name="" className="form-control" required={row.required}>
            <option value="">--Pilih Data--</option>
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <option value={dat} key={i}>
                  {dat}
                </option>
              ))
            ) : (
              <OptionsReference id={row.dataOption} token={propsToken} />
            )}
          </select>
        </div>
      );
      break;
    case "checkbox":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="checkbox"
                    name="plotRegistration"
                    className="form-check-input"
                    required={row.required}
                    value={dat}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <CheckboxReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "textarea":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "radio":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="radio"
                    name={row.name}
                    className="form-check-input"
                    value={dat}
                    required={row.required}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <RadioReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "file_image":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="image/png, image/jpeg , image/jpg"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "file_doc":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="application/pdf"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "date":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group  mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "triggered":
      return (
        <>
          <div
            style={{ maxWidth: "97%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              <option value="">--Pilih Data--</option>
              {row.option === "manual" &&
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))}
            </select>
          </div>
          {row.triggered_children.map((rowChildren, k) => (
            <>
              <div
                style={{ maxWidth: "94%" }}
                className={`form-group  mt-0 mb-0 col-md-12`}
              >
                <p className="mb-0 mt-3 fw-600 fz-16">
                  Opsi : {rowChildren.triggeredName}
                </p>
              </div>
              {rowChildren.triggeredForm.map((rowForm, index) => (
                <>{helperElementRenderChildren(rowForm, propsToken)}</>
              ))}
            </>
          ))}
        </>
      );
      break;
    case "upload_document":
      return (
        <div
          style={{ maxWidth: "97%" }}
          className={`form-group mt-0 mb-0 ${row.size}`}
        >
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <p>{row.fileName || row.dataOption}</p>
        </div>
      );
      break;
    default:
      break;
  }
};

export const helperElementRender = (row, propsToken) => {
  switch (row.element) {
    case "text":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
            placeholder={`Silahkan Masukkan ${row.name}`}
          />
        </div>
      );
      break;
    case "select":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <select name="" className="form-control" required={row.required}>
            <option value="">--Pilih Data--</option>

            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <option value={dat} key={i}>
                  {dat}
                </option>
              ))
            ) : (
              <OptionsReference id={row.dataOption} token={propsToken} />
            )}
          </select>
        </div>
      );
      break;
    case "checkbox":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="checkbox"
                    name="plotRegistration"
                    className="form-check-input"
                    required={row.required}
                    value={dat}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <CheckboxReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "textarea":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "radio":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="my-auto">
            {row.option === "manual" ? (
              row.dataOption.split(";").map((dat, i) => (
                <div className="form-check pb-3" key={i}>
                  <input
                    type="radio"
                    name={row.name}
                    className="form-check-input"
                    value={dat}
                    required={row.required}
                  />
                  <label className="form-check-label">{dat}</label>
                </div>
              ))
            ) : (
              <RadioReference
                id={row.dataOption}
                token={propsToken}
                required={row.required}
              />
            )}
          </div>
        </div>
      );
      break;
    case "file_image":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="image/png, image/jpeg , image/jpg"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "file_doc":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="application/pdf"
              required={row.required}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Belum ada File
            </label>
          </div>
        </div>
      );
      break;
    case "date":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <input
            type={row.element}
            name=""
            className="form-control"
            required={row.required}
          />
        </div>
      );
      break;
    case "triggered":
      return (
        <>
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              <option value="">--Pilih Data--</option>
              {row.option === "manual" &&
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))}
            </select>
          </div>
          {row.triggered_parent.map((rowParent, k) => (
            <>
              <div
                style={{ maxWidth: "97%" }}
                className={`form-group  mt-0 mb-0 col-md-12`}
              >
                <p className="mb-0 mt-3 fw-600 fz-16">
                  Opsi : {rowParent.triggeredName}
                </p>
              </div>
              {rowParent.triggeredForm.map((rowForm, index) => (
                <>{helperElementRenderParent(rowForm, propsToken)}</>
              ))}
            </>
          ))}
        </>
      );
      break;
    case "upload_document":
      return (
        <div className={`form-group mt-0 mb-0 ${row.size}`}>
          <label className="col-form-label font-weight-bold">{row.name}</label>
          <p>{row.fileName || row.dataOption}</p>
        </div>
      );
      break;
    default:
      break;
  }
};
// RENDER FORM BUILDER PESERTA

export const helperMultipleElementRender = (
  row,
  funcInputChangeParentHandler,
  i,
  parentIndex,
  j = null,
  childrenIndex,
  k = null,
  indexIndex,
  l = null
) => {
  if (
    row.element === "select" ||
    row.element === "checkbox" ||
    row.element === "radio"
  ) {
    return (
      <>
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">Option</label>
            <select
              className="form-control"
              name="option"
              value={row.option}
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {options.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {renderDataOptionHandler(
          row,
          i,
          parentIndex,
          j,
          childrenIndex,
          k,
          indexIndex,
          l
        )}
      </>
    );
  } else if (row.element === "triggered") {
    return (
      <>
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">Option</label>
            <select
              className="form-control"
              name="option"
              value={row.option}
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {options.map(
                (opt, i) =>
                  opt.value !== "select_reference" && (
                    <option key={i} value={opt.value}>
                      {opt.name}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <input
              type="text"
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              placeholder="data1;data2"
              autoComplete="off"
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
              disabled={row.triggered === "1" ? true : false}
            />
          </div>
        </div>
      </>
    );
  } else if (row.element === "upload_document") {
    return (
      <div className="col-sm-12 col-md-4">
        <div className="form-group mb-2">
          <label className="col-form-label font-weight-bold">
            Upload Document
          </label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              name="upload-document"
              accept="image/png, image/jpeg , image/jpg, application/pdf"
              id="uploadThumbnail"
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
            />
            <label className="custom-file-label" htmlFor="customFile">
              {row.fileName === ""
                ? row.dataOption.split("/")[2]
                : row.fileName}
            </label>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">Option</label>
            <select
              className="form-control"
              name="option"
              value={row.option}
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              disabled
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {options.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <select
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              onChange={(e) =>
                funcInputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              disabled
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {dataOptions.map((datOpt, i) => (
                <option key={i} value={datOpt.value}>
                  {datOpt.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }
};

export const helperChangeInputForm = (
  value,
  formBuilder,
  alfa,
  parentIndex = null,
  beta = null,
  childrenIndex = null,
  gamma = null,
  indexIndex = null,
  delta = null
) => {
  if (
    alfa !== null &&
    parentIndex === null &&
    beta === null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    let list = [...formBuilder];
    let element = list[alfa];
    if (element.element === "triggered") {
      element.triggered_parent.length > 0 &&
        element.triggered_parent.map((triggeredRow, triggeredIndex) => {
          triggeredRow.triggeredForm.length > 0 &&
            triggeredRow.triggeredForm.map((elementRow, elementIndex) => {
              if (elementRow.element === "checkbox") {
                elementRow.value = [];
              } else {
                elementRow.value = "";
              }
            });
        });
    }
    if (element.element === "checkbox") {
      let valArr = element.value;
      if (valArr.length > 0) {
        valArr.map((row, i) => {
          if (row === value) {
            valArr.splice(i, 1);
          } else {
            valArr.push(value);
          }
        });
      } else {
        valArr.push(value);
      }
    } else {
      element.value = value;
    }
    if (element.element === "file_image" || element.element === "file_doc") {
      let type = [""];
      if (element.element === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (element.element === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    if (element.element === "upload_document") {
      let type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];

      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    return list;
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    let list = [...formBuilder];
    let element = list[alfa].triggered_parent[parentIndex].triggeredForm[beta];

    if (element.element === "triggered") {
      element.triggered_children.length > 0 &&
        element.triggered_children.map((triggeredRow, triggeredIndex) => {
          triggeredRow.triggeredForm.length > 0 &&
            triggeredRow.triggeredForm.map((elementRow, elementIndex) => {
              if (elementRow.element === "checkbox") {
                elementRow.value = [];
              } else {
                elementRow.value = "";
              }
            });
        });
    }

    if (element.element === "checkbox") {
      let valArr = element.value;
      if (valArr.length > 0) {
        valArr.map((row, i) => {
          if (row === value) {
            valArr.splice(i, 1);
          } else {
            valArr.push(value);
          }
        });
      } else {
        valArr.push(value);
      }
    } else {
      element.value = value;
    }

    if (element.element === "file_image" || element.element === "file_doc") {
      let type = [""];
      if (element.element === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (element.element === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }

    if (element.element === "upload_document") {
      let type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];

      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    return list;
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex === null &&
    delta === null
  ) {
    let list = [...formBuilder];
    let element =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma];

    if (element.element === "triggered") {
      element.triggered_index.length > 0 &&
        element.triggered_index.map((triggeredRow, triggeredIndex) => {
          triggeredRow.triggeredForm.length > 0 &&
            triggeredRow.triggeredForm.map((elementRow, elementIndex) => {
              if (elementRow.element === "checkbox") {
                elementRow.value = [];
              } else {
                elementRow.value = "";
              }
            });
        });
    }

    if (element.element === "checkbox") {
      let valArr = element.value;
      if (valArr.length > 0) {
        valArr.map((row, i) => {
          if (row === value) {
            valArr.splice(i, 1);
          } else {
            valArr.push(value);
          }
        });
      } else {
        valArr.push(value);
      }
    } else {
      element.value = value;
    }

    if (element.element === "file_image" || element.element === "file_doc") {
      let type = [""];
      if (element.element === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (element.element === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }

    if (element.element === "upload_document") {
      let type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];

      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    return list;
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex !== null &&
    delta !== null
  ) {
    let list = [...formBuilder];
    let element =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma].triggered_index[
        indexIndex
      ].triggeredForm[delta];
    if (element.element === "checkbox") {
      let valArr = element.value;
      if (valArr.length > 0) {
        valArr.map((row, i) => {
          if (row === value) {
            valArr.splice(i, 1);
          } else {
            valArr.push(value);
          }
        });
      } else {
        valArr.push(value);
      }
    } else {
      element.value = value;
    }
    if (element.element === "file_image" || element.element === "file_doc") {
      let type = [""];
      if (element.element === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (element.element === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }

    if (element.element === "upload_document") {
      let type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];

      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          element.fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }

    return list;
  }
};

export const helperChangeInputFormBuilder = (
  event,
  formBuilder,
  alfa = null,
  parentIndex = null,
  beta = null,
  childrenIndex = null,
  gamma = null,
  indexIndex = null,
  delta = null
) => {
  const { value, name, checked } = event.target;
  const list = [...formBuilder];
  if (
    alfa !== null &&
    parentIndex === null &&
    beta === null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    if (name === "upload-document") {
      const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
      if (event.target.files[0]) {
        if (type.includes(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              list[alfa].dataOption = reader.result;
            }
          };
          reader.readAsDataURL(event.target.files[0]);
          list[alfa].fileName = event.target.files[0].name;
        } else {
          event.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
            "error"
          );
        }
      }
    }
    if (name === "element" && value === "triggered") {
      list[alfa].option = "manual";
      list[alfa].size = "col-md-12";
    }
    list[alfa][name] = value;
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      list[alfa]["required"] = check;
    }
    if (name === "triggered") {
      let check = checked === true ? "1" : "0";
      if (checked) {
        let dataOption = list[alfa].dataOption.split(";");
        dataOption.map((triggeredOption, index) => {
          let val = {
            key: index + 1,
            triggeredName: triggeredOption,
            triggeredForm: [
              {
                key: 1,
                name: " ",
                element: "",
                size: "col-md-12",
                option: "",
                dataOption: "",
                fileName: "Belum ada file",
                triggered: "0",
                triggered_children: [],
                value: "",
              },
            ],
          };
          list[alfa].triggered_parent.push(val);
        });
      } else {
        list[alfa].triggered_parent = [];
      }
      list[alfa]["triggered"] = check;
    }
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    let element = list[alfa].triggered_parent[parentIndex].triggeredForm[beta];
    element[name] = value;
    if (name === "upload-document") {
      const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
      if (event.target.files[0]) {
        if (type.includes(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.dataOption = reader.result;
            }
          };
          reader.readAsDataURL(event.target.files[0]);
          element.fileName = event.target.files[0].name;
        } else {
          event.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
            "error"
          );
        }
      }
    }
    if (name === "element" && value === "triggered") {
      element.option = "manual";
      element.size = "col-md-12";
    }
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      element.required = check;
    }
    if (name === "triggered") {
      let check = checked === true ? "1" : "0";
      element.triggered = check;
      if (checked) {
        let dataOption = element.dataOption.split(";");
        dataOption.map((triggeredOption, index) => {
          let val = {
            key: index + 1,
            triggeredName: triggeredOption,
            triggeredForm: [
              {
                key: 1,
                name: "",
                element: "",
                size: "col-md-12",
                option: "",
                dataOption: "",
                fileName: "Belum ada file",
                triggered: "0",
                triggered_index: [],
                value: "",
              },
            ],
          };
          element.triggered_children.push(val);
        });
      } else {
        element.triggered_children = [];
      }
    }
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex === null &&
    delta === null
  ) {
    let element =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma];
    element[name] = value;
    if (name === "upload-document") {
      const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
      if (event.target.files[0]) {
        if (type.includes(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.dataOption = reader.result;
            }
          };
          reader.readAsDataURL(event.target.files[0]);
          element.fileName = event.target.files[0].name;
        } else {
          event.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
            "error"
          );
        }
      }
    }
    if (name === "element" && value === "triggered") {
      element.option = "manual";
      element.size = "col-md-12";
    }
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      element.required = check;
    }
    if (name === "triggered") {
      let check = checked === true ? "1" : "0";
      element.triggered = check;
      if (checked) {
        let dataOption = element.dataOption.split(";");
        dataOption.map((triggeredOption, index) => {
          let val = {
            key: index + 1,
            triggeredName: triggeredOption,
            triggeredForm: [
              {
                key: 1,
                name: "",
                element: "",
                size: "col-md-12",
                option: "",
                dataOption: "",
                fileName: "Belum ada file",
                triggered: "0",
                value: "",
              },
            ],
          };
          element.triggered_index.push(val);
        });
      } else {
        element.triggered_index = [];
      }
    }
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex !== null &&
    delta !== null
  ) {
    let element =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma].triggered_index[
        indexIndex
      ].triggeredForm[delta];
    element[name] = value;
    if (name === "upload-document") {
      const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
      if (event.target.files[0]) {
        if (type.includes(event.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              element.dataOption = reader.result;
            }
          };
          reader.readAsDataURL(event.target.files[0]);
          element.fileName = event.target.files[0].name;
        } else {
          event.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
            "error"
          );
        }
      }
    }
    if (name === "element" && value === "triggered") {
      element.option = "manual";
      element.size = "col-md-12";
    }
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      element.required = check;
    }
  }
  return list;
};

export const helperAddFieldTriggered = (
  formBuilder,
  alfa = null,
  parentIndex = null,
  beta = null,
  childrenIndex = null,
  gamma = null,
  indexIndex = null,
  delta = null
) => {
  const list = [...formBuilder];
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex !== null
  ) {
    let newKey = 1;
    const formElement =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma].triggered_index[
        indexIndex
      ];
    if (formElement.triggeredForm.length > 0) {
      newKey =
        formElement.triggeredForm[formElement.triggeredForm.length - 1].key + 1;
    }
    const val = {
      key: newKey,
      name: " ",
      element: "",
      size: "col-md-12",
      option: "",
      dataOption: "",
      fileName: "Belum ada file",
      triggered: "0",
    };
    formElement.triggeredForm.push(val);
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma === null &&
    indexIndex === null
  ) {
    let newKey = 1;
    const formElement =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex];
    const val = {
      key: newKey,
      name: " ",
      element: "",
      size: "col-md-12",
      option: "",
      dataOption: "",
      fileName: "Belum ada file",
      triggered: "0",
      triggered_index: [],
      value: "",
    };
    formElement.triggeredForm.push(val);
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta === null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null
  ) {
    let newKey = 1;
    const formElement = list[alfa].triggered_parent[parentIndex];
    if (formElement.triggeredForm.length > 0) {
      newKey =
        formElement.triggeredForm[formElement.triggeredForm.length - 1].key + 1;
    }
    const val = {
      key: newKey,
      name: " ",
      element: "",
      size: "col-md-12",
      option: "",
      dataOption: "",
      fileName: "Belum ada file",
      triggered: "0",
      triggered_children: [],
      value: "",
    };
    formElement.triggeredForm.push(val);
  }
  return list;
};

export const helperRemoveField = (
  formBuilder,
  alfa = null,
  parentIndex = null,
  beta = null,
  childrenIndex = null,
  gamma = null,
  indexIndex = null,
  delta = null
) => {
  const list = [...formBuilder];
  if (
    alfa !== null &&
    parentIndex === null &&
    beta === null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    list.splice(alfa, 1);
    list.forEach((row, i) => {
      let key = i + 1;
      list[i]["key"] = key;
    });
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex === null &&
    gamma === null &&
    indexIndex === null &&
    delta === null
  ) {
    let listAlfa = list[alfa].triggered_parent[parentIndex];
    listAlfa.triggeredForm.splice(beta, 1);
    listAlfa.triggeredForm.forEach((row, i) => {
      let key = i + 1;
      listAlfa.triggeredForm[i]["key"] = key;
    });
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex === null &&
    delta === null
  ) {
    let listBeta =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex];
    listBeta.triggeredForm.splice(gamma, 1);
    listBeta.triggeredForm.forEach((row, i) => {
      let key = i + 1;
      listBeta.triggeredForm[i]["key"] = key;
    });
  }
  if (
    alfa !== null &&
    parentIndex !== null &&
    beta !== null &&
    childrenIndex !== null &&
    gamma !== null &&
    indexIndex !== null &&
    delta !== null
  ) {
    let listGamma =
      list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
        .triggered_children[childrenIndex].triggeredForm[gamma].triggered_index[
        indexIndex
      ];
    listGamma.triggeredForm.splice(delta, 1);
    listGamma.triggeredForm.forEach((row, i) => {
      let key = i + 1;
      listGamma.triggeredForm[i]["key"] = key;
    });
  }
  return list;
};

export const helperFormatCheckbox = (formBuilderNon) => {
  let formBuilderFormat;
  formBuilderNon &&
    formBuilderNon.length > 0 &&
    formBuilderNon.map((rowBuilder, i) => {
      // FIRST FORM BUILDER OBJECT
      if (rowBuilder.element === "checkbox") {
        rowBuilder.value = [];
      }
      rowBuilder.triggered_parent.length > 0 &&
        rowBuilder.triggered_parent.map((rowParent, indexParent) => {
          // TITLE FORM BUILDER OBJECT PARENT
          rowParent.triggeredForm.length > 0 &&
            rowParent.triggeredForm.map((rowFormParent, indexFormParent) => {
              // SECOND FORM BUILDER OBJECT
              if (rowFormParent.element === "checkbox") {
                rowFormParent.value = [];
              }
              rowFormParent.triggered_children.length > 0 &&
                rowFormParent.triggered_children.map(
                  (rowChildren, indexChildren) => {
                    // TITLE FORM BUILDER OBJECT CHILDREN
                    rowChildren.triggeredForm.length > 0 &&
                      rowChildren.triggeredForm.map(
                        (rowFormChildren, indexFormChildren) => {
                          // THIRD FORM BUILDER OBJECT
                          if (rowFormChildren.element === "checkbox") {
                            rowFormChildren.value = [];
                          }
                          rowFormChildren.triggered_index.length > 0 &&
                            rowFormChildren.triggered_index.map(
                              (rowIndex, indexIndex) => {
                                // TITLE FORM BUILDER OBJECT INDEX
                                rowIndex.triggeredForm.length > 0 &&
                                  rowIndex.triggeredForm.map(
                                    (rowFormIndex, indexFormIndex) => {
                                      // FOURTH FORM BUILDER OBJECT
                                      if (rowFormIndex.element === "checkbox") {
                                        rowFormIndex.value = [];
                                      }
                                      // console.log(rowFormIndex);
                                      // FOURTH FORM BUILDER OBJECT
                                    }
                                  );
                                // console.log(rowIndex);
                                // TITLE FORM BUILDER OBJECT INDEX
                              }
                            );
                          // console.log(rowFormChildren);
                          // THIRD FORM BUILDER OBJECT
                        }
                      );
                    // TITLE FORM BUILDER OBJECT CHILDREN
                    // console.log(rowChildren);
                  }
                );
              // SECOND FORM BUILDER OBJECT
              // console.log(rowFormParent);
            });
          // TITLE FORM BUILDER OBJECT PARENT
          // console.log(rowParent);
        });
      // FIRST FORM BUILDER OBJECT
      // console.log(rowBuilder);
    });
  formBuilderFormat = formBuilderNon;
  return formBuilderFormat;
};

export const helperUnformatCheckbox = (formBuilderCheck, type = null) => {
  let formBuilderFormat;
  formBuilderCheck &&
    formBuilderCheck.map((rowBuilder, i) => {
      // FIRST FORM BUILDER OBJECT
      if (rowBuilder.element === "checkbox" && rowBuilder.value !== "") {
        let val = rowBuilder.value.join(",");
        rowBuilder.value = val;
      } else {
        if (type === "admin") {
          rowBuilder.value = "";
          rowBuilder.fileName = "Belum ada file";
        }
      }
      rowBuilder.triggered_parent.length > 0 &&
        rowBuilder.triggered_parent.map((rowParent, indexParent) => {
          // TITLE FORM BUILDER OBJECT PARENT
          rowParent.triggeredForm.length > 0 &&
            rowParent.triggeredForm.map((rowFormParent, indexFormParent) => {
              // SECOND FORM BUILDER OBJECT
              if (
                rowFormParent.element === "checkbox" &&
                rowFormParent.value !== ""
              ) {
                let val = rowFormParent.value.join(",");
                rowFormParent.value = val;
              } else {
                if (type === "admin") {
                  rowFormParent.value = "";
                  rowFormParent.fileName = "Belum ada file";
                }
              }
              rowFormParent.triggered_children.length > 0 &&
                rowFormParent.triggered_children.map(
                  (rowChildren, indexChildren) => {
                    // TITLE FORM BUILDER OBJECT CHILDREN
                    rowChildren.triggeredForm.length > 0 &&
                      rowChildren.triggeredForm.map(
                        (rowFormChildren, indexFormChildren) => {
                          // THIRD FORM BUILDER OBJECT
                          if (
                            rowFormChildren.element === "checkbox" &&
                            rowFormChildren.value !== ""
                          ) {
                            let val = rowFormChildren.value.join(",");
                            rowFormChildren.value = val;
                          } else {
                            if (type === "admin") {
                              rowFormChildren.value = "";
                              rowFormChildren.fileName = "Belum ada file";
                            }
                          }
                          rowFormChildren.triggered_index.length > 0 &&
                            rowFormChildren.triggered_index.map(
                              (rowIndex, indexIndex) => {
                                // TITLE FORM BUILDER OBJECT INDEX
                                rowIndex.triggeredForm.length > 0 &&
                                  rowIndex.triggeredForm.map(
                                    (rowFormIndex, indexFormIndex) => {
                                      // FOURTH FORM BUILDER OBJECT
                                      if (
                                        rowFormIndex.element === "checkbox" &&
                                        rowFormIndex.value !== ""
                                      ) {
                                        let val = rowFormIndex.value.join(",");
                                        rowFormIndex.value = val;
                                      } else {
                                        if (type === "admin") {
                                          rowFormIndex.value = "";
                                          rowFormIndex.fileName =
                                            "Belum ada file";
                                        }
                                      }
                                      // console.log(rowFormIndex);
                                      // FOURTH FORM BUILDER OBJECT
                                    }
                                  );
                                // console.log(rowIndex);
                                // TITLE FORM BUILDER OBJECT INDEX
                              }
                            );
                          // console.log(rowFormChildren);
                          // THIRD FORM BUILDER OBJECT
                        }
                      );
                    // TITLE FORM BUILDER OBJECT CHILDREN
                    // console.log(rowChildren);
                  }
                );
              // SECOND FORM BUILDER OBJECT
              // console.log(rowFormParent);
            });
          // TITLE FORM BUILDER OBJECT PARENT
          // console.log(rowParent);
        });
      // FIRST FORM BUILDER OBJECT
      // console.log(rowBuilder);
    });
  formBuilderFormat = formBuilderCheck;
  return formBuilderFormat;
};
