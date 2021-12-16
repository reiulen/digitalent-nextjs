import { Router, useRouter } from "next/router";

function Error({ statusCode }) {
  const router = useRouter();
  return (
    <>
      {/* <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "Mungkin Anda tersesat."}
      </p> */}
      <div className="not-found-page">
        <div className="center-absolute">
          {/* <Image
            src="/assets/media/image-404.png"
            width={700}
            height={500}
            objectFit="cover"
            alt="image-404"
          /> */}
          <div className="text-center">
            <h1 className="font-weight-bolder">
              {statusCode} Mohon maaf saat ini terjadi gangguan, silahkan
              kembali
            </h1>
            <button
              className="btn btn-primary rounded-xl font-weight-bolder text-center mt-2"
              onClick={() => router.back()}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
