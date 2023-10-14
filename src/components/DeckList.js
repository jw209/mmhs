import React, { useState, useEffect } from 'react'

function DeckList(props) {
  const data = props.data;
  const [ouiouimanData, setOuiouimanData] = useState(null)
  const [privatemercData, setPrivatemercData] = useState(null)

  useEffect(() => {
    setOuiouimanData(data.filter(obj => obj.player === 'Ouiouiman'))
    setPrivatemercData(data.filter(obj => obj.player === 'Privatemerc'))
  }, [data])

  return (
    <div>
      { 
      ouiouimanData && privatemercData ?
      <div>
        <h1>Ouiouiman's Deck: </h1>
        {ouiouimanData.map((item, index) => (
          <div key={index}>
            <h5>{item.deckCode}</h5>
            <h5>{item.deckName}</h5>
            <h5>{item.notes}</h5>
          </div>
        ))}
        <h1>PrivateMerc's Deck: </h1>
        {privatemercData.map((item, index) => (
          <div key={index}>
            <h5>{item.deckCode}</h5>
            <h5>{item.deckName}</h5>
            <h5>{item.notes}</h5>
          </div>
        ))}
      </div> :
      <div />
      }
    </div>
  )
}

export default DeckList;