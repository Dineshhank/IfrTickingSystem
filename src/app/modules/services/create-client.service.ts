import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {

  private apiUrl = 'https://intellifer-001-site5.btempurl.com/api/'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  
  // Example method to post data to the server
  createClient(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl+'Client/AddClient', data);
  }
  
  updateClient(data:any){
    console.log(data)

    return this.http.put<any>(this.apiUrl+'Client/UpdateClient', data);
  }

  deleteClient(id:number){
    return this.http.delete<any>(this.apiUrl+'Client/DeleteClientById?id=' + id);
  }


  GetClientById(id:number){
    return this.http.get<any>(this.apiUrl+'Client/GetClientById?id=' + id);
  }

}
