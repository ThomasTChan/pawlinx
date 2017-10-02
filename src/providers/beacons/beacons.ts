import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BeaconsProvider {

  constructor(public http: Http) {    
  }



}
