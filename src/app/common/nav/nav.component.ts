import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';
import { StorageService } from '../services/storage.service';
import { WalletService } from '../services/wallet.service';
import { UserResponseInterface, INVESTOR, CREDIT_COMPANY } from '../interfaces/user-response.interface';
import * as env from '../../../../env.json';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user: UserResponseInterface;
  public wallet: any;
  public menu: any[];
  public profileUrl = '';
  public helpUrl = '';
  public termsUrl = '';
  public privacyUrl = '';

  public explorerUrl = (<any>env).BLOCK_EXPLORER_URL;

  constructor(public logoutService: LogoutService, private storageService: StorageService,
    private walletService: WalletService, private linkService: LinkService, private router: Router) {
    const user = this.storageService.getItem('user');
    this.user = user ? user : {};
    this.wallet = this.walletService.getWallet();

    switch (this.user.type) {
      case INVESTOR:
        this.menu = [
          { url: '/investor/offers', label: 'Invest' },
          { url: '/investor', label: 'Manage' },
          { url: '/investor/marketplace', label: 'Marketplace' }
        ];
        this.profileUrl = '/investor/profile';
        this.helpUrl = '/investor/help';
        this.termsUrl = '/investor/terms-of-service';
        this.privacyUrl = '/investor/privacy-policy';
        break;
      case CREDIT_COMPANY:
        this.menu = [
          {url: '/credit-company/raise', label: 'Raise'},
          {url: '/credit-company', label: 'Manage'}
        ];
        this.profileUrl = '/credit-company/profile';
        this.helpUrl = '/credit-company/help';
        this.termsUrl = '/credit-company/terms-of-service';
        this.privacyUrl = '/credit-company/privacy-policy';
        break;
    }

  }

  public openWalletInExplorer(address: string) {
    this.linkService.openLink(this.explorerUrl + address);
  }

  public isWallet(val) {
    return typeof val === 'object';
  }

  ngOnInit() {}

  // store state
  isIn = false;
  isSettingsOpen = false;

  // click handler
  public toggleState() {
    const bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  public toggleSettingsDropdown() {
    const bool = this.isSettingsOpen;
    this.isSettingsOpen = bool === false ? true : false;
  }

  public logout() {
    this.logoutService.logout();
  }

}
