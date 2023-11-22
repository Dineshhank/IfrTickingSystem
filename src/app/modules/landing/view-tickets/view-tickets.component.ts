import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateTicketService } from 'app/modules/services/create-ticket.service';
import { TicketService } from 'app/modules/services/ticket.service';
import { MaterialModule } from 'material.module';


@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule]
})


export class ViewTicketsComponent {
  ticketObj: any;
  viewTicketForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  formValue!: FormGroup;


  constructor(private route: ActivatedRoute , private formBuilder : FormBuilder , private service : CreateTicketService, private _snackBar: MatSnackBar,
    private ticketService :TicketService) {

    this.route.queryParams.subscribe(params => {
      const objectString = params['objectParam'];
      this.ticketObj = JSON.parse(objectString);
      console.log(this.ticketObj)
      // Now, you have your object in 'myObject'.
    });
  }


  ngOnInit(){
    this.viewTicketForm = this.formBuilder.group({
      name :[''],
      email :[''],
      subject :[''],
      priority:[''],
      message:[''],
      status:['']
    })

    this.viewTicketForm.patchValue({
      name: this.ticketObj.title,
      email :this.ticketObj.email,
      subject :this.ticketObj.subject,
      priority:this.ticketObj.priority,
      message:this.ticketObj.description,
      status:this.ticketObj.status
    })
  }



  getFormData(){

    const formData = this.viewTicketForm.value;
    console.log(formData);

    const { value } = this.viewTicketForm;
    console.log(value);

    let ticketData = {
      id:this.ticketObj.id,
      projectId : this.ticketObj.projectId,
      title : value.name,
      email :value.email,
      subject :value.subject,
      priority:value.priority,
      description:value.message,
      status:value.status
    }


    console.log(ticketData)

    
       // Call the service method to post data
    this.ticketService.updateTicket(ticketData).subscribe(
      (response) => {
        console.log('Data successfully sent:', response);
        this.openSnackbar(response)
        // You can handle the response here if needed
      },
      (error) => {
        console.error('Error sending data:', error);
        this.openErrorSnackbar(error)
        // Handle errors here
      }
    );
  }


     //Response Snackbar start//
openErrorSnackbar(res:any){
  this._snackBar.open(res.Message,"",{
    duration:4000,
    panelClass: ['error-snackbar']
  })
}


openSnackbar(res:any){
  this._snackBar.open(res.Message,"",{
    duration:4000,
    panelClass: ['success-snackbar']
  })
}
//Response Snackbar End//

}



