import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class graphqlPawQueryProvider {

    constructor(public http: Http, private apollo: Apollo) {
    }

    getPaw(pawId: String): ApolloQueryObservable<any> {
        const getPaw = gql`
            query getPaw($pawId: String){
            paw(pawId:$pawId) {
                    pawId
                    type
                    name
                    picture
                    weight
                    dob
                    sex
                    favouriteFood
                    temperature
                    owner {
                    ownerId
                    name
                    dob
                    sex
                    picture
                        paws {
                            pawId
                            type
                            name
                            picture
                            weight
                            dob
                            sex
                            favouriteFood
                            temperature
                        }
                    }
                }
            }
        `;

        return this.apollo.watchQuery({ 
            query: getPaw,
            variables: {
                pawId: pawId
            }
        })
    }

    getPawMetadataByBeaconIds(beaconIds: Array<String>): ApolloQueryObservable<any> {
        const getMetadata = gql`
            query getMetadata($beaconIds: [String!]){
                pawMetadata(beaconIds:$beaconIds) {
                    beaconId
                    name
                    type
                    picture
                        owner {
                            name
                            picture
                        }
                }
            }
          `;

        return this.apollo.watchQuery({
            query: getMetadata,
            variables: {
                beaconIds: beaconIds
            }
        });
    }
}
