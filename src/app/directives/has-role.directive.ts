import { Directive, OnInit, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole: string;
  isVisible = false;

  /**
   * @param {ViewContainerRef} viewContainerRef 
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef 
   *   -- the templateRef to be potentially rendered
   * @param {AuthenticationService} authenticationService 
   *   -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    if ((this.hasRole == "admin" && this.authenticationService.isAdmin()) 
    || (this.hasRole == "user" && !this.authenticationService.isAdmin())) {
      this.isVisible = true;
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.isVisible = false;
      this.viewContainerRef.clear();
    }
  }
}