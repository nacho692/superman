import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../config/backend_url'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private newCategoryProposal = new Subject();
  private modifiedCategoryProposals = new Subject();

  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  modifiedCategoryProposalsAnnounced = this.modifiedCategoryProposals.asObservable();
  
  constructor(private http: HttpClient) {
  }

  getProposedCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(backend_url + '/proposed_categories');
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(backend_url + '/categories');;
  }

  announceNewCategoryProposal() {
    this.newCategoryProposal.next();
  }

  announceProposedCategory(name: string, description: string) {
    let proposed_category: Category = { id: 0, name: name, description: description };
    return this.http.post<Category>(backend_url + '/', proposed_category)
    //let nextId = PROPOSED_CATEGORIES.length;
    //CATEGORIES.push({
    //  name: name,
    //  description: description,
    //  id: nextId
    //})
  }

  announceAcceptedCategory(category: Category) {
    //let nextId = CATEGORIES.length;
    //CATEGORIES.push({
    //  name: category.name,
    //  description: category.description,
    //  id: nextId
    //})
    this.modifiedCategoryProposals.next();
  }

  announceRejectedCategory(rejected_category: Category) {
    //PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(category => {
    //  return category != rejected_category;
    //});
    this.modifiedCategoryProposals.next();
  }
}
