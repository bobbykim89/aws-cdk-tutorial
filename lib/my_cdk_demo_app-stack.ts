import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyCdkDemoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MyCdkDemoAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // L1 and L2 Construct of an S3 Bucket
    const level1S3Bucket = new CfnBucket(this, 'MyFirstLevel1ConstructBucket', {
      versioningConfiguration: {
        status: 'Enabled',
      },
    })

    const level2S3Bucket = new Bucket(this, 'MyFirstLevel2ConstructBucket', {
      versioned: true,
      bucketName: 'my-first-level2-construct-bucket-for-real-pio-pio',
      // removalPolicy: cdk.RemovalPolicy.DESTROY
    })
  }
}
