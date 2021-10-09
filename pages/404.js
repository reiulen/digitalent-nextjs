import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, []);
  return (
    <div>
      <h1>Oooooo....</h1>
      <h1>Halaman yang anda cari tidak ditemukan</h1>
    </div>
  );
}
