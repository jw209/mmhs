import { Layout } from 'antd'
import React from 'react'
import GridOfCards from '../components/GridOfCards'

function DecksPage() {
  return (
    <Layout
      style={{
        flex: 1,
        padding: 24,
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      <GridOfCards />
    </Layout>
  )
}

export default DecksPage;