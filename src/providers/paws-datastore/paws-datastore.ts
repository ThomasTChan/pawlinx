import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Paw } from '../../models/paws';
import { BehaviorSubject } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

@Injectable()
export class PawsDatastoreProvider {

  // List of paws found
  private _paws: BehaviorSubject<Array<Paw>>;

  // The sample rate of an observable
  private _frequency: number;

  constructor(public http: Http) {
    this._frequency = 500;
    this._paws = new BehaviorSubject([]);
  }

  get paws() {
    return this._paws.asObservable().sampleTime(this._frequency);
  }

  stubbedScanning(timeout): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._paws.next([]);

      setTimeout(() => {
        this._paws.next([
          {
            type: 'Dog',
            name: 'Charlie',
            picture: 'https://dailypost.in/wp-content/uploads/2017/07/patna-pirates-m52-3.jpg',            
            weight: '85 lbs',
            dob: 'January 12, 2010',
            colour: 'white',
            favouriteFood: 'Fried Chicken',
            owner: {
              name: 'Justin De Leon',
              dob: 'June 12, 1983',
              sex: 'M',
              picture: 'http://rs598.pbsrc.com/albums/tt64/kimzy_18/JUSTIN%20DELEON/justindeleon9-1.jpg~c200'
            }
          },
          {
            type: 'Dog',
            name: 'Samurai Jack',
            picture: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/06/pet-dog-cat-armor-samurai-age-japan-7a.jpg',            
            weight: '112 lbs',
            dob: 'November 27, 2009',
            colour: 'brown & white',
            favouriteFood: 'Chowda',
            owner: {
              name: 'Thomas Chan',
              dob: 'January 12, 1992',
              sex: 'M',
              picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAawAAAAJDg5NTQ4YTY4LWZiNGUtNDdjMi1iYmZkLTliZDA2ZmY3MTBkNw.jpg'
            }
          },
          {
            type: 'Dog',
            name: 'Bobby',
            picture: 'https://4.imimg.com/data4/KI/JY/MY-3281174/pet-dogs-250x250.jpg',            
            weight: '35 lbs',
            dob: 'October 2, 2011',
            colour: 'white',
            favouriteFood: 'Socks',
            owner: {
              name: 'Claire Lam',
              dob: 'January 12, 1980',
              sex: 'F',
              picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAymAAAAJDMzODg2NWIxLTg3ZTctNDk2Zi1hOGQyLTQwNGFiMWVhYTBmOQ.jpg'
            }
          }
        ]);
        resolve(true);

        console.log('devices', this._paws.getValue());
      }, (timeout ? timeout : 3000));
    })
  }

}
