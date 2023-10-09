import { Layout, Spin } from 'antd';
import DeckList from '../components/DeckList'
import React, { useState } from 'react'

const myAPI = 'cardsapi'
const path = '/cardsapi'

function DecksPage() {
  const [loadingDeckLists, setLoadingDeckLists] = useState(true);
  const [cards, setCards] = useState({})

  function getCards() {
    API.get(myAPI, path)
    .then(response => {
      setEpisodes(response)
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  

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