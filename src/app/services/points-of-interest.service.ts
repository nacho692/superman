import { Injectable } from '@angular/core';
import { PointOfInterest } from '../domain/point-of-interest';
import { Observable, of, Subject } from 'rxjs';
import { backend_url } from '../config/backend_url'
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { RestService } from './rest.service';



@Injectable({
  providedIn: 'root',
})
export class PointsOfInterestService {

  private editedPoint = new Subject<PointOfInterest>();

  pointEditedAnnouncement = this.editedPoint.asObservable();

  constructor(private restClient: RestService, private searchService: SearchService) {}



  save(lat: number, lng: number, name: string, description: string, categories: number[], imageUrl: string) {
    let payload = {name: name, description: description, lat: lat, lng: lng, categories: categories, image_url: imageUrl};
    this.restClient.post(backend_url + '/points_of_interest', payload).subscribe(res => {
      console.log(res);
    });
  }

  edit(id: number, name: string, description: string, categories: number[], imageUrl: string, shouldShow) {
    let payload = { name: name, description: description, categories: categories, image_url: imageUrl, should_show: shouldShow };
    this.restClient.put(backend_url + '/points_of_interest/' + id, payload).subscribe(res => {
      console.log(res);
      this.searchService.emitSearch();
    });
  }

  announceEdit(point: PointOfInterest) {
    this.editedPoint.next(point);
  }
}