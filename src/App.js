import React from 'react';
import { 
  Layout, 
  Menu,  
  Typography,
  Button
} from 'antd';
import {
  HomeOutlined,
  LineChartOutlined,
  MergeCellsOutlined,
  ExperimentOutlined,
  CopyrightOutlined
} from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import styles from '@aws-amplify/ui-react/styles.css';

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: '/',
    label: <Link to='/'>Home</Link>,
    icon: <HomeOutlined />
  },
  {
    key: '/stats',
    label: <Link to='/stats'>Weekly Statistics</Link>,
    icon: <LineChartOutlined />
  },
  {
    key: '/deckdiscussions',
    label: <Link to='/deckdiscussions'>Deck Discussions</Link>,
    icon: <MergeCellsOutlined />
  },
  {
    key: '/forum',
    label: <Link to='/forum'>Forum</Link>,
    icon: <ExperimentOutlined />
  }
]

function App({signOut, user}) {
  const location = useLocation();

  return (
    <Layout style={{ maxHeight: '100vh', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={styles.container} />
      <Sider theme="dark">
        <Menu style={{
          paddingTop: 10
        }} theme="dark" mode="vertical" defaultSelectedKeys={[location.pathname]} items={menuItems} />
        <Button style={{ position: 'absolute', bottom: '16px', left: '16px' }} onClick={signOut}>Sign out</Button>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Text style={{ marginLeft: '20px', fontSize: '24px', fontWeight:'bold', color: '#fff' }}>
            Matchup Mashup HS
          </Text>
        </Header>
        <Content style={{ marginBottom: '32px', borderRadius: '20px' }}>
            {<Outlet />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Matchup Mashup <CopyrightOutlined /> 2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default withAuthenticator(App);
