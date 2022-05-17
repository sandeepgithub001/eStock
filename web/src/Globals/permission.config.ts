import { Injectable } from "@angular/core";
import { AuthenticationService } from "src/app/Services/authentication.service";
import { NgxPermissionsService } from "ngx-permissions";


@Injectable({
  providedIn: 'root'
})

export class PermissionsConfig {
  currentUser: any;
  userPermissions: any = [];

  constructor(
    public authenticationService: AuthenticationService,
    private permissionsService: NgxPermissionsService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getPermissions(featureName: string) {
    this.userPermissions = JSON.parse(localStorage.getItem('userPermissions'));
    let obj = this.userPermissions.filter(x => x.FeatureName == featureName)[0];
    this.permissionsService.removePermission("View");
    this.permissionsService.removePermission("Insert");
    this.permissionsService.removePermission("Edit");
    this.permissionsService.removePermission("Delete");

    if (obj.Access == 1) {
      const perm = ["View"];
      this.permissionsService.addPermission(perm);
    }
    else if (obj.Access == 2) {
      this.permissionsService.addPermission(["Insert"]);
    }
    else if (obj.Access == 3) {
      this.permissionsService.addPermission(["View", "Insert"]);
    }
    else if (obj.Access == 5) {
      this.permissionsService.addPermission(["View", "Edit"]);
    }
    else if (obj.Access == 7) {
      this.permissionsService.addPermission(["View", "Insert", "Edit"]);
    }
    else if (obj.Access == 8) {
      this.permissionsService.addPermission(["View", "Delete"]);
    }
    else if (obj.Access == 15) {
      this.permissionsService.addPermission(["View", "Insert", "Edit", "Delete"]);
    }
    else{
      this.permissionsService.addPermission(["unAuthorized"]);
    }
    // debugger;
    // var asdf24234asdf = this.permissionsService.getPermissions();
    // debugger;
  }

  validatePermissions() {

  }
}


