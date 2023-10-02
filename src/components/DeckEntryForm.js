import { Input, Button, Form } from 'antd';
import React from 'react';

function DeckEntryForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle form submission here, e.g., send data to a server or process it
    console.log('Received values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
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
  );
}

export default DeckEntryForm;