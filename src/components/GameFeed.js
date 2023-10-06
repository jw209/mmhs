import { Button } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

const myAPI = 'gamesapi'
const path = '/games'

const GameFeed = ({loadingGameFeed}) => {
  const [rawData, setRawData] = useState(null);
  const [feedVisibility, setFeedVisibility] = useState(false);

  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => {
      setRawData(res)
      loadingGameFeed(false)
    })
  }, [loadingGameFeed])

  return (
    <div>
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .2)', /* Transparent background color */
        overflowY: 'auto', /* Enable vertical scrolling */
        padding: '16px',
        zIndex: 1000, /* Ensure the overlay appears above other content */
        visibility: feedVisibility ? 'visible' : 'hidden'
      }}
    >
    {rawData ? (
      rawData.map((item, index) => (
        <p
          key={index}
          style={{
            backgroundColor: 'rgba(1.0, 1.0, 1.0, 0.3)',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '30px'
          }}
        >
          <span style={{color:'white'}}>{item.player} VS {item.opponent}</span>
          <br /><br />
          <div style={{display: 'inline-block'}}>
            {item.win ? <span style={{color:'green', fontWeight:'bold'}}>WIN</span> 
              : <span style={{color:'red', fontWeight:'bold'}}>LOSS</span>  }
            <Button style={{marginLeft: '10px'}}>Notes</Button>
            <Button style={{marginLeft: '10px'}}>Mulligan</Button>
          </div>
        </p>
      ))
      ) : (
      <div />
    )} 
    </div>
    <Button 
      style={{
        position: 'fixed',
        top: '45vh',
        right: feedVisibility ? '20%' : '2%',
        zIndex: 1000, /* Ensure the overlay appears above other content */
        transition: 'right 0.3s ease'
      }}
      type="dashed"
      onClick={() => {setFeedVisibility(!feedVisibility)}}>
      {feedVisibility ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
    </Button>
    </div>
  );
}

export default GameFeed;