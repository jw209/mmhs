import { Layout, Spin } from 'antd'
import DeckList from '../components/DeckList'
import React, { useState } from 'react'
import { API } from 'aws-amplify'

const myAPI = 'cardsapi'
const path = '/cardsapi'
const deckCode = 'AAECAR8GsJIF+ZIF8/IF1/kFqZUGrp4GDMDTBKeQBaqkBejoBd/tBeryBeT1Bcj2Bcr2BdL4Bfz4BcKaBgAA'

function DecksPage() {
  const [loadingDeckLists, setLoadingDeckLists] = useState(true)
  const [cards, setCards] = useState({})

  const apiUrl = `/cardsapi?deckCode=${encodeURIComponent(deckCode)}`

  function getCards() {
    API.get(myAPI, apiUrl)
    .then(response => {
      setCards(response)
      console.log(response)
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