import { Layout } from 'antd';
import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

const myAPI = "episodes";
const path = "/episodes"; 

function HomePage() {
    const [episodes, setEpisodes] = useState([])

    //Function to fetch from our backend and update customers array
    function getEpisodes() {
        API.get(myAPI, path + "/" + "episode")
        .then(response => {
            console.log(response)
            let newEpisodes = [...episodes]
            newEpisodes.push(response)
            setEpisodes(newEpisodes)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getEpisodes()
    }, [])

    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
        </Layout>
    )
}

export default HomePage;