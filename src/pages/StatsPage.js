import LineChart from '../components/LineChart'
import React, { useState, useEffect } from 'react'
import GameFeed from '../components/GameFeed'
import { API } from 'aws-amplify'
import './pageStyles.css'

function StatsPage() {
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [gameData, setGameData] = useState([])

  // get raw data from db
  useEffect(() => {
    API.get('gamesapi', '/games')
    .then((res) => {
      setGameData(res)
      setDataRetrieved(true);
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return (
      <div>
      {
        !dataRetrieved
        ? <div className='center-loader'>
            <div className='lds-dual-ring' />
          </div>
        : <div> 
            <LineChart data={gameData}/>
            <GameFeed data={gameData}/>
          </div>
      }
      </div>
  )
}

export default StatsPage;
