import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public showModal: boolean = false;

  public showModalObservable: Observable<boolean> = new Observable<boolean>(
    (obs) => {
      obs.next(this.showModal);
      obs.complete();
    }
  );

  constructor() {}

  public getShowModal = () => {
    return this.showModal;
  };

  public toggleShowModal = () => {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  };
}
