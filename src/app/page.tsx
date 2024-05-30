import Header from '@/components/Header/Header';
import WhyDiscard from '@/components/WhyDiscard/WhyDiscard';
import HowDiscard from '@/components/HowDiscard/HowDiscard';
import CollectionPoints from '@/components/CollectionPoints/CollectionPoints';
import Footer from '@/components/Footer/Footer';
import '../styles/Home.css'



export default function Home() {
  return (
    <>
      <div className="bg-blue" >
        <Header />
        <div className="title-main">
          <h1>Salve os oceanos reciclando seu lixo</h1>
        </div>
        <main>
          <WhyDiscard />
          <HowDiscard />
          <CollectionPoints />
        </main>
        <section className="container-add-collection">
          <h2>Existe algum ponto de coleta que não esteja aqui ? <br />
            Adicione no botão abaixo</h2>
          <button className="add-collection">Adicionar ponto de coleta</button>
        </section>
        <Footer />
      </div>
    </>

  );
}
