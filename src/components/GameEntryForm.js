import { Input, InputNumber, Button, Form } from 'antd';
import { API } from 'aws-amplify'
import React from 'react';

const myAPI = 'games'
const path = '/games'

function GameEntryForm() {
  const [form] = Form.useForm();
  

  const onFinish = (values) => {
    const response = API.get(myAPI, path);
    console.log(response);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Opponent" name="opponent" rules={[{ required: true, message: 'Please enter opponent' }]}>
        <Input placeholder="Enter opponent" />
      </Form.Item>
      <Form.Item label="Mulligan Notes" name="mulliganNotes">
        <Input.TextArea placeholder="Enter mulligan notes" />
      </Form.Item>
      <Form.Item label="Number of Turns" name="numberOfTurns" rules={[{ type: 'number', required: true, message: 'Please enter number of turns' }]}>
        <InputNumber placeholder="Enter number of turns" min={1} />
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
  );
}

export default GameEntryForm;