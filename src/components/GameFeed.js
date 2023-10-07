import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

const myAPI = 'gamesapi'
const path = '/games'

const GameFeed = ({loadingGameFeed}) => {
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => {
      setRawData(res)
      loadingGameFeed(false)
    })
  }, [loadingGameFeed])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, .2)',
        overflowY: 'auto',
        padding: '16px',
        zIndex: 1000,
      }}
    >
    {rawData ? (
      rawData.map((item, index) => (
        <p
          key={index}
          style={{
            backgroundColor: 'rgba(1.0, 1.0, 1.0, 0.8)',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '30px'
          }}
        >
          <span style={{
            color:'white'
          }}
          >
            {item.player} VS {item.opponent}
          </span>
          <br/><br/>
          <span 
            style={{
              display: 'inline-block'
            }}
            >
            {
            item.win ? 
            <span 
              style={{
                color:'green',
                fontWeight:'bold'
              }}
              >
                WIN
          </span> :
          <span 
            style={{
              color:'red',
              fontWeight:'bold'
            }}
            >
              LOSS
            </span>
            }
            <a 
              href="google.com" 
              style={{
                marginLeft: '10px'
              }}
              >
                Notes
              </a>
            <a 
              href="google.com" 
              style={{
                marginLeft: '10px'
              }}
              >
                Mulligan
              </a>
          </span>
        </p>
      ))
      ) : (
      <div />
    )} 
    </div>
  );
}

export default GameFeed;