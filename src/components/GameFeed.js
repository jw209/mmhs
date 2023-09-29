import { Card, Typography } from 'antd';
const { Text } = Typography;

const GameFeed = () => {

    return (
        <Card style={{
            minWidth: '70%',
            minHeight: '20%',
            borderRadius: '40px',
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 1.0)"
        }}>
            <Text>No data</Text>
        </Card>
    )
}

export default GameFeed;