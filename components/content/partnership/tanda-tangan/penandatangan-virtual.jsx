import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import Image from "next/image";
// import useDraggable from "./useDraggable";
import { useDropzone } from "react-dropzone";
import {
  fetchOptionTtdAdmin,
  fetchTtdPartner,
} from "../../../../redux/actions/partnership/tandaTangan.actions";


// 

// import React from "react";
import { PDFtoIMG } from "react-pdf-to-image";
import file from "../../../../components/assets/pad.pdf";

// 
const listStyle = {
  padding: "0",
  listStyle: "none",
};

const wrapperBox = {
  boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
  borderRadius: "10px",
  maxWidth: "80%",
  height: "max-content",
  padding: "2rem 0",
};

const DraggableCard = () => {
  const cardRef = useRef(null);
  useDraggable(cardRef);

  return <div className="cardss" ref={cardRef}></div>;
};

export default function PenandatanganVirtual({ token }) {
  const [ttdAdmin, setTtdAdmin] = useState("");
  const [tempTtdAdmin, setTempTtdAdmin] = useState("");

  const [ttdMitra, setTtdMitra] = useState("");
  const [tempTtdMitra, setTempTtdMitra] = useState("");

  // pertama set dulu terus show lewat btn sisipkan
  const choiceTtdAdmin = (e) => {
    setTempTtdAdmin(e.target.value);
  };
  const showTtd = () => {
    setTtdAdmin(tempTtdAdmin);
  };

  const choiceTtdMitra = (e) => {
    setTempTtdMitra(e.target.value);
  };
  const showTtdMitra = () => {
    setTtdMitra(tempTtdMitra);
  };

  const cardRef = useRef(null);
  useDraggable(cardRef);

  const cardRef2 = useRef(null);
  useDraggable(cardRef2);
  const router = useRouter();
  const dispatch = useDispatch();
  const allTandaTangan = useSelector((state) => state.allTandaTangan);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div className="h-100 w-100" key={file.name}>
      <iframe
        className="w-100"
        style={{ border: "1px solid black", minHeight: "100vh" }}
        src={file.preview}
      ></iframe>
    </div>
  ));

  useEffect(() => {
    dispatch(fetchOptionTtdAdmin(token));
    dispatch(fetchTtdPartner(token, router.query.id));
  }, [dispatch, router.query.id, token]);

  return (
    <PageWrapper>
      <PDFtoIMG file={file}>
      {({ pages }) => {
        if (!pages.length) return "Loading...";
        return pages.map((page, index) => <img key={index} src={page} />);
      }}
    </PDFtoIMG>
    </PageWrapper>
  );
}







// const TestD = () => (
//   <div>
    
//   </div>
// );

// export default TestD;
