import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { Category } from '../domain/category';
import { PointOfInterest } from '../domain/point-of-interest';
import { POIS } from '../mocks/points-of-interest';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsOfInterestService {
  search(query: string, categories: Category[]): Observable<PointOfInterest[]> {
    query = query.toLowerCase();
    if (query == "" && categories.length == 0) {
      return of(new Array());
    }
    
    return of(POIS.filter(poi => {
      let searchFound: boolean = true
      if (query != "") {
        searchFound = poi.name.toLowerCase().search(query) >= 0;
      }

      let categoryFound: boolean = true
      if (categories.length > 0) {
        categoryFound = poi.categories.some(c => categories.includes(c));
      }

      return searchFound && categoryFound;
    }));
  }

  save(lat: number, lng: number, name: string, description: string, categories: Category[]) {
    POIS.push({
      id: POIS.length,
      name: name,
      description: description,
      latitude: lat,
      longitude: lng,
      categories: categories,
    })
  }
}