import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import 'rxjs/add/operator/map';

@Injectable()
export class BeaconsProvider {

  constructor(public http: Http) {
    console.log('Hello BeaconsProvider Provider');
  }

}
