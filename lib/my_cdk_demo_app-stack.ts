import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Code, Function, Runtime, LayerVersion } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'

export class MyCdkDemoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const myLambdaFn = new NodejsFunction(this, 'MyLambdaFn', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      // code: Code.fromAsset('app/dist'),
      entry: 'app/src/index.ts',
      environment: {
        NODE_ENV: 'production',
      },
      timeout: cdk.Duration.seconds(10),
    })

    new LambdaRestApi(this, 'MyApiGateway', {
      handler: myLambdaFn,
      proxy: true,
    })
  }
}
