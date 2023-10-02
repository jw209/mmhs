import React, { useState } from 'react'
import { 
  Layout, 
  Menu,  
  Button,
  ConfigProvider,
  theme,
  Modal
} from 'antd'
import {
  HomeOutlined,
  LineChartOutlined,
  MergeCellsOutlined,
  ExperimentOutlined,
  CopyrightOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { withAuthenticator } from '@aws-amplify/ui-react'
import styles from '@aws-amplify/ui-react/styles.css'
import InfoEntryModal from './modals/InfoEntryModal'

const { Content, Footer, Sider } = Layout

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
    icon: <ExperimentOutlined />
  },
  {
    key: '/forum',
    label: <Link to='/forum'>Forum</Link>,
    icon: <MergeCellsOutlined />
  }
]

function App({signOut, user}) {
  const location = useLocation();
  const userGroup = user.signInUserSession.idToken.payload['cognito:groups'][0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
      setIsModalOpen(true);
  };
  const handleOk = () => {
      setIsModalOpen(false);
  };
  const handleCancel = () => {
      setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.lightAlgorithm
      }}
    >
      <Layout style={{ maxHeight: '100vh', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={styles.container} />
        <Sider style={{ boxShadow: "1px 16px 30px 8px rgba(208, 216, 243, 1.0)"}}>
          <img style={{
            marginLeft: '12px',
            marginTop: '20px',
            width: '175px',
            height: '175px',
            border: '1px solid #000',
            borderRadius: '20px',
            overflow: 'hidden'
          }} src={require('./assets/mm.png')} alt='mm'></img>
          <Menu style={{
            paddingTop: '5vh'
          }} theme='dark' mode="vertical" defaultSelectedKeys={[location.pathname]} items={menuItems} />
          <h5 style={{ position: 'absolute', bottom: '48px', left: '16px', color: 'green' }}>
            Administrator Account
          </h5>
          <div style={{display: 'inline-block'}}>
            <Button style={{ position: 'absolute', bottom: '16px', left: '16px' }} onClick={signOut}>Sign out</Button>
            <Button onClick={showModal} style={{ visibility: (userGroup === 'admin' ? 'visibile' : 'hidden'), position: 'absolute', bottom: '16px', left: '112px' }}>
              <UploadOutlined />
            </Button>
          </div>
        </Sider>
        <Layout>
          <Content style={{ marginBottom: '32px', borderRadius: '20px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Matchup Mashup <CopyrightOutlined /> 2023
          </Footer>
        </Layout>
      </Layout>
      <Modal title="Information Entry" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InfoEntryModal />
      </Modal>
    </ConfigProvider>
  );
}

export default withAuthenticator(App)
