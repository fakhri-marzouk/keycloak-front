import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})

export class SchoolComponent implements OnInit{
  ngOnInit(): void {
    this.getData();
  }
  constructor(private HttpClient: HttpClient,private router:Router) {

  }

  // @ts-ignore
  onSubmit(): Observable<any> {
    return this.HttpClient.get("http://localhost:8223/api/v1/students/school/1");
  }

  getData() {
    this.onSubmit().subscribe((data) => {
      console.log(data);
    });
  }
}
