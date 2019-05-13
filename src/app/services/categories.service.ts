import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { CATEGORIES } from '../mocks/categories';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  getCategories() : Observable<Category[]> {
    return of(CATEGORIES);
  }
}
