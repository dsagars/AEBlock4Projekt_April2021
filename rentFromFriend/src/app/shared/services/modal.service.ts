import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  public activeModal = {
    showModalOffer: false,
    showModalSearch: false,
  };

  public toggleShowModalOffer() {
    this.activeModal.showModalOffer = !this.activeModal.showModalOffer;
  }

  public toggleShowModalSearch() {
    this.activeModal.showModalSearch = !this.activeModal.showModalSearch;
  }

  public getActiveModal() {
    for (const [key, value] of Object.entries(this.activeModal)) {
      if (value) {
        return key;
      }
    }
  }

  public closeAll() {
    for (const key in this.activeModal) {
      this.activeModal[key] = false;
    }
  }
}
