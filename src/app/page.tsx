'use client'
import Header from '@/components/Header/Header';
import WhyDiscard from '@/components/WhyDiscard/WhyDiscard';
import HowDiscard from '@/components/HowDiscard/HowDiscard';
import CollectionPoints from '@/components/CollectionPoints/CollectionPoints';
import Footer from '@/components/Footer/Footer';
import RouteAddCollects from '@/components/RouteAddCollects/RouteAddCollects';
import '../styles/Home.css'





export default function Home() {


  return (
    <>
      <div className="bg-blue" >
        <Header variant='text-white' />
        <div className="title-main">
          <h1>Salve os oceanos reciclando seu lixo</h1>
        </div>
      </div>
      <main className='main-home'>
        <WhyDiscard />
        <HowDiscard />
        <CollectionPoints />
      </main>
      <section className="container-add-collection">
        <h2>Existe algum ponto de coleta que não esteja aqui ? <br />
          Adicione no botão abaixo</h2>
        <RouteAddCollects>Adicionar ponto de coleta</RouteAddCollects>
      </section>
      <Footer />
    </>

  );
}
