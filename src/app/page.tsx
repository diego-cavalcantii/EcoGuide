import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import '../styles/Home.css'
import Discard from "@/components/Discard/Discard";

export default function Home() {
  return (
    <>
      <div className="bg-blue">
        <Header />
        <div className="title-main">
          <h1>Salve o Planeta reciclando seu lixo</h1>
        </div>
      </div>
      <main>
        <Discard />



      </main>
    </>

  );
}
