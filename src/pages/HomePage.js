import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import './pageStyles.css'
import rssIcon from '../rss-round-color-icon.png';

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
    <div className='Episode'>
    {
      loadingEpisodeFeed
      ? <div className='loader'>
          <div className='lds-dual-ring' />
        </div>
      : 
        episodes.map((episode, index) => (
        <div key={index}>
          <div className='Episode-card'>
            <h1 className='card-heading'>{episode.title}</h1>
            <p className='card-content'>{episode.content.replace(/<\/?p>/g, '')}</p>
            <p className='card-footer'>Published on: {episode.date}</p>
            <a href={episode.link}><img className='rss-icon' src={rssIcon} alt="My SVG"/></a>
          </div>
        </div>
      ))
    }
    </div>
  )
}

export default HomePage;