import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  checkToken() {
    let key = 'auth_app_token';
    const token = localStorage.getItem(key);
    alert(`Token armazenado comp3: ${token}`);
  }

  validRequest() {
    this.getCoconuts().subscribe(res => {
      let result = "";
      res.forEach(function (value) {
        result += `Id: ${value.id} - Name: ${value.name} - Size: ${value.size}\n`;
      });
      alert(result);
    });
  }

  public getCoconuts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://localhost:8080/coconuts/get`);
  }

}
