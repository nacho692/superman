import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { Category } from '../domain/category';
import { PointOfInterest } from '../domain/point-of-interest';
import { Observable, of } from 'rxjs';
import { backend_url } from '../config/backend_url'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class PointsOfInterestService {

  constructor(private http: HttpClient) {}

  search(query: string, categories: number[]): Observable<PointOfInterest[]> {
    return this.http.post<PointOfInterest[]>(backend_url + '/search_pois', {query: query, categories: categories});
  }

  save(lat: number, lng: number, name: string, description: string, categories: number[], image_url: string) {
    let poi = {name: name, description: description, lat: lat, lng: lng, categories: categories, image_url: image_url};
    console.log(JSON.stringify(poi));
    this.http.post<any>(backend_url + '/save_poi', poi);
  }
}