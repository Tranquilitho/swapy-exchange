import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginModel } from './login.model';
import { LoginResponseModel } from './login-response.model';

import { StorageService } from '../../common/services/storage.service';
import { environment } from '../../../environments/environment';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

	constructor(public http: HttpClient, public storageService: StorageService) {}

	login(login:LoginModel) {
		let url:string = environment.api + "login";

	  // don't have the data yet
	  return new Promise( (resolve, reject) => {
    	let headers = new HttpHeaders();
    	headers.set('Content-Type', 'application/json');

			let options = {
				headers: headers
			};

	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.post(url, login, options)
	      // .map(res => res.json())
	      .subscribe( (data:LoginResponseModel) => {
	      	var user = {
	      		email: data.user.email,
	      		firstName: data.user.firstName,
	      		lastName: data.user.lastName,
	      		type: data.user.type
	      	};

	        //now we have the users info, let's save it in the Storage
	        this.storageService.setItem('user', user);
	        resolve(data)
	      },
	      error => {
	      	reject(error);
	      });
  	});
	}

}