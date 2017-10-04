import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginModel } from './login.model';
import { LoginResponseModel } from './login-response.model';

import { StorageService } from '../../common/services/storage.service';
import { LoadingService } from '../../common/services/loading.service';
import { environment } from '../../../environments/environment';
import { Web3Service } from '../../common/services/web3.service';


/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  constructor(public http: HttpClient, public storageService: StorageService, public loadingService: LoadingService, public web3Service: Web3Service) {}

  login(login: LoginModel) {
    const url: string = environment.api + 'login';

    // don't have the data yet
    return new Promise( (resolve, reject) => {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      const options = {
        headers: headers,
        withCredentials: true
      };

      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.loadingService.show();
      this.http.post(url, login, options)
        // .map(res => res.json())
        .subscribe((data: LoginResponseModel) => {
          this.storageService.setItem('user', data.user);
          this.storageService.setItem('accessToken', data.accessToken);
          this.loadingService.hide();
          resolve(data);
        },
        error => {
          this.loadingService.hide();
          reject(error);
        });
    });
  }
}
