import { Authenticator } from '@aws-amplify/ui-react'
import { Button, Layout, Radio } from 'antd'
import React, { useState } from 'react'
import DeckEntryForm from '../components/DeckEntryForm'
import GameEntryForm from '../components/GameEntryForm'
import { Amplify, API } from "aws-amplify";
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
API.configure(awsconfig);

const adminStyle = {
  padding: '20px',
  backgroundColor: 'white'
}

const signoutStyle = {
  width: '100px',
  marginLeft: '10px'
}

function AdminToolsPage() {
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Authenticator
      hideSignUp={true}
    >
    {({ signOut, user }) => (
        <Layout style={adminStyle}>
          <div style={{display: 'inline-block'}}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio id="enterGame" value={0}>Game data</Radio>
              <Radio id="deckAnalysis" value={1}>Deck analysis</Radio>
            </Radio.Group>
            <Button type="primary" style={signoutStyle} onClick={signOut}>Sign out</Button>
          </div>
          <br/><br/>
          {
          (value === 1 ? <DeckEntryForm user={user.attributes.email}/> : <GameEntryForm user={user.attributes.email} />)
          }
        </Layout>
    )}
    </Authenticator>
  );
}

export default AdminToolsPage;