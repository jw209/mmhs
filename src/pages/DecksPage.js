import { Layout, Spin, Image, Row, Col, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import axios from 'axios'

const myAPI = 'decksapi'
const path = '/decks'

function DecksPage() {
  const [ouiouiDeckCode, setOuiouiDeckCode] = useState('')
  const [privDeckCode, setPrivDeckCode] = useState('')
  const [deckOuiouiman, setDeckOuiouiman] = useState({ cards: [] })
  const [deckPrivatemerc, setDeckPrivatemerc] = useState({ cards: [] })

  const getDeckCodes = () => {
    API.get(myAPI, path)
    .then((res) => {
      const ouioui = res.filter(obj => obj.player === 'Ouiouiman')
      const priv = res.filter(obj => obj.player === 'Privatemerc')
      if (ouioui[0] != null) setOuiouiDeckCode(ouioui[0].deckCode)
      if (priv[0] != null) setPrivDeckCode(priv[0].deckCode)
    })
  }


  const getCards = async (codeOui, codePriv) => {
    if (codeOui.length > 0) {
      await axios.get(`https://us.api.blizzard.com/hearthstone/deck?locale=en_US&code=${codeOui}&access_token=USPHSK748TUWRU5O0LE77WFD2xuI6N7X4H`)
        .then(res => {
        setDeckOuiouiman(res.data)
        })
        .catch(error => {
        console.error(error)
        })
    } 
     
    if (codePriv.length > 0) {
      await axios.get(`https://us.api.blizzard.com/hearthstone/deck?locale=en_US&code=${codePriv}&access_token=USPHSK748TUWRU5O0LE77WFD2xuI6N7X4H`)
        .then(res => {
        setDeckPrivatemerc(res.data)
        })
        .catch(error => {
        console.error(error)
        })
    }
  }

  useEffect(() => {
    const codeOui = encodeURIComponent(ouiouiDeckCode)
    const codePriv = encodeURIComponent(privDeckCode)
    getCards(codeOui, codePriv);
  }, [ouiouiDeckCode, privDeckCode])

  getDeckCodes();

  return (
    <Layout
      style={{
        flex: 1,
        padding: 24,
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      <h1> Ouiouiman's Deck: {deckOuiouiman.name}</h1> 
      {deckOuiouiman.cards.length > 0 ? (
        <Row gutter={[10, 10]}>
          {renderCards(deckOuiouiman.cards)}
        </Row>
      ) : (
        <Spin size="large" />
      )}
      <Divider />
      <h1> Privatemerc's Deck: {deckPrivatemerc.name} </h1>
      {deckPrivatemerc.cards.length > 0 ? (
        <Row gutter={[10, 10]}>
          {renderCards(deckPrivatemerc.cards)}
        </Row>
      ) : (
        <Spin size="large" />
      )}
    </Layout>
  )
}

function groupCardsByName(cards) {
  const groupedCards = {};

  cards.forEach((card) => {
    if (!groupedCards[card.name]) {
      groupedCards[card.name] = [];
    }
    groupedCards[card.name].push(card);
  });

  return Object.values(groupedCards);
}

function renderCards(cards) {
  const groupedCards = groupCardsByName(cards);

  return groupedCards.map((group, groupIndex) => (
    <Col key={groupIndex} xs={24} sm={12} md={8} lg={6} xl={4}>
      {group.map((card, cardIndex) => (
        <div
          key={cardIndex}
          style={{
            marginBottom: '10px',
            position: 'relative',
          }}
        >
          {cardIndex === 0 && (
            <Image
              src={card.image}
              alt={card.name}
              preview={true}
              width={200}
            />
          )}
          {cardIndex === 0 && group.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                fontWeight: 'bolder',
                color: '#000',
                padding: '2px 0',
                fontSize: '12px',
                borderRadius: '0 0 4px 4px'
              }}
            >
              x{group.length}
            </div>
          )}
        </div>
      ))}
    </Col>
  ));
}

export default DecksPage;