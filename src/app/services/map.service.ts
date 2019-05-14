import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PointOfInterest } from '../domain/point-of-interest';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private pointSelected = new Subject<PointOfInterest>();
  private cardCanceled = new Subject();
  private newPoint = new Subject<[number, number]>();

  pointSelectedAnnounced = this.pointSelected.asObservable();
  newPointAnnounced = this.newPoint.asObservable();
  cardCanceledAnnounced = this.cardCanceled.asObservable();

  constructor() { }

  announcePointSelected(point: PointOfInterest) {
    this.pointSelected.next(point);
  }

  announceCardCanceled() {
    this.cardCanceled.next();
  }

  announceNewPoint(lat: number, lng: number) {
    this.newPoint.next([lat, lng]);
  }
}
