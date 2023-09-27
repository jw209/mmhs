import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { API } from 'aws-amplify';

const myAPI = "podcasts";
const path = '/episodes';

function HomePage() {
    //Function to fetch from our backend and update customers array
    function getStuff() {
        API.get(myAPI, path)
        .then(response => {
            console.log(response)
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
        </Layout>
    )
}

export default HomePage;