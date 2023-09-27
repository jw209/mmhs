import React from 'react';
import { 
  Layout, 
  Menu, 
  Switch, 
  Typography 
} from 'antd';
import {
  HomeOutlined,
  LineChartOutlined,
  MergeCellsOutlined,
  ExperimentOutlined,
  CopyrightOutlined
} from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';

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

function App() {
  const location = useLocation();

  return (
    <Layout style={{ maxHeight: '95vh', minHeight: '95vh', overflow: 'hidden', borderRadius: '10px' }}>
      <Sider theme="dark">
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={[location.pathname]} items={menuItems} />
        <Switch style={{ position: 'absolute', bottom: '16px', left: '16px' }} defaultChecked />
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Text style={{ marginLeft: '20px', fontSize: '24px', color: '#fff' }}>
            Matchup Mashup
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

export default App;