import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { Layout, Spin, Image, Row, Col, Divider } from 'antd'
import axios from 'axios'

const myAPI = 'decksapi'
const path = '/decks'
const blizzApiPath = 'https://us.api.blizzard.com/hearthstone/deck?locale=en_US&code='

function GridOfCards() {
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
      await axios.get(blizzApiPath + ouiouimanCode + '&access_token=571fa778ba04416b8d5db578dbb88c58')
      .then(res => {
        console.log(res.data)
        setOuiouiman(res.data)
      })
      .catch(error => {
        console.error(error)
      })
    }

    if (privatemercCode.length > 0) {
      await axios.get(blizzApiPath + privatemercCode + '&access_token=571fa778ba04416b8d5db578dbb88c58')
      .then(res => {
        setPrivatemerc(res.data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  useEffect(() => {
    getDeckLists(
      encodeURIComponent(ouiouimanCode),
      encodeURIComponent(privatemercCode)
    );
  }, [ouiouimanCode, privatemercCode])

  getDeckCodes()

  return (
    <Layout
      style={{
        flex: 1,
        padding: 24,
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
    <h1> Ouiouiman's Deck: </h1> 
    {ouiouiman.cards.length > 0 ? (
      <Row gutter={[10, 10]}>
        {renderCards(ouiouiman.cards)}
      </Row>
    ) : (
      <Spin size="large" />
    )}
    <Divider />
    <h1> Privatemerc's Deck: </h1>
    {privatemerc.cards.length > 0 ? (
      <Row gutter={[10, 10]}>
        {renderCards(privatemerc.cards)}
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

export default GridOfCards;