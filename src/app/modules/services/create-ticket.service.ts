import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private apiUrl = 'https://intellifer-001-site5.btempurl.com/api/Ticket/AddTicket'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Example method to post data to the server
  postData(ticketData: any): Observable<any> {
    console.log(ticketData)
    return this.http.post<any>(this.apiUrl, ticketData);
  }
  

 


}

