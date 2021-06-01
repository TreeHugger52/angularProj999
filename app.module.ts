import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { InUseComponent } from "./in-use/in-use.component";
import { AdminUtilComponent } from "./admin-util/admin-util.component";
import { ServerQueryService } from "./_services/server-query.service";
import { ServerInterceptorService } from "./_services/server-interceptor.service";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InUseComponent,
    AdminUtilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ServerQueryService, { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
