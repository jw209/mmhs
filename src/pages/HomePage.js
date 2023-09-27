import { Card, Layout } from 'antd';
import { useState, useEffect } from 'react';

function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((posts) => {
                setItems(posts);
        })
        .catch((err) => console.error(err));
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