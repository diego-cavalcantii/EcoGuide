'use client'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../styles/Home.css'
import SectionWhyDiscard from '@/components/SectionWhyDiscard/SectionWhyDiscard';
import SectionHowDiscard from '@/components/SectionHowDiscard/SectionHowDiscard';





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
        <SectionWhyDiscard />
        <SectionHowDiscard />
      </main>

      <Footer />
    </>

  );
}
