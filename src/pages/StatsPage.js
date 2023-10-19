import LineChart from '../components/LineChart'
import React, { useState, useEffect } from 'react'
import GameFeed from '../components/GameFeed'
import { API } from 'aws-amplify'
import './pageStyles.css'

function StatsPage() {
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [gameData, setGameData] = useState([])
  const [ouiouimanWins, setOuiouimanWins] = useState(0)
  const [ouiouimanLosses, setOuiouimanLosses] = useState(0)
  const [privatemercWins, setPrivatemercWins] = useState(0)
  const [privatemercLosses, setPrivatemercLosses] = useState(0)

  // get raw data from db
  useEffect(() => {
    API.get('gamesapi', '/games')
    .then((res) => {
      setGameData(res)
      const oui = res.filter(obj => obj.player === 'Ouiouiman')
      const priv = res.filter(obj => obj.player === 'Privatemerc')
      
      let numWins = 0, numLosses = 0
      for (let i = 0; i < oui.length; i++) {
        if (oui[i].win === true) numWins++
        else numLosses++
      }
      setOuiouimanWins(numWins)
      setOuiouimanLosses(numLosses)
      numWins = 0
      numLosses = 0
      
      for (let i = 0; i < priv.length; i++) {
        if (priv[i].win === true) numWins++
        else numLosses++
      }
      setPrivatemercWins(numWins)
      setPrivatemercLosses(numLosses)
      setDataRetrieved(true)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return (
      <div>
      {
        !dataRetrieved
        ? <div className='loader'>
            <div className='lds-dual-ring' />
          </div>
        : <div> 
            <LineChart data={gameData}/>
            <GameFeed data={gameData}/>
            <h1>Ouiouiman wins: {ouiouimanWins}</h1>
            <h1>Ouiouiman losses: {ouiouimanLosses}</h1>
            <h1>Ouiouiman winrate: {((ouiouimanWins / (ouiouimanWins+ouiouimanLosses)) * 100).toFixed(2) + '%'}</h1>
            <br/>
            <h1>Privatemerc wins: {privatemercWins}</h1>
            <h1>Privatemerc losses: {privatemercLosses}</h1>
            <h1>Privatemerc winrate: {((privatemercWins / (privatemercWins+privatemercLosses)) * 100).toFixed(2) + '%'}</h1>
          </div>
      }
      </div>
  )
}

export default StatsPage;
