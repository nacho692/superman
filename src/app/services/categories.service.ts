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
  private modifiedCategoryProposals = new Subject();
  private showProposals = new Subject();

  showProposalsAnnounced = this.showProposals.asObservable();
  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  modifiedCategoryProposalsAnnounced = this.modifiedCategoryProposals.asObservable();
  
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

  announceProposedCategory(payload: any) {
    this.http.post<any>(backend_url + '/proposed_categories', payload).subscribe(res => {
      console.log(res);
    });
  }

  announceAcceptedCategory(category: Category) {
    this.http.post<any>(backend_url + '/accept_category', category);
    this.modifiedCategoryProposals.next();
  }

  announceRejectedCategory(category: Category) {
    this.http.post<any>(backend_url + '/reject_category', category);
    this.modifiedCategoryProposals.next();
  }
}
