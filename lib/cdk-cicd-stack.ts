import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { pipelineStage } from './PipelineStage';
import { CodeBuildAction } from 'aws-cdk-lib/aws-codepipeline-actions';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline =  new CodePipeline (this,'AwesomePipeline',{
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub('Rabindra-Kumar-Gupta/cdk-cicd','main'),
        commands: [
          'cdk-cicd',
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory:'cdk-cicd/cdk.out'
      })
    });

    const testStage = pipeline.addStage(new pipelineStage(this,'PipelineTestStage',{
      stageName: 'test'
    }))

    testStage.addPre(new CodeBuildStep('unit-tests', {
      commands:[
        'cdk-cicd',
        'npm ci',
        'npm test'
      ]
    }))
    
  }
}
