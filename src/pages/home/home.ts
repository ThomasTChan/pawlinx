import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Paw } from '../../models/paws';
import { PawsDatastoreProvider } from '../../providers/paws-datastore/paws-datastore';
import { EstimoteBeaconsProvider } from '../../providers/estimote-beacons/estimote-beacons';
import { IbeaconsProvider } from '../../providers/ibeacons/ibeacons';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paws: Array<Paw>;

  constructor(public navCtrl: NavController, private pawStore: PawsDatastoreProvider, private ebProvider: EstimoteBeaconsProvider, private ibProvider: IbeaconsProvider) {
    this.pawStore.paws.subscribe(
      _paws => {
        this.paws = _paws;
      }
    )
  }

  ionViewDidEnter() {
    this.pawStore.stubbedScanning(100)
    // this.ebProvider.startRangingIBeacon();
    this.ibProvider.startRanging();
  }

}
