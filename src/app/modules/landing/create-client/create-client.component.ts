import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateClientService } from 'app/modules/services/create-client.service';
import { FuseValidators } from '@fuse/validators';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,MatChipsModule]
})


export class CreateClientComponent {


  emailList: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  formValue!: FormGroup;
 
  dataSource !: MatTableDataSource<any>;


  constructor( private dialog: MatDialog,private formBuilder : FormBuilder,private http: HttpClient , private _snackBar: MatSnackBar, 
       private service : CreateClientService){}



  ngOnInit(): void
  {

    this.formValue = this.formBuilder.group({
      name :['',[Validators.required]],
      email :['',[Validators.required,Validators.email]],
      password :['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      address:[''],
    }, {
      validators: FuseValidators.mustMatch('password', 'confirmPassword'),
  })
  }




  addEmail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.isValidEmail(value) && this.emailList.indexOf(value) === -1) {
      this.emailList.push(value);
    }

    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
  }


  removeEmail(email: string): void {
    const index = this.emailList.indexOf(email);

    if (index >= 0) {
      this.emailList.splice(index, 1);
    }
  }

  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  
  getFormData(){

    const formData = this.formValue.value;
    console.log(formData);


    const { value } = this.formValue;
    console.log(value);

    let clientData = {

      name : value.name,
      contactInfo: value.description,
      password: value.password,
      email: value.email

    }

    console.log(clientData)

    
      // Call the service method to post data
    this.service.createClient(clientData).subscribe(
      (response) => {
        console.log('Data successfully sent:', response);
        this.openSnackbar(response)
        this.formValue.reset();
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
