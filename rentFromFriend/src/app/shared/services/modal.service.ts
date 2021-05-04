import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public showModalOffer: boolean = false;

  constructor() {}

  public getShowModalOffer = () => {
    return this.showModalOffer;
  };

  public toggleShowModalOffer = () => {
    this.showModalOffer = !this.showModalOffer;
    console.log(this.showModalOffer);
  };
}
