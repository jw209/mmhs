import { API } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'

const myAPI = 'decksapi'
const path = '/decks'

function DeckList() {
  const [ouiouimanData, setOuiouimanData] = useState(null)
  const [privatemercData, setPrivatemercData] = useState(null)

  useEffect(() => {
      API.get(myAPI, path)
      .then((res) => {
          const ouioui = res.filter(obj => obj.player === "Ouiouiman");
          const priv = res.filter(obj => obj.player === "Privatemerc");

          setOuiouimanData(ouioui)
          setPrivatemercData(priv)
      })
  }, [])

  return (
    <div>
    {ouiouimanData ? (
      <Layout>
      <h1>Ouiouiman's Deck: </h1>
      {ouiouimanData.map((item, index) => (
        <Layout key={index}>
          <h5>{item.deckCode}</h5>
          <h5>{item.deckName}</h5>
          <h5>{item.notes}</h5>
        </Layout>
      ))}
      </Layout>
    ) : (
      <p>Loading...</p>
    )}
    {privatemercData ? (
      <Layout>
      <h1>PrivateMerc's Deck: </h1>
      {privatemercData.map((item, index) => (
        <Layout key={index}>
          <h5>{item.deckCode}</h5>
          <h5>{item.deckName}</h5>
          <h5>{item.notes}</h5>
        </Layout>
      ))}
      </Layout>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}

export default DeckList;