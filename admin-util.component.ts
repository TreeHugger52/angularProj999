import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-util',
  templateUrl: './admin-util.component.html',
  styleUrls: ['./admin-util.component.css']
})
export class AdminUtilComponent implements OnInit {

  onCreatePost(postData: {title:string; content:string}){
    console.log(postData);

  }

  constructor() { }

  ngOnInit(): void {
  }

}
