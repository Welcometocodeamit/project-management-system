import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpService) { }

  getNextId(elements){
    if(elements.length==0){
      return 1;
    }
    return Number(elements[elements.length-1].id)+1
  }

  

  projects
  users
  leaves

}
