import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import './pageStyles.css'

function HomePage() {
  const [loadingEpisodeFeed, setLoadingEpisodeFeed] = useState(true);
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    API.get('podcasts', '/episodes')
    .then(response => {
      setEpisodes(response)
      setLoadingEpisodeFeed(false)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div>
    {
      loadingEpisodeFeed
      ? <div className='center-loader'>
          <div className='lds-dual-ring' />
        </div>
      : episodes.map((episode, index) => (
        <div className='Episode-card' key={index}>
          <h1 className='card-heading'>{episode.title}</h1>
          <p className='card-content'>{episode.content.replace(/<\/?p>/g, '')}</p>
          <p className='card-footer'>Published on: {episode.date}</p>
          <a className='card-footer' href={episode.link}>Go to RSS</a>
        </div>
      ))
    }
    </div>
  )
}

export default HomePage;