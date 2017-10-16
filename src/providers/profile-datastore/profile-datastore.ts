import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Paw } from '../../models/paws';

/*
  Generated class for the ProfileDatastoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileDatastoreProvider {

  private _profileData: Paw;

  constructor(public http: Http) {
  }

  editProfile(pawData: Paw) {
    //TODO: Post Data to Server
    this._profileData = pawData;
  }

  getProfile(): Promise<Paw> {
    //TODO: Get Profile Data from Server
    return new Promise((resolve, reject) => {
      this._profileData = {
        type: 'Dog',
        name: 'Tobi',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Maltese_puppy.jpeg',
        weight: '7 lbs',
        dob: 'October 30, 2010',
        colour: 'White',
        favouriteFood: 'Beneful',
        hobbies: ['playing fetch', 'rolling in the grass'],
        owner: {
          name: 'Vincci de Leon',
          dob: 'November 3, 1983',
          sex: 'F',
          picture: 'https://gerstein.library.utoronto.ca/sites/gerstein.library.utoronto.ca/files/styles/medium/public/staff-photos/profile_150x200px_0.jpg?itok=oAGUmJEB'
        }
      }
      resolve(this._profileData);      
      //reject();
    })


  }
}
