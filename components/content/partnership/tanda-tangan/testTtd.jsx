import React, { useEffect } from "react";
import ReactImageAnnotate from "react-image-annotate";
const PDFJS = window.pdfjsLib;

const ReadPdf = ({ image, setImage }) => {
  const [pdf, setPdf] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");

  async function showPdf(event) {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument({ url: uri });
      setPdf(_PDF_DOC);
      setPdfRendering(false);
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
    }
  }

  function changePage() {
    setCurrentPage();
  }

  async function renderPage() {
    setPageRendering(true);

    var page = await pdf.getPage(currentPage);

    var viewport = page.getViewport(currentPage);

    var render_context = {
      canvasContext: document.querySelector("#pdf-canvas").getContext("2d"),
      viewport: viewport
    };
    console.log("viewport", viewport);
    setWidth(viewport.width);
    setHeight(viewport.height);
    await page.render(render_context);

    var canvas = document.getElementById("pdf-canvas");
    var img = canvas.toDataURL("image/png");
    setImage(img);
    setPageRendering(false);
  }

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf, currentPage]);

  return (
    <div className="App">
      <button
        style={{ padding: "8px 36px" }}
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        {/* <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div> */}
        {/* <div id="page-count-container">
          Page {currentPage} of <div id="pdf-total-pages">{totalPages}</div>
        </div> */}
        <div id="pdf-contents">
          {/* <div id="pdf-meta">
            <div id="pdf-buttons">
              <button id="pdf-prev" onClick={() => changePage(currentPage - 1)}>
                Previous
              </button>
              <button id="pdf-next" onClick={() => changePage(currentPage + 1)}>
                Next
              </button>
            </div>
          </div> */}
          <div id="image-convas-row">
            <canvas
              style={{ display: "none" }}
              id="pdf-canvas"
              width={width}
              height={height}
            ></canvas>
            {/* {image && (
              <img
                id="image-generated"
                src={image}
                alt="pdfImage"
                style={{ width: width, height: height }}
              />
            )} */}
          </div>
          {/* <div id="page-loader" hidden={!pageRendering}>
            Loading page ...
          </div> */}
        </div>
      </div>
    </div>
  );
};

const ImageAnnotate = ({ image }) => {
  const annotateProps = {
    labelImages: true,
    regionClsList: ["Alpha", "Beta", "Charlie", "Delta"],
    regionTagList: ["tag1", "tag2", "tag3"],
    images: [
      {
        src: image,
        name: "Image 1",
        regions: []
      }
    ],
    tag: true,
    enabledTools: ["create-box"],
    allowComments: true
  };

  return <ReactImageAnnotate {...annotateProps} />;
};

export default function App() {
  const [image, setImage] = React.useState();

  return (
    <>
      <h1> Please select pdf from you computer: </h1>
      {image ? (
        <ImageAnnotate image={image} />
      ) : (
        <ReadPdf image={image} setImage={setImage} />
      )}
    </>
  );
}
