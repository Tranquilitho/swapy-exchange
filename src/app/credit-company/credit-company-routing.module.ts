import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditCompanyComponent } from './credit-company.component';
import { StartComponent } from './start/start.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCollateralComponent } from './add-collateral/add-collateral.component';
import { ApproveInvestmentComponent } from './approve-investment/approve-investment.component';
import { RefuseInvestmentComponent } from './refuse-investment/refuse-investment.component';
import { ReturnInvestmentComponent } from './return-investment/return-investment.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ConfirmOfferComponent } from './confirm-offer/confirm-offer.component';
import { TermsPageComponent } from './terms-page/terms-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AddFundsComponent } from '../common/add-funds/add-funds.component';
import { AddFundsChildComponent } from '../common/add-funds/add-funds-child/add-funds-child.component';
import { MessageComponent } from '../common/message/message.component';

const routes: Routes = [
  {
    path: '',
    component: CreditCompanyComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'start', component: StartComponent },
      { path: 'add-funds', component: AddFundsComponent },
      { path: 'add-funds/child', component: AddFundsChildComponent },
      { path: 'raise', component: AddOfferComponent },
      { path: 'raise/confirm', component: ConfirmOfferComponent },
      { path: 'add-collateral', component: AddCollateralComponent },
      { path: 'approve-investment', component: ApproveInvestmentComponent },
      { path: 'refuse-investment', component: RefuseInvestmentComponent },
      { path: 'return-investment', component: ReturnInvestmentComponent },
      { path: 'terms-of-service', component: TermsPageComponent },
      { path: 'privacy-policy', component: PrivacyPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'message', component: MessageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditCompanyRoutingModule { }
