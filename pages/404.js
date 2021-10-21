import { useEffect } from "react";
import { Router, useRouter } from "next/router";
export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  });

  return (
    <div className="not-found-page">
      <h1 className="center-absolute" style={{ fontSize: "" }}>
        Halaman yang anda cari tidak ditemukan !! ....
      </h1>
    </div>
  );
}
