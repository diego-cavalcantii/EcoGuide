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
        <Header />
        <div className="title-main">
          <h1>Salve os <span style={{ color: 'cornflowerblue' }}>oceanos</span> reciclando seu <span style={{ color: '#32CD32' }}>lixo!</span></h1>
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
