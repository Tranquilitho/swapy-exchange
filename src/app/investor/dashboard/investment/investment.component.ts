import { Component, OnInit, Input } from '@angular/core';
import { Invest } from '../../invest/invest.interface';
import { OPEN, SOLD, PENDING, LOCKED, TX_AGREEMENT_PENDING,
  TX_AGREED, TX_INVEST_PENDING, TX_INVESTED } from '../../../common/interfaces/offerAssetStatus.interface';
import * as env from '../../../../../env.json';
import { ElectronService } from 'ngx-electron';
import { InvestmentAssetProtocolService as InvestmentAssetService } from '../../../common/services/protocol/investment-asset.service';

@Component({
  selector: 'app-dashboard-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  @Input() public investment: Invest;
  @Input() public collapsed: boolean;

  public OPEN = OPEN;
  public SOLD = SOLD;
  public PENDING = PENDING;
  //
  public LOCKED = LOCKED;
  public TX_AGREEMENT_PENDING = TX_AGREEMENT_PENDING;
  public TX_AGREED = TX_AGREED;
  public TX_INVEST_PENDING = TX_INVEST_PENDING;
  public TX_INVESTED = TX_INVESTED;

  public explorerUrl = (<any>env).BLOCK_EXPLORER_URL;

  constructor(private electronService: ElectronService,
  private investmentAssetService: InvestmentAssetService) { }

  ngOnInit() {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  public calculateReturnAmount() {
    return this.investment.totalAmount * (1 + this.investment.roi);
  }

  public calculatePaybackDate() {
    const paybackDate = new Date(this.investment.investedIn);
    paybackDate.setMonth(paybackDate.getMonth() + this.investment.paybackMonths);
    return paybackDate;
  }

  public statusToString(status) {
    let statusString;
    switch (status) {
      case this.LOCKED:
        statusString = 'Pending ' + this.investment.companyName + '\'s confirmation';
        break;
      case this.TX_AGREEMENT_PENDING:
        statusString = 'Pending ' + this.investment.companyName + '\'s confirmation';
        break;
      case this.TX_AGREED:
        statusString = 'Asset accepted by ' + this.investment.companyName;
        break;
      case this.TX_INVEST_PENDING:
        statusString = 'Pending Ethereum confirmation';
        break;
      case this.TX_INVESTED:
        statusString = 'Asset succesfully invested';
        break;
    }

    return statusString;

  }

  public exploreContract(address: string) {
    const url = this.explorerUrl + address;
    this.electronService.ipcRenderer.sendSync('open-browser', url);
  }

  public transferFunds(asset: any) {
    const ethusd = 340.0;
    const agreementTermsHash = '67e49469e62a9805e43744ec4437a6dcf6c6bc36d6a33be837e95b8d325816ed';
    const value = asset.value / ethusd;
    // should be event.id
    this.investmentAssetService.transferFunds(asset.uuid, agreementTermsHash, asset.contractAddress, value);
  }

}
