import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent }     from './components/filters/filters.component';

const routes: Routes = [
  { path: '', component: FiltersComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}