import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule }        from '@agm/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ContentComponent } from './components/content/content.component';
import { ResultsComponent } from './components/results/results.component';
import { FormPanelComponent } from './components/form-panel/form-panel.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { PointCreateFormComponent } from './components/point-create-form/point-create-form.component';
import { PointViewFormComponent } from './components/point-view-form/point-view-form.component';
import { CategoryProposalComponent } from './components/category-proposal/category-proposal.component';
import { CategoryProposalFormComponent } from './components/category-proposal-form/category-proposal-form.component';
import { LoginComponent } from './components/login/login.component';
import { HasRoleDirective } from './directives/has-role.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    MapComponent,
    TopBarComponent,
    ContentComponent,
    ResultsComponent,
    FormPanelComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    PointCreateFormComponent,
    PointViewFormComponent,
    CategoryProposalComponent,
    CategoryProposalFormComponent,
    LoginComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDP827zHnIce50b1GTB8QPrHOUBFwcsGyw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
