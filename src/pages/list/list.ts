import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IbeaconsProvider, IBeaconRegion } from '../../providers/ibeacons/ibeacons';
import * as _ from 'lodash';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;  
  ibeacons: Array<IBeaconRegion>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ib: IbeaconsProvider) {    
    this.ibeacons = [];
    this.ib.ibeacons.subscribe(
      beacons => {        
        this.ibeacons = beacons;
      }
    );    
  }  
}
