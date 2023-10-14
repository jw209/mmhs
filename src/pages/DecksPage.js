import React, {useState, useEffect} from 'react'
import { API } from 'aws-amplify'
import DeckList from '../components/DeckList'
import './pageStyles.css'

function DecksPage() {
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [deckData, setDeckData] = useState([])

  useEffect(() => {
    API.get('decksapi', '/decks')
    .then((res) => {
      setDeckData(res)
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
      ? <div className='center-loader'>
          <div className='lds-dual-ring' />
        </div>
      : <div> 
          <DeckList data={deckData} />
        </div>
    }
    </div>
  )
}

export default DecksPage;