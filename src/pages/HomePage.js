import { Card, Layout } from 'antd';
import { useState, useEffect } from 'react';

function HomePage() {
    async function fetchPodcasts() {
        try {
            const response = await fetch('YOUR_API_ENDPOINT_URL');
            if (!response.ok) {
                throw new Error('Failed to fetch podcasts');
            }
    
            const data = await response.json();
            // Handle the podcast data, e.g., display it on your page.
            console.log(data);
        } catch (error) {
            console.error(error);
            // Handle errors gracefully.
        }
    }
    
    // Call the function when your page loads or as needed.
    useEffect(() => {
        fetchPodcasts();
    }, []);

    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
            {items.map((item) => (
                <Card key={item.id} title={item.title}>
                    {item.id}
                </Card>
            ))}
        </Layout>
    )
}

export default HomePage;