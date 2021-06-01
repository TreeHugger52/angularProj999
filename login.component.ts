import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";
import { AuthResponse, ServerQueryService } from "../_services/server-query.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('f') loginForm: NgForm;
  loggedIn: boolean = false;
  status: string = '';

  constructor(private router: Router, private sq: ServerQueryService, ) {}

  LoginAttempt(loginData: NgForm) {
    let obs: Observable < AuthResponse >;

    if (!loginData.valid) {
      this.status = 'Invalid user ID or pin.'
      return;
    }

    if (!this.loggedIn) {
      //login auth process here <--
      obs = this.sq.normalLoginAttempt(loginData.value);
      this.router.navigate(['./in-use']);
    }

    obs.subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      });


    loginData.reset();
  }

  onAdminAttempt() {
    /*   if(!this.uid || !this.pin) {
         this.status = 'Invalid user ID or pin.'
       }
       //admin auth process here <--
       this.router.navigate(['./admin']);*/
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
