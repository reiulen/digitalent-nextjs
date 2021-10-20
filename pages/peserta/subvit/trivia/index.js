import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const Tombol = () => {
  const router = useRouter();
  const handlePage = () => {
    router.push(`${router.pathname}/1`);
  };
  return <Button onClick={handlePage}>Test</Button>;
};
export default Tombol;
