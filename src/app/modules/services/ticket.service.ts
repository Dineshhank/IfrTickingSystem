import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'https://intellifer-001-site5.btempurl.com/api/'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  
  // Example method to post data to the server
  getTicketList(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.apiUrl+'Ticket/GetTicketListByProjectId?projectId=' + id);
  }

  updateTicket(data:any){
    console.log(data)
    return this.http.put<any>(this.apiUrl+'Ticket/UpdateTicket', data);
  }

  deleteTicket(id:any){
    
    return this.http.delete<any>(this.apiUrl+'Ticket/DeleteTicketById?id=' + id);
  }
  
}

