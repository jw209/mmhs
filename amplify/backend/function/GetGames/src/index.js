const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'games',
  /* Item properties will depend on your application concerns */
  Games: {
    id: 0,
    opponent: 'blood dk',
    mulligan: 'test',
    outcome: 'loss',
    player: 'ouiouiman',
    turns: 6
  }
}

exports.handler = async (event) => {
  try {
    await docClient.put(params).promise();
    return { body: 'Successfully created item!' }
  } catch (err) {
    
    return { error: err }
  }
};