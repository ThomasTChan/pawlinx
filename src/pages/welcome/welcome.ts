import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalStateService } from '../../providers/services/global-state.service';
import {
  UserLoginService, IUserLogin, UserState,
  UserRegistrationService, CognitoUtil
} from '../../providers/services/aws-account.service';
import { updateAwsApiGwClient } from '../../graphql/graphql-client';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  createSuccess = false;  
  allowButtonPresses = true; // to prevent multiple clicks
  alertCtrl: AlertController = this.globals.getAlertController();

  public registerCredentials: IUserLogin = {
    username: "",
    password: ""
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalStateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public register() {
    console.log("Register Clicked!")
  }

  // return a LoginStatus
  login(): void {
    // prevent multiple clicks
    if (!this.allowButtonPresses) {
      return;
    }
    this.allowButtonPresses = false;
    this.globals.displayLoader('Signing in...');
    console.log(this.registerCredentials);
    UserLoginService.signIn(this.registerCredentials)
      .then(() => {
        // Login was successful
        this.globals.dismissLoader();
        this.showLoginSuccessAlert(this.registerCredentials.username, () => {
          this.globals.userId = this.globals.getUserId();
          this.globals.setViewAdminFeaturesOverride(this.globals.isAdminRole());
          updateAwsApiGwClient();
          this.navCtrl.setRoot(HomePage);          
          this.navCtrl.popToRoot({ animate: false });          
          
        });
      }).catch((err: Error): void => {
        // Login was unsuccessful
        this.globals.dismissLoader();
        this.allowButtonPresses = true;
        this.displayAlertError(err);
      });
  }

  showLoginSuccessAlert(username: String, callbackHandler: () => void): void {
    let subtitle = `You are now signed in.`;
    if (this.globals.isAdminRole()) {
      subtitle = `You are now signed as an Administrator.`
    }
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: subtitle,
      message: `Username: <b>${username}</b><br/>First name: <b>${this.globals.getUserFirstName()}</b><br/>Last name: <b>${this.globals.getUserLastName()}</b>`,
      buttons: [{
        text: 'OK',
        handler: data => {
          callbackHandler();
        }
      }]
    });
    alert.present();
  }

  displayAlertError(err: Error) {
    switch (CognitoUtil.getUserState()) {
      case UserState.InvalidCredentials:
        console.log('Sign-in failed: ' + err);
        let errorMessage = 'Incorrect username or password entered. Please try again.'
        this.showLoginFailureAlert(this.registerCredentials.username, errorMessage);
        break;
      case UserState.PendingConfirmation:
        // If a user has registered, but has not yet confirmed the registration code, then
        // display a dialog where he/she can input the verification code. Alternatively,
        // the user can request a new verification code be emailed.
        console.log('User has not confirmed verification code: ' + err);
        this.showOneTimeVerificationAlert(this.registerCredentials.username, () => {
          this.navCtrl.pop();
        });
        break;
      default:
        console.log('Sign-in failed: ' + err);
        errorMessage = `The login failed: ${err}`;
        this.showLoginFailureAlert(this.registerCredentials.username, errorMessage);
        break;
    }
  }

  showLoginFailureAlert(username: String, message: String): void {
    let alert = this.alertCtrl.create({
      title: 'Login was unsuccessful',
      subTitle: `${message}`,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  showConfirmationFailureAlert(err: Error): void {
    let alert = this.alertCtrl.create({
      title: 'Verification failed',
      subTitle: err.message,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  showResendSuccessAlert(callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'Verification code sent',
      subTitle: `A new verification code has been emailed to your account. Once you receive it, please try signing in again.`,
      buttons: [{
        text: 'OK',
        handler: data => { callbackHandler(); }
      }]
    });
    alert.present();
  }

  showOneTimeVerificationAlert(username: String, callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'One-time verification',
      subTitle: `When you registered, a verification code was emailed to you. Please enter the code, and click "Verify". Or click "Re-send" to receive another code.`,
      inputs: [{
        name: 'verificationCode',
        placeholder: 'Verification code'
      }],
      buttons: [
        {
          text: 'Verify',
          handler: data => {
            UserRegistrationService.confirmSignUp(data.verificationCode)
              .then(() => {
                // this.showLoginSuccessAlert(this.userData.username, () => {
                // now, sign in
                UserLoginService.signIn(this.registerCredentials).then(() => {
                  // Login was successful
                  this.showLoginSuccessAlert(this.registerCredentials.username, () => {
                    this.globals.userId = this.globals.getUserId();
                    this.navCtrl.popToRoot({ animate: false });
                    // this.navCtrl.push(WelcomePage);
                  });
                }).catch((err: Error): void => {
                  // Login was unsuccessful
                  this.displayAlertError(err);
                });
                // this.navCtrl.popToRoot({animate: false});
                // this.navCtrl.pop();
                // });
              }).catch((err: Error) => {
                console.error(err);
                this.showConfirmationFailureAlert(err);
              });
          }
        },
        {
          text: 'Re-send',
          handler: data => {
            UserRegistrationService.resendConfirmationCode();
            this.showResendSuccessAlert(callbackHandler);
          }
        },
        { text: 'Cancel' },
      ]
    });
    alert.present();
  }



}
