import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IBeacon } from '@ionic-native/ibeacon';
import { BehaviorSubject } from 'rxjs/Rx';
import { BEACON_CONFIG } from '../../config/config';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

// The IBeacon Region Interface
export interface IBeaconRegion {
  state?: string;
  major?: number;
  minor?: number;
  identifier?: string;
  uuid: string;
}

@Injectable()
export class IbeaconsProvider {

  // List of paws found
  private _ibeacons: BehaviorSubject<Array<any>>;

  // The sample rate of an observable
  private _frequency: number;  
  
  // The Estimote Beacon Region Setting
  private BeaconRegionSetting: IBeaconRegion = {
    uuid: BEACON_CONFIG.BeaconRegion.uuid
  }

  constructor(public http: Http, private ib: IBeacon) {
    console.log('Hello IbeaconsProvider Provider');
    this._frequency = 500;
    this._ibeacons = new BehaviorSubject([]);
    this.ib.onDomDelegateReady().then(function(success){      
      console.log('OS did wake up phone');
    })
  }

  get ibeacons() {
    return this._ibeacons.asObservable().sampleTime(this._frequency);
  }

  startRanging(){
    console.log('start ranging IBEACON:',BEACON_CONFIG.BeaconRegion.identifier,BEACON_CONFIG.BeaconRegion.uuid)
    var delegate = this.ib.Delegate();
    var beaconRegion = this.ib.BeaconRegion(BEACON_CONFIG.BeaconRegion.identifier,BEACON_CONFIG.BeaconRegion.uuid)    
    this.ib.requestAlwaysAuthorization().then(()=>{
      console.log('IBEACON Requested Authorization!!')      
    });
    this.ib.startRangingBeaconsInRegion(beaconRegion)
    .then(
      () => console.log('Native layer recieved the request to ranging',beaconRegion),
      error => console.error('Native layer failed to begin ranging: ', error)
    );
    delegate.didRangeBeaconsInRegion()
    .subscribe(
      data => {
        console.log('!!RANGING!!')
        console.log(data.beacons);              
        this._ibeacons.next(data.beacons);
      },
      error => {
        console.log('RANGING ERROR');
        console.log(error);
      }
    )
    delegate.didEnterRegion()
    .subscribe(
      data => {
        console.log('!!!didEnterRegion: ', data);
      }
    );
    delegate.didExitRegion()
    .subscribe(
      data => {
        console.log('didExitRegion: ', data);
      }
    );    
  }

}
