import { Layout, Spin } from 'antd';
import LineChart from '../components/LineChart';
import React, { useState } from 'react';
import GameFeed from '../components/GameFeed';


function StatsPage() {
  const [loadingLineChart, setLoadingLineChart] = useState(true);
  const [loadingGameFeed, setLoadingGameFeed] = useState(true);

  const handleLoadingStateChangeFeed = (updatedState) => {
    setLoadingGameFeed(updatedState);
  }

  const handleLoadingStateChangeChart = (updatedState) => {
    setLoadingLineChart(updatedState)
  }


  return (
    <Spin spinning={loadingLineChart || loadingGameFeed}>
      <Layout style={{
        position: 'relative',
        flex: 1,
        padding: 24,
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
      >
        <LineChart loadingLineChart={handleLoadingStateChangeChart} />
        <GameFeed loadingGameFeed={handleLoadingStateChangeFeed} />
      </Layout>
    </Spin>
  )
}

export default StatsPage;
