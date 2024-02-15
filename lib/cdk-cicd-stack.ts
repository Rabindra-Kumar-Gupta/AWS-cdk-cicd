import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { pipelineStage } from './PipelineStage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline =  new CodePipeline (this,'AwesomePipeline',{
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub('Rabindra-Kumar-Gupta/cdk-cicd','main'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ]
      })
    }); 

    const testStage = pipeline.addStage(new pipelineStage(this,'PipelineTestStage',{
      stageName: 'test'
    }))

    testStage.addPre(new CodeBuildStep('unit-tests', {
      commands:[
        'npm ci',
        'npm test'
      ]
    }))
    
  }
}
