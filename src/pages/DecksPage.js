import { Layout, Spin } from 'antd';
import DeckList from '../components/DeckList'
import React, { useState } from 'react'
function DecksPage() {
  const [loadingDeckLists, setLoadingDeckLists] = useState(true);

  const handleLoadingStateChangeList = (updatedState) => {
    setLoadingDeckLists(updatedState)
  }

  return (
    <Spin 
      style={{
        position: 'absolute',
        top: '40vh'
      }}
      spinning={loadingDeckLists}
    >
      <Layout 
        style={{ 
          flex: 1,
          padding: 24,
          maxHeight: '100%',
          overflow: 'auto',
      }}
      >
        <DeckList 
          loadingDeckLists={handleLoadingStateChangeList}
        />
      </Layout>
    </Spin>
  )
}

export default DecksPage;