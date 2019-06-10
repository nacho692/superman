import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MapComponent } from './components/osm-map/map.component';
import { AgmCoreModule }        from '@agm/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ContentComponent } from './components/content/content.component';
import { ResultsComponent } from './components/results/results.component';
import { FormPanelComponent } from './components/form-panel/form-panel.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { PointCreateFormComponent } from './components/point-of-interest/point-create-form/point-create-form.component';
import { PointViewFormComponent } from './components/point-of-interest/point-view-form/point-view-form.component';
import { LoginComponent } from './components/login/login.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { CategoryProposalFormComponent } from './components/categories/category-proposal-form/category-proposal-form.component';
import { ShowProposalsButtonComponent } from './components/categories/show-proposals-button/show-proposals-button.component';
import { ProposedCategoriesFormComponent } from './components/categories/proposed-categories-form/proposed-categories-form.component';
import { CategoryProposalButtonComponent } from './components/categories/category-proposal-button/category-proposal-button.component';
import { CategoryProposalEditFormComponent } from './components/categories/category-edit-form/category-edit-form.component';
import { PointEditFormComponent } from './components/point-of-interest/point-edit-form/point-edit-form.component';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { provideConfig } from 'socialloginConfig';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

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
    CategoryProposalButtonComponent,
    CategoryProposalFormComponent,
    LoginComponent,
    ShowProposalsButtonComponent,
    ProposedCategoriesFormComponent,
    CategoryProposalEditFormComponent,
    PointEditFormComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    AngularOpenlayersModule,
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDP827zHnIce50b1GTB8QPrHOUBFwcsGyw'
    })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
