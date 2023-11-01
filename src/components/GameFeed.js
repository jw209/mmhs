import React from 'react'
import { Layout, Card, Col, Row } from 'antd'

const GameFeed = (props) => {
    const data = props.data
    let mercData = data.filter(obj => obj.player === 'Privatemerc')
    let ouiData = data.filter(obj => obj.player === 'Ouiouiman')
    
    return (
        <Layout className='game-feed'>
        {
            ouiData && mercData ? 
            <div>
                <Row>
                    <Col span={10}>
                    <h1 style={{textAlign:'center'}}>Ouiouiman: </h1>
                    {ouiData.map((obj, index) => (
                        <Row key={index}>
                            <Card 
                                key={index}
                                title={'VS. '+obj.opponent}
                                className='game-card'
                            >
                                <p>{
                                    obj.win === true ? 
                                    <span style={{color:'green', fontWeight:'bold'}}>Win</span> : 
                                    <span style={{color:'red', fontWeight:'bold'}}>Loss</span>
                                }</p>
                                <p><span style={{fontWeight:'bold'}}>Number of turns: {obj.turns}</span></p>
                                <p><span style={{fontWeight:'bold'}}>Mulligan: </span>{obj.mulligan}</p>
                                <p>{obj.notes}</p>
                            </Card>
                        </Row>
                    ))}
                    </Col>
                    <Col span={12}>
                    <h1 style={{textAlign:'center'}}>Privatemerc: </h1>
                    {mercData.map((obj, index) => (
                        <Row key={index}>
                            <Card
                                key={index}
                                title={'VS. '+obj.opponent}
                                className='game-card'
                            >
                                <p>{
                                    obj.win === true ? 
                                    <span style={{color:'green', fontWeight:'bold'}}>Win</span> : 
                                    <span style={{color:'red', fontWeight:'bold'}}>Loss</span>
                                }</p>
                                <p><span style={{fontWeight:'bold'}}>Number of turns: {obj.turns}</span></p>
                                <p><span style={{fontWeight:'bold'}}>Mulligan: </span>{obj.mulligan}</p>
                                <p>{obj.notes}</p>
                            </Card>
                        </Row>
                    ))}
                    </Col>
                </Row>
            </div> : <div />
        }
        </Layout>
    )
}

export default GameFeed;