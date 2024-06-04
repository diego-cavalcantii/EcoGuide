import CollectionPoints from '@/components/CollectionPoints/CollectionPoints'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import RouteAddCollects from '@/components/Button/Button'

export default function CollectPoints() {
  return (
    <Layout>
      <CollectionPoints />
      <section className="container-add-collection">
        <h2>Existe algum ponto de coleta que não esteja aqui ? <br />
          Adicione no botão abaixo</h2>
        <RouteAddCollects>Adicionar ponto de coleta</RouteAddCollects>
      </section>
    </Layout>
  )
}
