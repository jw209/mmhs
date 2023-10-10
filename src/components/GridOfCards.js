import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const myAPI = 'decksapi'
const path = '/decks'
const blizzApiPath = 'https://us.api.blizzard.com/hearthstone/deck?locale=en_US&code='
const accessTokenPrefix = '&access_token='

function DecksPage() {
  const [ouiouimanCode, setOuiouimanCode] = useState('')
  const [privatemercCode, setPrivatemercCode] = useState('')
  const [privatemerc, setPrivatemerc] = useState({ cards: [] })
  const [ouiouiman, setOuiouiman] = useState({ cards: [] })

  const getDeckCodes = () => {
    API.get(myAPI, path)
    .then((res) => {
      const ouiouimanObj = res.filter(obj => obj.player === 'Ouiouiman')
      const privatemercObj = res.filter(obj => obj.player === 'Privatemerc')
      if (ouiouimanObj[0] != null) setOuiouimanCode(ouiouimanObj[0].deckCode)
      if (privatemercObj[0] != null) setPrivatemercCode(privatemercObj[0].deckCode)
    })
  }

  const getDeckLists = async (ouiouimanCode, privatemercCode) => {
    if (ouiouimanCode.length > 0) {
      await axios.get(blizzApiPath + codeOui + access_token + accessTokenPrefix)
      .then(res => {
        setOuiouiman(res.data)
      })
      .catch(error => {
        console.error(error)
      })
    }

    if (privatemercCode.length > 0) {
      await axios.get(`https://us.api.blizzard.com/hearthstone/deck?locale=en_US&code=${codeOui}&access_token=USPHSK748TUWRU5O0LE77WFD2xuI6N7X4H`)
      .then(res => {
        setOuiouiman(res.data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

return (
<Layout>

</Layout>
)
}