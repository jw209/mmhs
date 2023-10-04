import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import {
  HomeOutlined,
  LineChartOutlined,
  ExperimentOutlined,
  CopyrightOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { Outlet, Link, useLocation } from 'react-router-dom'

const { Content, Footer } = Layout
const { Text } = Typography

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
    key: '/decks',
    label: <Link to='/decks'>Decks</Link>,
    icon: <ExperimentOutlined />
  },
  {
    key: '/admintools',
    label: <Link to='/admintools'>Admin Tools</Link>,
    icon: <UploadOutlined />
  }
]
//{signOut, user}
//const userGroup = user.signInUserSession.idToken.payload['cognito:groups'][0];
function App() {
  const location = useLocation();

  return (
    <Layout style={{height: '100vh', width: '100vw'}}>
      <Layout>
        <Menu selectedKeys={[location.pathname]} mode="horizontal" items={menuItems} />
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <Text>
            Matchup Mashup <CopyrightOutlined /> 2023
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App
