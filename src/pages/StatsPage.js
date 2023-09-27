import { Layout } from 'antd';
import LineChart from '../components/LineChart';

function StatsPage() {
    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
            <LineChart />
        </Layout>
    )
}

export default StatsPage;