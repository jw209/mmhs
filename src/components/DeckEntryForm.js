import { Input, Button, Form, Cascader, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

const myAPI = 'decksapi'
const path = '/decks'
const key = 'jesse'

const AddNewDeck = {
  value: 1,
  label: 'New Deck'
}

function DeckEntryForm({user}) {
  const [options, setOptions] = useState([])
  const [rawData, setRawData] = useState([])
  const [highestId, setHighestId] = useState(null)
  const [thisId, setThisId] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0)
  const player = (user.substring(0,5) === key ? 'Ouiouiman' : 'Privatemerc')
  //const [deckCodeAccess, setDeckCodeAccess] = useState(false)

  const [form] = Form.useForm();

  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => {
      const filteredObjects = res.filter((item) => item.player === player);
      const transformedObjects = filteredObjects.map((item) => {
        return {
          value: item.id,
          label: item.deckName + '-' + item.id
        }
      })
      transformedObjects.unshift(AddNewDeck);
      const rawObjects = res.map((item) => {
        return item
      })
      setRawData(rawObjects)
      setOptions(transformedObjects)
    })
  }, [player])

  useEffect(() => {
    let highestId = rawData.reduce((maxId, obj) => {
      return obj.id > maxId ? obj.id : maxId
    }, -1)

    if (highestId === -1) {
      setHighestId(2);
    } else {
      setHighestId(++highestId)
    }
  }, [rawData])

  const onFinish = (values) => {
    const deck = parseDeckList(values.deckCode)
    API.post(myAPI, path, {
      body: {
        id: thisId,
        player: player,
        deckName: values.deckName,
        deckCode: deck,
        deckCodeCopy: values.deckCode,
        notes: values.notes
      }
    })
    .then(() => {
      form.resetFields()
    })
  };

  const onDelete = () => {
    API.del(myAPI, path+`/object/${player}/${thisId}`)
    form.resetFields()
    const updatedOptions = options.filter((item) => item.value !== thisId);
    setThisId(highestId)
    setOptions(updatedOptions)
    setSelectedOption(0)
  }

  const onChange = (value) => {
    if (value[0] !== 1) {
      setSelectedOption(value[0])
      setThisId(value[0])
      let obj = rawData.find(object => object.id === value[0]);
      form.setFieldsValue(obj)
    } else {
      setSelectedOption(value[0])
      setThisId(highestId)
      form.resetFields()
    }
  }

  function parseDeckList(deckString) {
    const lines = deckString.split('\n');
    const cardList = [];
  
    for (const line of lines) {
      const match = line.match(/# (\d+)x \(\d+\) (.+)/);
      if (match) {
        const quantity = match[1];
        const cardName = match[2];
        cardList.push(`${quantity}x ${cardName}`);
      }
    }
  
    return cardList.join(', ');
  }

  /* Render the form with two text areas and a submit button */
  return (
    <Row>
      <Col span={12}>
        <Form style={{width: '90%'}} form={form} onFinish={onFinish} layout="vertical">
          <Form.Item>
            <Cascader allowClear={false} value={selectedOption} placeholder="Select deck" options={options} onChange={onChange} rules={[{ 
                required: true, 
                message: 'Please enter opponent' 
              }]} 
            />
          </Form.Item>
          <Form.Item label="Deck Name" name="deckName" rules={[{ 
              required: true,
              message: 'Please enter deck name'
            }]}
          >
            <Input placeholder="Enter deck name" />
          </Form.Item>
          <Form.Item label="Deck Code" name="deckCode" rules={[{ 
              required: true,
              message: 'Please enter deck code'
            }]}
          >
            <Input.TextArea placeholder="Enter deck code" />
          </Form.Item>
          <Form.Item label="Notes" name="notes" rules={[{ 
              required: true, 
              message: 'Please enter notes' 
            }]}
          >
            <Input.TextArea placeholder="Enter notes" />
          </Form.Item>
          <Form.Item name="submit">
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
          {/* DELETE LOGIC */}
          <Form.Item name="delete">
            <Button onClick={onDelete} id="delete" type="default">Delete</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <h1>Directions: </h1>
        <p>Deck name should identify the class that the deck comes from</p>
        <p>Notes are iterable but deck code cannot be changed so make sure you are copying the correct one</p>
        <p>Since notes will be iterable, please start each iteration with that date in this format: <span style={{fontWeight:'bold'}}>MM/DD @ HH:MM</span></p>
        <p>press enter to go to next line and then begin writing your notes for that iteration</p>
      </Col>
    </Row>
  );
}

export default DeckEntryForm;