import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Paw } from '../../models/paws';
import { PawsDatastoreProvider } from '../../providers/paws-datastore/paws-datastore';
import { EstimoteBeaconsProvider } from '../../providers/estimote-beacons/estimote-beacons';
import { IbeaconsProvider } from '../../providers/ibeacons/ibeacons';
import { graphqlPawQueryProvider } from '../../graphql/query/graphql-paw-query';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paws: Array<Paw>;
  queryResult: any = {};

  constructor(
    public navCtrl: NavController, 
    private pawStore: PawsDatastoreProvider, 
    private ebProvider: EstimoteBeaconsProvider, 
    private ibProvider: IbeaconsProvider, 
    private gqlPawQuery: graphqlPawQueryProvider
  ) {
    this.pawStore.paws.subscribe(
      _paws => {
        this.paws = _paws;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.gqlPawQuery.getPaw("24a92ae0-d25c-11e7-bb86-7b6f7b6add22").subscribe(({ data }) => {
      console.log('got query result', data);
      this.queryResult = data.paw
    })
  }


  ionViewDidEnter() {

    this.pawStore.stubbedScanning(100)
    // this.ebProvider.startRangingIBeacon();
    this.ibProvider.startRanging();
  }

}
