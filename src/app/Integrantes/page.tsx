import './Integrantes.css'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import { Imagens, Photos } from '@/components/imgs'
import Image from 'next/image'

export default function Integrantes() {
  return (
    <Layout variant='relative-integrantes'>
      <section className='integrantes-main'>
        <article className='container-link-github'>
          <h1>MAVIDI-SOLUTIONS</h1>
          <a href="https://github.com/diego-cavalcantii/EcoGuide" target="blank">
            <Image src={Imagens.iconeGithub} alt="icone github" width={20} height={20} />
          </a>
        </article>
        <p>Integrantes</p>

        <article className='integrantes-element'>
          <div className='caixa-integrantes-element'>
            <Image src={Photos.imgDiego} alt="Foto diego" width={205} height={200} />
            <div>
              <p>Diego Cavalcanti <br /> RM - 553351</p>
            </div>
          </div>
          <div className='caixa-integrantes-element'>
            <Image src={Photos.imgMateus} alt="Foto Mateus" width={205} height={200} />
            <div>
              <p>Mateus Galeazi <br /> RM - 553352</p>
            </div>
          </div>
          <div className='caixa-integrantes-element'>
            <Image src={Photos.imgVitor} alt="Foto Vitor" width={205} height={200} />
            <div>
              <p>Vitor de Melo <br /> RM - 553483</p>
            </div>
          </div>
        </article>
        <article className='container-link-github'>
          <a href="https://github.com/diego-cavalcantii/EcoGuide" target="blank">
            Link do Repositorio do GitHub
          </a>
        </article>
      </section>
    </Layout>
  )
}
