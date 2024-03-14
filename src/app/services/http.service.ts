import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  userObservable=new Subject()
  projectObservable=new Subject()
  projectDetailObservable=new Subject()
  leaveTableObservable=new Subject

  // get data 
  getData(){
    return this.http.get('http://localhost:3000/users')
  }

  getManagers(){
    return this.http.get('http://localhost:3000/users?role=Manager')
  }

  getEmployees(){
    return this.http.get('http://localhost:3000/users?role=Developer&role=Tester')
  }

  //add data 
  addData(user){
    return this.http.post('http://localhost:3000/users', user)
  }

  updateUser(id, user){
    return this.http.put(`http://localhost:3000/users/${id}`, user)
  }

  deleteUser(id){
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }

  getProject(){
    return this.http.get('http://localhost:3000/projects')
  }

  addProject(project){
    return this.http.post('http://localhost:3000/projects', project)
  }

  updateProject(projectId, project){
    return this.http.put(`http://localhost:3000/projects/${projectId}`, project)
  }

  deleteProject(projectId){
    return this.http.delete(`http://localhost:3000/projects/${projectId}`)
  }

  updateDeveloper(projectId, project){
    return this.http.put(`http://localhost:3000/projects/${projectId}`, project)
  }

  getProjectById(id){
    return this.http.get(`http://localhost:3000/projects/${id}`)
  }

  getAllLeaves(){
    return this.http.get(`http://localhost:3000/leaves`)
  }

  addLeave(leave){
    return this.http.post(`http://localhost:3000/leaves`, leave)
  }

  deleteLeave(id){
    return this.http.delete(`http://localhost:3000/leaves/${id}`)
  }
}
