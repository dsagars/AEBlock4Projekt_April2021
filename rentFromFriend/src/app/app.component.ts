import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rentFromFriend';

  constructor(public modalService: ModalService) {}
}
