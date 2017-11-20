import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Paw } from '../../models/paws';
import { PawsDatastoreProvider } from '../../providers/paws-datastore/paws-datastore';
import { EstimoteBeaconsProvider } from '../../providers/estimote-beacons/estimote-beacons';
import { IbeaconsProvider } from '../../providers/ibeacons/ibeacons';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

const GetPaw = gql`
query GetPaw{
  paw(pawId:"1b16b8d0-cd93-11e7-b03c-2166bda1310f") {
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paws: Array<Paw>;
  queryResult: any = {};
  queryObservable: ApolloQueryObservable<any>;

  constructor(public navCtrl: NavController, private pawStore: PawsDatastoreProvider, private ebProvider: EstimoteBeaconsProvider, private ibProvider: IbeaconsProvider, private apollo: Apollo) {
    this.pawStore.paws.subscribe(
      _paws => {
        this.paws = _paws;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.queryObservable = this
    .apollo
    .watchQuery({ query: GetPaw });

    this.queryObservable.subscribe(({data}) => {
      console.log('got query result',data);
      this.queryResult = data.paw      
    })
  }


  ionViewDidEnter() {    

    this.pawStore.stubbedScanning(100)
    // this.ebProvider.startRangingIBeacon();
    this.ibProvider.startRanging();
  }

}
