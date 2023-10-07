import { Input, Button, Form, Cascader } from 'antd';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

const myAPI = 'decksapi'
const path = '/decks'
const key = 'e018b9e9-3367-4cf8-9f97-67b1bd037dfa'

const AddNewDeck = {
  value: 1,
  label: 'New Deck'
}

function DeckEntryForm({user}) {
  const [options, setOptions] = useState([])
  const [rawData, setRawData] = useState([])
  const [highestId, setHighestId] = useState(null)
  const [thisId, setThisId] = useState(null)
  const [deckCodeAccess, setDeckCodeAccess] = useState(false)

  const [form] = Form.useForm();
  const player = (user === key ? 'Ouiouiman' : 'Privatemerc')

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

  /* Parse the deck code by splitting it into an array
   * by line, and then testing each index of this array
   * with a regular expression based on this pattern:
   * <# 2x (2)> to identify a line containing a card
   */
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
    let parsedDeckCode = parseDeckCode(values.deckCode)
    API.post(myAPI, path, {
      body: {
        id: thisId,
        player: player,
        deckName: values.deckName,
        deckCode: parsedDeckCode,
        notes: values.notes
      }
    })
    .then(() => {
      form.resetFields()
    })
  };

  const onChange = (value) => {
    if (value[0] !== 1) {
      setThisId(value[0])
      let obj = rawData.find(object => object.id === value[0]);
      form.setFieldsValue(obj)
      setDeckCodeAccess(true)
    } else {
      setThisId(highestId)
      form.resetFields()
      setDeckCodeAccess(false)
    }
  }

  /* Render the form with two text areas and a submit button */
  return (
    <Form 
      style={{width: '300px'}}
      form={form}
      onFinish={onFinish} 
      layout="vertical"
    >
      {/* SET GAME TO MODIFY OR ADD NEW DECK */}
      <Cascader 
        placeholder="Select deck"
        options={options}
        onChange={onChange}
        rules={[{ 
          required: true, 
          message: 'Please enter opponent' 
        }]} 
      />
      <br /><br />
      {/* SET YOUR DECK */}
      <Form.Item 
        label="Deck Name" 
        name="deckName" 
        rules={[{ 
          required: true,
          message: 'Please enter deck name'
        }]}
      >
        <Input
          placeholder="Enter deck name" 
        />
      </Form.Item>
      {/* SET DECK CODE */}
      <Form.Item 
        label="Deck Code" 
        name="deckCode" 
        rules={[{ 
          required: true,
          message: 'Please enter deck code'
        }]}
      >
        <Input.TextArea 
          disabled={deckCodeAccess}
          placeholder="Enter deck code" 
        />
      </Form.Item>
      {/* SET NOTES */}
      <Form.Item 
        label="Notes" 
        name="notes" 
        rules={[{ 
          required: true, 
          message: 'Please enter notes' 
        }]}
      >
        <Input.TextArea 
          placeholder="Enter notes" 
        />
      </Form.Item>
      {/* SUBMIT LOGIC */}
      <Form.Item 
        name="submit"
      >
        <Button 
          type="primary" 
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DeckEntryForm;