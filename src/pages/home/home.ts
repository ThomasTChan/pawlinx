import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Paw } from '../../models/paws';
import { PawsDatastoreProvider } from '../../providers/paws-datastore/paws-datastore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paws: Array<Paw>;

  constructor(public navCtrl: NavController, private pawStore: PawsDatastoreProvider) {
    this.pawStore.paws.subscribe(
      _paws => {
        this.paws = _paws;
      }
    )
  }

  ionViewDidEnter() {
    this.pawStore.stubbedScanning(100)
  }

}
