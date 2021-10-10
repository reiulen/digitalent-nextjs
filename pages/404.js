import { useEffect } from "react";
import { Router, useRouter } from "next/router";
export default function Custom404() {

  const router = useRouter();
  
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
<<<<<<< HEAD
  });

=======
  }, [router]);
>>>>>>> 0b852c184be3041043c06ea5705c470f02399385
  return (
    <div>
      <h1>Oooooo....</h1>
      <h1>Halaman yang anda cari tidak ditemukan</h1>
    </div>
  );
}
