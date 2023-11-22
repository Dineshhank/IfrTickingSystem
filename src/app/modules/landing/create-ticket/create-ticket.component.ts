import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateTicketService } from 'app/modules/services/create-ticket.service';
import { MaterialModule } from 'material.module';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule]
})


export class CreateTicketComponent {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  formValue!: FormGroup;
 
  dataSource !: MatTableDataSource<any>;
  projectId: any;

  constructor( private dialog: MatDialog,private formBuilder : FormBuilder,private http: HttpClient , private _snackBar: MatSnackBar,
    private service : CreateTicketService , private route: ActivatedRoute  ){

      this.route.queryParams.subscribe(params => {
        // Access the 'id' query parameter and store it in the 'projectId' variable
        this.projectId = params['id']; // Use 'id' or the actual parameter name
        console.log(this.projectId);
        // Now you have access to the projectId in this component
      });
  

    }


  ngOnInit(): void
  {

    this.formValue = this.formBuilder.group({
      name :['',[Validators.required]],
      email :['',[Validators.required]],
      subject :['',[Validators.required]],
      priority:['',[Validators.required]],
      message:['',[Validators.required]],
    })


  }



  getFormData(){


    const formData = this.formValue.value;
    console.log(formData);

    const { value } = this.formValue;
    console.log(value);

    let ticketData = {
      projectId : this.projectId,
      title : value.name,
      email :value.email,
      subject :value.subject,
      priority:value.priority,
      description:value.message,
    }

    
       // Call the service method to post data
    this.service.postData(ticketData).subscribe(
      (response) => {
        console.log('Data successfully sent:', response);
        this.openSnackbar(response)
        this.formValue.reset()
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
