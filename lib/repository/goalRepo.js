
const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, DeleteCommand} = require("@aws-sdk/lib-dynamodb");
const {v4: uuid} = require("uuid");
const winston = require('winston');

const logger = winston.createLogger({level: 'info'});

const client = new DynamoDBClient({ region: "us-west-2"});
const docClient = DynamoDBDocumentClient.from(client);


const getGoals = async({email}) => {
  const params = {
    TableName: "GoalsTable",
    Item: {
      email
    }
  };

  const user = await docClient.send(new GetCommand(params));

  return user;
}

const delGoal = async({email}) => {
  const params = {
    TableName: "GoalsTable",
    Key: {
      email
    }
  };

  const user = await docClient.send(new DeleteCommand(params));

  return user;
}

const postGoal = async({email, items}) => {
  const params = {
    TableName: "GoalsTable",
    Item: {
      email,
      items
    }
  };

  const user = await docClient.send(new PutCommand(params));

  return user;
}

module.exports = {getGoals, delGoal, postGoal};