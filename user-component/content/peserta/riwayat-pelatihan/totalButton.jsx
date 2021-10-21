import react from "react";

export default totalButton = () => {
  if (props.totalButton == 2) {
    return (
      <Fragment>
        <Col md={6}>
          <Button
            variant="primary"
            className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
            size="sm"
          >
            <i className="ri-download-cloud-2-fill mr-2"></i>
            Download Bukti Pendaftaran
          </Button>
        </Col>
        <Col md={6}>
          <Button
            variant="primary"
            className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
            size="sm"
          >
            <i className="ri-download-cloud-2-fill mr-2"></i>
            Download Bukti Pendaftaran
          </Button>
        </Col>
      </Fragment>
    );
  }
};
