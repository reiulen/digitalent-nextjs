import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
	newTheme,
	clearErrors,
} from "../../../../redux/actions/pelatihan/theme.actions";
import { NEW_THEME_RESET } from "../../../../redux/types/pelatihan/theme.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";
import styles from "../../../../styles/pelatihanQuill.module.css";
import Cookies from "js-cookie";
import { useQuill } from "react-quilljs";

const AddTheme = ({ token }) => {
	const editorRef = useRef();
	const dispatch = useDispatch();
	const router = useRouter();
	const token_permission = Cookies.get("token_permission");

	const [editorLoaded, setEditorLoaded] = useState(false);
	const { CKEditor, ClassicEditor, Base64UploadAdapter } =
		editorRef.current || {};
	const { quill, quillRef } = useQuill();

	const { loading, error, success, theme } = useSelector(
		(state) => state.newTheme
	);
	const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
		(state) => state.drowpdownAkademi
	);

	const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
	const [, forceUpdate] = useState();

	const [name, setName] = useState("");
	const [academy, setAcademy] = useState("");
	const [description, setDescription] = useState("");

	const [status, setStatus] = useState();

	const optionsAkademi = dataAkademi.data;

	const optionsStatus = [
		{ value: "1", label: "Publish" },
		{ value: "0", label: "Unpublish" },
	];

	useEffect(() => {
		if (quill) {
			quill.on("text-change", (delta, oldDelta, source) => {
				setDescription(quill.root.innerHTML); // Get innerHTML using quill
			});
		}

		setEditorLoaded(true);

		if (success) {
			dispatch({
				type: NEW_THEME_RESET,
			});
			router.push({
				pathname: `/pelatihan/tema`,
				query: { success: true },
			});
		}
	}, [success, dispatch, router, quill]);

	const handleResetError = () => {
		if (error) {
			dispatch(clearErrors());
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (simpleValidator.current.allValid()) {
			// const statusString = (status.value += "");
			const data = {
				name,
				deskripsi: description,
				akademi_id: academy,
				status: status.value,
			};
			dispatch(newTheme(data, token, token_permission));
		} else {
			simpleValidator.current.showMessages();
			forceUpdate(1);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Isi data dengan benar !",
			});
		}
	};

	return (
		<PageWrapper>
			{error && (
				<div
					className="alert alert-custom alert-light-danger fade show mb-5"
					role="alert"
				>
					<div className="alert-icon">
						<i className="flaticon-warning"></i>
					</div>
					<div className="alert-text">{error}</div>
					<div className="alert-close">
						<button
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
							onClick={handleResetError}
						>
							<span aria-hidden="true">
								<i className="ki ki-close"></i>
							</span>
						</button>
					</div>
				</div>
			)}
			<div className="col-lg-12 order-1 px-0">
				{loading && <LoadingPage loading={loading} />}
				<div className="card card-custom card-stretch gutter-b">
					<div className="card-header mt-3">
						<h2
							className="card-title text-dark mt-2"
							style={{ fontSize: "24px" }}
						>
							Tambah Tema
						</h2>
					</div>

					<div className="card-body py-4">
						<form onSubmit={submitHandler}>
							<div className="form-group mb-4">
								<label className="col-form-label font-weight-bold">
									Akademi
								</label>
								<div className="position-relative" style={{ zIndex: "5" }}>
									<Select
										placeholder="Silahkan Pilih Akademi"
										options={optionsAkademi}
										defaultValue={academy}
										onChange={(e) => setAcademy(e.value)}
										onBlur={() =>
											simpleValidator.current.showMessageFor("akademi")
										}
									/>
								</div>
								{simpleValidator.current.message(
									"akademi",
									academy,
									"required",
									{ className: "text-danger" }
								)}
							</div>
							<div className="form-group mb-4">
								<label className="col-form-label font-weight-bold">
									Nama Tema
								</label>
								<input
									type="text"
									placeholder="Silahkan Masukan Nama Tema"
									className="form-control"
									value={name}
									onChange={(e) => setName(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama tema")
									}
								/>
								{simpleValidator.current.message(
									"nama tema",
									name,
									"required|max:100",
									{ className: "text-danger" }
								)}
							</div>

							<div className={`${styles.setQuil} form-group`}>
								<label className="col-form-label font-weight-bold">
									Deskripsi
								</label>
								<div className="ckeditor">
									{editorLoaded ? (
										<div style={{ width: "100%", height: "250px" }}>
											<div
												ref={quillRef}
												style={{ fontFamily: "Poppins" }}
											/>
										</div>
									) : (
										<p>Tunggu Sebentar</p>
									)}
									{simpleValidator.current.message(
										"deskripsi",
										description,
										"required",
										{ className: "text-danger" }
									)}
								</div>
							</div>

							<div className="form-group">
								<label className="col-form-label font-weight-bold">
									Status
								</label>
								<Select
									placeholder="Silahkan Pilih Status"
									options={optionsStatus}
									defaultValue={status}
									onChange={(e) =>
										setStatus({ value: e.value, label: e.label })
									}
									onBlur={() =>
										simpleValidator.current.showMessageFor("status")
									}
								/>
								{simpleValidator.current.message("status", status, "required", {
									className: "text-danger",
								})}
							</div>

							<div className="form-group">
								<div className="text-right">
									<button
										className="btn btn-light-ghost-rounded-full mr-2"
										type="button"
										onClick={() => router.back()}
									>
										Batal
									</button>
									<button
										className="btn btn-primary-rounded-full"
										type="submit"
									>
										Simpan
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default AddTheme;
