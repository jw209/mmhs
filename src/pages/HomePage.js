import { Layout, Card, Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

const { Text } = Typography;

const myAPI = "podcasts";
const path = '/episodes';

function HomePage() {
    const [episodes, setEpisodes] = useState([]);

    //Function to fetch from our backend and update customers array
    function getStuff() {
        API.get(myAPI, path)
        .then(response => {
            console.log(response)
            setEpisodes(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getStuff();
    }, [])

    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
            {episodes.map((episode, index) => (
                <Card key={index} title={episode.title}>
                    <Text>{episode.date}</Text>
                    <Button href={episode.link}>Go to episode</Button>
                </Card>
            ))}
        </Layout>
    )
}

export default HomePage;