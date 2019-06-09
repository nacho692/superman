import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backend_url } from '../config/backend_url'
import { AuthenticationService } from './authentication.service';
import { RestService } from './rest.service';


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
  
  constructor(private restClient: RestService) {}

  getProposedCategories() : Observable<Category[]> {
    return this.restClient.get<Category[]>(backend_url + '/proposed_categories');
  }

  getCategories() : Observable<Category[]> {
    return this.restClient.get<Category[]>(backend_url + '/categories');
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
    this.restClient.post(backend_url + '/proposed_categories', {name, description}).subscribe(res => {
    });
  }

  editCategory(id: number, name: string, description: string, shouldShow: boolean) {
    this.restClient.put(backend_url + '/categories/' + id, {name: name, description: description, should_show: shouldShow})
    .subscribe(res => {
      this.modifiedCategories.next();
    });
  }

  save(category: Category) {
    this.restClient.post(backend_url + '/categories', category).subscribe(res => {
      this.modifiedCategories.next();
    });
  }

  removeCategoryProposal(category: Category) {
    this.restClient.delete(backend_url + '/proposed_categories/' + category.id).subscribe(res => {
    });
  }
}
