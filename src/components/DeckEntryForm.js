import { Input, Button, Form, InputNumber } from 'antd';
import React from 'react';
import { API } from 'aws-amplify';

const myAPI = 'decksapi'
const path = '/decks'

function DeckEntryForm({user}) {
  const [form] = Form.useForm();

  function parseDeckCode(val) {
    let extractedLines = '';
    const lines = val.split('\n');
    for (const line of lines) {
        if (/# \d+x \(\d+\)/.test(line)) {
            extractedLines += (line.split(') ')[1]);
            extractedLines += ', ';
        }
    }
    return extractedLines; 
  }

  const onFinish = (values) => {
    let parsedDeckCode = parseDeckCode(values.deckCode)
    API.post(myAPI, path, {
        body: {
            id: values.id,
            player: values.player,
            deckCode: parsedDeckCode,
            notes: values.notes
        }
    })
  };

  return (
    <>
    <h1>{user}</h1>
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Deck Code" name="id" rules={[{ required: true, message: 'Please enter deck code' }]}>
        <InputNumber placeholder="Enter deck code" />
      </Form.Item>
      <Form.Item label="Player" name="player" rules={[{ required: true, message: 'Please enter player' }]}>
        <Input placeholder="Enter player" />
      </Form.Item>
      <Form.Item label="Deck Code" name="deckCode" rules={[{ required: true, message: 'Please enter deck code' }]}>
        <Input.TextArea placeholder="Enter deck code" />
      </Form.Item>
      <Form.Item label="Notes" name="notes" rules={[{ required: true, message: 'Please enter notes' }]}>
        <Input.TextArea placeholder="Enter notes" />
      </Form.Item>
      <Form.Item name="submit">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
    
  );
}

export default DeckEntryForm;