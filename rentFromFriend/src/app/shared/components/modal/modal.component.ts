import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  //modalService is used to handle if the modal should be displayed or not
  constructor(public modalService: ModalService) {}

  //Prop for displaying a induviduel Titel in different usecases
  @Input()
  titel: string;

  ngOnInit(): void {}
}
