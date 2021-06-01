import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerQueryService} from "../_services/server-query.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-in-use',
  templateUrl: './in-use.component.html',
  styleUrls: ['./in-use.component.css']
})
export class InUseComponent implements OnInit, OnDestroy {
  isUserSessionActive = false;
  userObject: Subscription;
  uid: string;
  constructor(private sq: ServerQueryService) { }

  ngOnInit(): void {
    this.userObject = this.sq.user.subscribe(res => {
      this.isUserSessionActive = !!res;
      this.uid = res.uid;
    });
  }
  ngOnDestroy(): void {

  }

}
