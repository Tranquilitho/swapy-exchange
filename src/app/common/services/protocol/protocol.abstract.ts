import { Injectable } from '@angular/core';
import { Web3Service } from '../web3.service';
import { WalletService } from '../wallet.service';

import { InvestmentAssetInterface as ia } from '../../../../../contracts/InvestmentAsset';


@Injectable()
export class ProtocolAbstract {
  protected web3;
  protected contract;
  protected abi;
  protected gas = 5000000;

  constructor(protected web3Service: Web3Service, private walletService: WalletService) {
    this.web3 = this.web3Service.getInstance();
  }

  protected getWallet() {
    return this.walletService.getWallet();
  }

  public getContract(address) {
    if (!this.contract) {
      this.contract = new this.web3.eth.Contract(this.abi, address);
    }
    return this.contract;
  }

  public signAndSendTransaction(encoded: string, address: string, value?: number, success?: Function, error?: Function) {
    const tx = {
      from: this.getWallet().address,
      to: address,
      nonce: this.web3.eth.getTransactionCount(this.getWallet().address),
      chainId: this.web3.eth.net.getId(),
      data: encoded,
      gas: this.gas
    } as any;

    if (value) {
      tx.value = value;
    }
    this.web3.eth.accounts.signTransaction(tx, this.getWallet().privateKey).then((signed) => {
      this.web3.eth.sendSignedTransaction(signed.rawTransaction)
        .on('error', error)
        .on('receipt', success);
    });
  }

  public getEvents(eventUuid, cb, contractAddress) {
    // new this.web3.eth.Contract(ia.abi, '0x5de6b9a0ccb34815a895848dfc619c1c6ebccdb9').getPastEvents('Agreements', {
    //   fromBlock: 0,
    //   toBlock: 'latest'
    // }, (error, events) => {console.log(events)});
    this.getContract(contractAddress).getPastEvents('Offers', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => { console.log(events); cb(error, events.filter(event => event.returnValues._id === eventUuid)) });
  }
}
