import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
const { Text } = Typography;

const myAPI = 'gamesapi'
const path = '/games'

const GameFeed = () => {
    const [rawData, setRawData] = useState(null);

    useEffect(() => {
        API.get(myAPI, path)
        .then((res) => {
            const rawObjects = res.map((item) => {
                return item
            })

            setRawData(rawObjects)
        })
    }, [])

   return (
    <div>
    {rawData ? (
        rawData.map((item, index) => (
            <Card
            key={index}
            style={{
                minWidth: '70%',
                minHeight: '20%',
                borderRadius: '40px',
                boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 1.0)',
            }}
            >
            <Text>
                <h5>{item.win ? 'win' : 'loss'}</h5>
                <h5>{item.opponent}</h5>
                <h5>{item.player}</h5>
                <h5>{item.mulligan}</h5>
                <h5>{item.notes}</h5>
                <h5>{item.turns}</h5>
            </Text>
            </Card>
        ))
        ) : (
        <p>Loading...</p>
        )}
    </div>
   );
}

export default GameFeed;