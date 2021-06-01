import {NgModule} from "@angular/core";

import {LoginComponent} from "./login/login.component";
import {InUseComponent} from "./in-use/in-use.component";
import {AdminUtilComponent} from "./admin-util/admin-util.component";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'in-use', component: InUseComponent },
  { path: 'admin', component: AdminUtilComponent },
  { path: '**', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
