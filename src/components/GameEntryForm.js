import { Input, InputNumber, Button, Form } from 'antd';
import { API } from 'aws-amplify'
import React, { useEffect } from 'react';

const myAPI = 'gamesapi'
const path = '/games'

function GameEntryForm() {
  const [form] = Form.useForm();

  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => console.log(res))
  }, [])

  const onFinish = (values) => {
    API.post(myAPI, path, {
        body: values
    })
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Game" name="id" rules={[{ type: 'number', required: true, message: 'Please enter id' }]}>
        <InputNumber placeholder="Enter ID" />
      </Form.Item>
      <Form.Item label="Opponent" name="opponent" rules={[{ required: true, message: 'Please enter opponent' }]}>
        <Input placeholder="Enter opponent" />
      </Form.Item>
      <Form.Item label="Player" name="player" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item label="Outcome" name="outcome">
        <Input.TextArea placeholder="Enter outcome" />
      </Form.Item>
      <Form.Item label="Notes" name="notes" rules={[{ required: true, message: 'Please enter notes' }]}>
        <Input.TextArea placeholder="Enter notes" />
      </Form.Item>
      <Form.Item label="Number of Turns" name="turns" rules={[{ type: 'number', required: true, message: 'Please enter number of turns' }]}>
        <InputNumber placeholder="Enter number of turns" min={1} />
      </Form.Item>
      <Form.Item name="submit">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default GameEntryForm;