import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PointOfInterest } from '../domain/point-of-interest';
import { Category } from '../domain/category';
import { backend_url } from '../config/backend_url';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private newPointsOfInterests = new Subject<Array<PointOfInterest>>();

  private searchQuery = "";
  private selectedCategories = new Set<Category>();
  
  newPointsAnnounced = this.newPointsOfInterests.asObservable();

  constructor(private restClient: RestService) { }

  announceNewQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.emitSearch();
  }

  announceNewCategories(newCategories: Set<Category>) {
    this.selectedCategories = newCategories;
    this.emitSearch();
  }

  emitSearch() {
    this.search(this.searchQuery, Array.from<Category>(this.selectedCategories).map(c => c.id))
    .subscribe(pois => {
      this.newPointsOfInterests.next(pois);
    });
  }

  private search(query: string, categories: number[]): Observable<PointOfInterest[]> {
    return this.restClient.post<PointOfInterest[]>(backend_url + '/points_of_interest/search', 
    {query: query, categories: categories});
  }
}
