import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../config/backend_url'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private newCategoryProposal = new Subject();
  private modifiedCategories = new Subject();
  private showProposals = new Subject();

  showProposalsAnnounced = this.showProposals.asObservable();
  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  modifiedCategoriesAnnounced = this.modifiedCategories.asObservable();
  
  constructor(private http: HttpClient) {}

  getProposedCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(backend_url + '/proposed_categories');
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(backend_url + '/categories');
  }

  announceNewCategoryProposal() {
    this.newCategoryProposal.next();
  }
  
  announceShowProposals() {
    this.showProposals.next();
  }

  announceProposedCategory(name: string, description: string) {
    this.http.post(backend_url + '/proposed_categories', {name, description}, {responseType: 'json'}).subscribe(res => {
    });
  }

  save(category: Category) {
    this.http.post(backend_url + '/categories', category).subscribe(res => {
      this.modifiedCategories.next();
    });
  }

  removeCategoryProposal(category: Category) {
    this.http.delete(backend_url + '/proposed_categories/' + category.id, {responseType: 'text'}).subscribe(res => {
    });
  }
}
