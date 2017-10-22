import { AwsApiGwClient, AwsApiGwNetworkInterface } from "apollo-client-aws-ni/api-gw-connector";
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

declare var apigClientFactory: any; // being the AWS API GW generated SDK root object (to be imported in main html file)

let apigClient;
let clientSet = false;

export function updateAwsApiGwClient(): void {
    apigClient = apigClientFactory.newClient({
        accessKey: localStorage.getItem('userTokens.awsAccessKeyId'),
        secretKey: localStorage.getItem('userTokens.awsSecretAccessKey'),
        sessionToken: localStorage.getItem('userTokens.awsSessionToken'),
        region: 'ca-central-1'
    });
    clientSet = true;
};

const awsApiGwClient: AwsApiGwClient = {

    // this prevent a request to be made if the AWS SDK is not initialized
    isAuthenticated() {
        return clientSet;
    },

    // this allow you to be noticed by the network interface that the session AWS user has expired
    authenticationExpired() {
        clientSet = false;
        // you call here your logout() method to redirect to a login page
        // myAuthService.logout();
    },

    // you just have to call here the AWS generated SDK function corresponding to your graphql endpoint
    graphqlPost(param, body, extra) {
        return apigClient.graphqlPost(param, body, extra);
    }
}

export function provideClient(): ApolloClient {
    const networkInterface: any = new AwsApiGwNetworkInterface(awsApiGwClient);
    return new ApolloClient({ networkInterface: networkInterface });
}
