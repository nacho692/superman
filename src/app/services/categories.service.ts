import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../config/backend_url'
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private newCategoryProposal = new Subject();
  private modifiedCategories = new Subject();
  private showProposals = new Subject();
  private categoryEdition = new Subject<Category>();

  showProposalsAnnounced = this.showProposals.asObservable();
  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  modifiedCategoriesAnnounced = this.modifiedCategories.asObservable(); // For category acceptance/rejection
  categoryEditionAnnounced = this.categoryEdition.asObservable(); // For category edition purposes
  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getProposedCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(backend_url + '/proposed_categories');
  }

  getCategories() : Observable<Category[]> {
    let params = { caller: this.authenticationService.getCaller() } 
    return this.http.get<Category[]>(backend_url + '/categories', { params: params });
  }

  announceNewCategoryProposal() {
    this.newCategoryProposal.next();
  }
  
  announceShowProposals() {
    this.showProposals.next();
  }

  announceCategoryEdition(category: Category) {
    this.categoryEdition.next(category);
  }

  proposeCategory(name: string, description: string) {
    this.http.post(backend_url + '/proposed_categories', {name, description}, {responseType: 'json'}).subscribe(res => {
    });
  }

  editCategory(id: number, name: string, description: string, shouldShow: boolean) {
    this.http.put(backend_url + '/categories/' + id, {name: name, description: description, should_show: shouldShow}, 
    {responseType: 'json'}).subscribe(res => {
      this.modifiedCategories.next();
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
