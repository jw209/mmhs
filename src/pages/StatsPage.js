import { Layout, Col, Row } from 'antd';
import LineChart from '../components/LineChart';
import React from 'react';
import GameFeed from '../components/GameFeed';

function StatsPage() {

    return (
        <Layout style={{ 
            flex: 1,
            padding: 24,
            maxHeight: '100%',
            overflow: 'auto',
        }}>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={16}>
                    <LineChart />
                </Col>
                <Col className="gutter-row" span={6}>
                    <Layout 
                        style={{
                            paddingTop: '8%'
                        }}
                    >
                        <GameFeed />
                    </Layout>
                </Col>
            </Row>
        </Layout>
    )
}

export default StatsPage;
