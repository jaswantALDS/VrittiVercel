import { store } from "@/store";
import Link from "next/link";
import Main from "./component/Main";
import { Provider } from "react-redux";
import Providers from "@/store/Providers";
export default async function Page() {
  return (
    <>
      <Providers>
        <Main />
      </Providers>
    </>
  );
}
