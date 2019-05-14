import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.css']
})
export class FormPanelComponent implements OnInit {

  constructor(private mapService: MapService) { }

  cancel() {
    this.mapService.announceCardCanceled();
  }

  ngOnInit() {
  }
}
