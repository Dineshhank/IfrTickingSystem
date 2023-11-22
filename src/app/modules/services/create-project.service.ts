import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

  private apiUrl = 'https://intellifer-001-site5.btempurl.com/api/'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Example method to post data to the server
  createProject(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl+'Project/AddProject', data);
  }
  
  updateProject(data :any){
    console.log(data)
    return this.http.put<any>(this.apiUrl+'Project/UpdateProject', data);
  }

  deleteProject(id:number){
    return this.http.delete<any>(this.apiUrl+'Project/DeleteProjectByid?id=' + id);
  }
  
}
