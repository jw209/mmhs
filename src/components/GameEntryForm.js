import { 
  Input, 
  InputNumber, 
  Button, 
  Form, 
  Cascader, 
  Radio,
  Row,
  Col
} from 'antd';
import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react';
import exampleGame from '../example-game-report.png';

const myAPI = 'gamesapi'
const path = '/games'
const key = 'jesse'

const AddNewGame = {
  value: 1,
  label: 'New Game'
}

function GameEntryForm({user}) {
  const player = (user.substring(0,5) === key ? 'Ouiouiman' : 'Privatemerc')
  const [form] = Form.useForm();

  const [options, setOptions] = useState([])
  const [rawData, setRawData] = useState([])
  const [highestId, setHighestId] = useState(null)
  const [thisId, setThisId] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0)

  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => {
      const filteredObjects = res.filter((item) => item.player === player);
      const transformedObjects = filteredObjects.map((item) => {
        return {
          value: item.id,
          label: item.opponent + '-' + item.id
        }
      })
      transformedObjects.unshift(AddNewGame);
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
    const today = new Date();
    const dayOfWeek = today.getDay();
    API.post(myAPI, path, {
      body: {
        id: thisId,
        opponent: values.opponent,
        player: player,
        win: values.win,
        turns: values.turns,
        mulligan: values.mulligan,
        notes: values.notes,
        dayofweek: dayOfWeek
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
      let obj = rawData.find(object => object.id === value[0])
      form.setFieldsValue(obj)
    } else {
      setSelectedOption(value[0])
      setThisId(highestId)
      form.resetFields()
    }
  }

  return (
    <Row>
      <Col span={12}>
        <Form style={{width: '90%'}} form={form} onFinish={onFinish} layout="vertical">
          {/* SET GAME TO MODIFY OR ADD NEW GAME */}
          <Form.Item>
            <Cascader allowClear={false} value={selectedOption} placeholder="Select game" options={options} onChange={onChange} rules={[{ 
                required: true, 
                message: 'Please enter opponent' 
              }]} 
            />
          </Form.Item>
          {/* SET OPPONENTS DECK */}
          <Form.Item label="Opponent" name="opponent" rules={[{ 
              required: true, 
              message: 'Please enter opponent' 
            }]}
          >
            <Input id="opponent" placeholder="Enter opponent" />
          </Form.Item>
          {/* SET GAME OUTCOME */}
          <Form.Item name="win" rules={[{ 
              required: true, 
              message: 'Please enter opponent' 
            }]}
          >
            <Radio.Group id="win">
              <Radio id="gameWin" value={true}>Win</Radio>
              <Radio id="gameLose" value={false}>Loss</Radio>
            </Radio.Group>
          </Form.Item>
          {/* SET NUMBER OF TURNS */}
          <Form.Item label="Number of Turns" name="turns" rules={[{ 
              type: 'number', 
              required: true, 
              message: 'Please enter number of turns' 
            }]}
          >
            <InputNumber id="turns" placeholder="Enter number of turns" min={1} />
          </Form.Item>
          {/* SET MULLIGAN NOTES */}
          <Form.Item label="Mulligan" name="mulligan" rules={[{ 
              required: true, 
              message: 'Please enter mulligan notes' 
            }]}
          >
            <Input.TextArea id="mulligan" placeholder="Enter notes" />
          </Form.Item>
          {/* SET GENERAL NOTES */}
          <Form.Item label="Notes" name="notes" rules={[{ 
              required: true, 
              message: 'Please enter notes' 
            }]}
          >
            <Input.TextArea id="notes" placeholder="Enter notes" />
          </Form.Item>
          {/* SUBMIT LOGIC */}
          <Form.Item name="submit">
            <Button id="submit" type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
          {/* DELETE LOGIC */}
          <Form.Item name="delete">
            <Button onClick={onDelete} id="delete" type="default">Delete</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <h1>Directions: </h1>
        <p>We want the information we provide to our listeners to be as concise as possible </p>
        <p>Please do not add games in you do not remember your mulligan </p>
        <p>We want our reports to look like this. Lets keep a uniform style similar to this: </p>
        <img className='example-game' src={exampleGame} alt="game"/>
      </Col>
    </Row>
  );
}

export default GameEntryForm;