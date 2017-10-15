import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../common/services/i18n.service';
import { ExchangeProtocolService as ExchangeProtocol } from '../../common/services/protocol/exchange.service';

import { AddOfferService } from '../add-offer/add-offer.service';
import { CreditCompanyComponent } from '../credit-company.component'

@Component({
  selector: 'app-confirm-offer',
  templateUrl: './confirm-offer.component.html',
  styleUrls: ['./confirm-offer.component.css']
})
export class ConfirmOfferComponent implements OnInit {

  public offer: any;
  public errorMessages: string[] = [];

  constructor(private addOfferService: AddOfferService,
    private router: Router,
    private i18nService: I18nService,
    private creditCompanyComponent: CreditCompanyComponent,
    private exchangeProtocol: ExchangeProtocol
  ) { }

  ngOnInit() {
    this.offer = this.addOfferService.getCachedOffer();
    if (!this.offer) {
      this.router.navigate(['/credit-company/raise']);
    }
  }

  confirmOffer() {
    this.addOfferService.addOffer(this.offer).then(
      data => {
        this.exchangeProtocol.createOffer(data.event.uuid, this.offer.paybackMonths, this.offer.roi, [111, 222, 333, 444, 555]);
        this.offer.uuid = data.offer.uuid;
        this.offer.address = data.offer.address;
        this.addOfferService.cacheOffer(this.offer);
        this.creditCompanyComponent.refreshStatusBar();

        this.router.navigate(['/credit-company/raise/pending']);
      },
      error => {
        const namespace = 'confirm-offer';

        this.i18nService.doTranslateList(namespace, error).then( res => {
          this.errorMessages = res; // errorMessages is a list of error strings
        });
      }
    );
  }

}
