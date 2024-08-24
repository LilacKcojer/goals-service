const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');

class CdkStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const goalsTable = new dynamodb.TableV2(this, 'GoalsTable', {
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING},
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "GoalsTable"
    });

    const goalsServiceLambda = new NodejsFunction(this, 'GoalsLambda', {
      entry: '../../lambdas/goalLambda.js',
      handler: 'handler',
      environment: {
        TABLE_NAME: goalsTable.tableName,
      },
    })

    const api = new apigateway.LambdaRestApi(this, 'GoalsServiceApi', {
      restApiName: "GoalsServiceApi",
      handler: goalsServiceLambda,
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    })

    goalsTable.grantReadWriteData(goalsServiceLambda);
  }
}

module.exports = { CdkStack }
