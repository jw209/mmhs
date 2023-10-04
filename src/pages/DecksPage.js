import { Layout } from 'antd';
import DeckList from '../components/DeckList'

function DecksPage() {
    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
            <DeckList />
        </Layout>
    )
}

export default DecksPage;