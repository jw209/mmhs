import React, { useState } from 'react';
import { Radio, Layout } from 'antd';
import GameEntryForm from '../components/GameEntryForm';
import DeckEntryForm from '../components/DeckEntryForm';

function InfoEntryModal() {
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return(
      <Layout
        style={{backgroundColor: 'white'}}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio name="enterGame" value={0}>Enter game data</Radio>
          <Radio name="deckAnalysis" value={1}>Enter deck analysis</Radio>
        </Radio.Group>
        <br/><br/>
        <Layout>
            {(value === 1 ? <DeckEntryForm /> : <GameEntryForm />)}
        </Layout>
      </Layout>
  );
}

export default InfoEntryModal;