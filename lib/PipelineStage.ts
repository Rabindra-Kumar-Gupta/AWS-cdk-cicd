import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";

export class pipelineStage extends Stage{
    constructor(scope: Construct, id: string, props: StageProps){
        super(scope,id,props)

        new LambdaStack(this, 'LambdaStack', {
            stageName: props.stageName
        })
    }
}