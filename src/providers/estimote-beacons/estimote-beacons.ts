import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { IBeacon } from '@ionic-native/ibeacon';
import { BehaviorSubject } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

// The Estimote Beacon Region Interface
interface EstimoteBeaconRegion {
  state?: string;
  major: number;
  minor: number;
  identifier?: string;
  uuid: string;
}

@Injectable()
export class EstimoteBeaconsProvider {

  // List of paws found
  private _ebeacons: BehaviorSubject<Array<any>>;

  // The sample rate of an observable
  private _frequency: number;

  // The Estimote Beacon Region Setting
  private BeaconRegionSetting: EstimoteBeaconRegion = {
    major: 12217,
    minor: 19893,
    uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF4BEAC8EDA'
  }

  constructor(public http: Http, 
    private eb: EstimoteBeacons, 
    private ib: IBeacon) {
    // this.eb.requestAlwaysAuthorization();
    // this.ib.requestAlwaysAuthorization();
    this._frequency = 500;
    this._ebeacons = new BehaviorSubject([]);
  }

  get ebeacons() {
    return this._ebeacons.asObservable().sampleTime(this._frequency);
  }

  startRanging() {
    console.log('start ranging');
    this.eb.requestWhenInUseAuthorization().then((success) => {
      console.log('Requested Authorization Success!',success);
      this.eb.startRangingBeaconsInRegion(this.BeaconRegionSetting).subscribe(beacons => {
        console.log('found some beacons!');
        console.log(beacons);
      })
    },(error) => {
      console.log('Request Authorization Failed!',error)
    })
  }

}
