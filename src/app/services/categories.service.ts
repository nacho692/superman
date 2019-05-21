import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { CATEGORIES } from '../mocks/categories';
import { PROPOSED_CATEGORIES } from '../mocks/proposed-categories'
import { Observable, of, Subject } from 'rxjs';
import { ProposedCategory } from '../domain/proposed-category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private newCategoryProposal = new Subject();
  private modifiedCategoryProposals = new Subject();

  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  modifiedCategoryProposalsAnnounced = this.modifiedCategoryProposals.asObservable();
  
  constructor() {}

  proposedCategories() : Observable<ProposedCategory[]> {
    return of(PROPOSED_CATEGORIES);
  }

  getCategories() : Observable<Category[]> {
    return of(CATEGORIES);
  }

  announceNewCategoryProposal() {
    this.newCategoryProposal.next();
  }

  

  announceAcceptedCategory(category: ProposedCategory) {
    let nextId = CATEGORIES.length;
    CATEGORIES.push({
      name: category.name,
      description: category.description,
      id: nextId
    })
    this.modifiedCategoryProposals.next();
  }

  announceRejectedCategory(rejected_category: ProposedCategory) {
    PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(category => {
      return category != rejected_category;
    });
    this.modifiedCategoryProposals.next();
  }
}
