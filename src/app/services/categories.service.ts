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

  newCategoryProposalAnnounced = this.newCategoryProposal.asObservable();
  
  constructor() {}

  proposedCategories() : Observable<ProposedCategory[]> {
    return of(PROPOSED_CATEGORIES);
  }

  getCategories() : Observable<Category[]> {
    return of(CATEGORIES);
  }

  proposeCategory(name: string, description: string) {
    let nextId : number = this.proposedCategories.length + 1;
    PROPOSED_CATEGORIES.push({
      id: nextId,
      description: description,
      name: name
    });
  }

  announceNewCategoryProposal() {
    this.newCategoryProposal.next();
  }
}
