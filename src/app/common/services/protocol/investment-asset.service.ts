import { Injectable } from '@angular/core';

import { Web3Service } from '../web3.service';
import { WalletService } from '../wallet.service';

import * as InvestmentAsset from '../../../../contracts/InvestmentAsset.json';
import * as AssetLibrary from '../../../../contracts/AssetLibrary.json';
import { ProtocolAbstract } from './protocol.abstract';

@Injectable()
export class InvestmentAssetProtocolService extends ProtocolAbstract {

  protected investmentAssetABI = (InvestmentAsset as any).abi;
  private assetLibraryABI = (AssetLibrary as any).abi;
  private assetLibraryAddress = super.getAddressFromBuild(AssetLibrary);

  public getContract(address) {
    const web3 = this.web3Service.getInstance();
    this.contract = new web3.eth.Contract(this.investmentAssetABI, address);
    return this.contract;
  }

  public getLibraryContract(address) {
    const web3 = this.web3Service.getInstance();
    this.contract = new web3.eth.Contract(this.assetLibraryABI, address);
    return this.contract;
  }

  public getEvents(eventUuid, eventName, contractAddress, cb) {
    this.errorLogService.setParamValues([eventUuid, eventName, contractAddress, cb]);
    this.getContract(contractAddress).getPastEvents(eventName, {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      cb(error, events);
    });
  }

  public withdrawFunds(contractAddress: string, success?: Function, error?: Function) {
    this.errorLogService.setParamValues([]);
    const encoded = this.getLibraryContract(this.assetLibraryAddress).methods.withdrawFunds().encodeABI();
    super.signAndSendTransaction(encoded, contractAddress, null, success, error);
  }

  public refuseInvestment(contractAddress: string, success?: Function, error?: Function) {
    const encoded = this.getLibraryContract(this.assetLibraryAddress).methods.refuseInvestment().encodeABI();
    super.signAndSendTransaction(encoded, contractAddress, null, success, error);
  }

  public returnInvestment(contractAddress: string, value: number, success?: Function, error?: Function) {
    const encoded = this.getLibraryContract(this.assetLibraryAddress).methods.returnInvestment().encodeABI();
    const ethusd = 340.0;
    let ethValue = value / ethusd;
    // Round to 18 decimals
    ethValue = Math.round(ethValue * Math.pow(10, 18)) / Math.pow(10, 18);
    super.signAndSendTransaction(encoded, contractAddress, this.web3Service.getInstance().utils.toWei(ethValue), success, error);
  }

  public cancelInvestment(contractAddress: string, success?: Function, error?: Function) {
    const encoded = this.getLibraryContract(this.assetLibraryAddress).methods.cancelInvestment().encodeABI();
    super.signAndSendTransaction(encoded, contractAddress, null, success, error);

  }

}
