import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Offer } from '../../common/interfaces/offer.interface';
import { OfferService } from './offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  public offers: Offer[] = [];
  public errorMessage;
  mode = 'Observable';

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getOffers().then(
      (data: any) => {

        for (const o of data.offers) {
          this.offers.push({
            roi: o.offerRoi,
            paybackMonths: o.offerPaybackMonths,
            raisingAmount: o.offerRaisingAmount,
            walletAddress: o.offerWalletAddress,
            contractAddress: o.offerContractAddress,
            uuid: o.offerUuid,
            companyName: o.firstName + ' ' + o.lastName,
            companyLogo: o.picture,
            companyUuid: o.uuid,
            assets: o.assets,
            createdOn: o.createdOn,
          });
        }

        this.offerService.cacheOffers(this.offers);

      },
      error =>  this.errorMessage = <any>error
    );
  }

}
