import { Layout, Card, Button, Typography, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'

const { Text } = Typography;

const myAPI = "podcasts"
const path = '/episodes'

function HomePage() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  //Function to fetch from our backend and update customers array
  function getEpisodes() {
    API.get(myAPI, path)
    .then(response => {
      setEpisodes(response)
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getEpisodes()
  }, [])

  const container = 
    episodes.map((episode, index) => (
      <Card  style={{marginBottom: '10px'}} key={index} title={episode.title}>
        <Text>
          {episode.content}
        </Text>
        <Text>
          Published on: {episode.date}
        </Text>
        <Button href={episode.link}>Go to RSS</Button>
      </Card>
    )
  )

  return (
    <Layout style={{ 
      flex: 1,
      padding: 48,
      maxHeight: '100%',
      overflow: 'auto',
    }}
    >
      <Spin spinning={loading}>
        {container}
      </Spin>
    </Layout>
  )
}

export default HomePage;