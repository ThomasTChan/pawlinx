import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class graphqlPawQueryProvider {

    constructor(public http: Http, private apollo: Apollo) {
        console.log('Hello GraphqlProvider Provider');
    }

    getPaw(pawId: String): ApolloQueryObservable<any> {
        const GetPaw = gql`
            query GetPaw{
            paw(pawId:"${pawId}") {
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

        return this.apollo.watchQuery({ query: GetPaw })
    }

}
