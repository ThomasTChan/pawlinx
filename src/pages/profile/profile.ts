import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Paw } from '../../models/paws';
import { ProfileDatastoreProvider } from '../../providers/profile-datastore/profile-datastore';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileData: Paw;

  constructor(public navCtrl: NavController, public navParams: NavParams, private profileStore: ProfileDatastoreProvider) {
    this.profileData = {
      type: '',
      name: '',
      picture: '',
      weight: '',
      dob: '',
      colour: '',
      favouriteFood: '',
      owner: {
        name: '',
        dob: '',
        sex: '',
        picture: ''
      }
    };
  }

  // getOwnerProfile() {
  //   return this.profile;
  // }

  ionViewDidEnter() {
    this.profileStore.getProfile().then(function (data) {
      this.profileData = data;
    }.bind(this), function (err) {
      console.log(err);
    });       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
