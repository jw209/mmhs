import React, { useState, useEffect } from 'react'
import { CopyOutlined, CheckCircleOutlined } from '@ant-design/icons';

function DeckList(props) {
  const data = props.data;
  const [ouiouimanData, setOuiouimanData] = useState(null)
  const [privatemercData, setPrivatemercData] = useState(null)
  const [opacities, setOpacities] = useState({});

  useEffect(() => {
    setOuiouimanData(data.filter(obj => obj.player === 'Ouiouiman'))
    setPrivatemercData(data.filter(obj => obj.player === 'Privatemerc'))
  }, [data])

  const waitToResetCopyConfirm = async () => {
    // Wait for one second (1000 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div>
      { 
      ouiouimanData && privatemercData ?
      <div>
        <h1>Ouiouiman's Deck: </h1>
        {ouiouimanData.map((item, index) => (
          <div key={index}>
            <h5 style={{fontSize: '50px', marginBottom: -2, marginTop: -5}}>{item.deckName}</h5>
              <CopyOutlined onClick={() => {
                navigator.clipboard.writeText(item.deckCode);
                const updatedOpacities = { ...opacities };
                updatedOpacities[index] = 1;
                setOpacities(updatedOpacities);
                waitToResetCopyConfirm();
                waitToResetCopyConfirm().then(() => {
                  const updatedOpacities = { ...opacities };
                  updatedOpacities[index] = 0;
                  setOpacities(updatedOpacities);
                })
              }} />
            <CheckCircleOutlined className='confirmation-check' style={{opacity: opacities[index] || 0}}/>
            <h5>{item.deckCode}</h5>
            <h5>{item.notes}</h5>
          </div>
        ))}
        <h1>PrivateMerc's Deck: </h1>
        {privatemercData.map((item, index) => (
          <div key={index}>
            <h5>{item.deckCode}</h5>
            <CopyOutlined onClick={() => {
                navigator.clipboard.writeText(item.deckCode);
                const updatedOpacities = { ...opacities };
                updatedOpacities[index] = 1;
                setOpacities(updatedOpacities);
                waitToResetCopyConfirm();
                waitToResetCopyConfirm().then(() => {
                  const updatedOpacities = { ...opacities };
                  updatedOpacities[index] = 0;
                  setOpacities(updatedOpacities);
                })
              }} />
            <CheckCircleOutlined style={{opacity: opacities[index] || 0, transition: 'opacity 0.3s ease-in-out'}}/>
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