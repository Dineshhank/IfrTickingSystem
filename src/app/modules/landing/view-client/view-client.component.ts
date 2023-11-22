import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateClientService } from 'app/modules/services/create-client.service';
import { MaterialModule } from 'material.module';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,MatChipsModule]
})

export class ViewClientComponent {


  emailList: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  formValue!: FormGroup;
 
  dataSource !: MatTableDataSource<any>;
  clientId: any;
  clientObj: any;


  constructor( private dialog: MatDialog,private formBuilder : FormBuilder,private http: HttpClient , private _snackBar: MatSnackBar, 
       private service : CreateClientService , private route: ActivatedRoute){

        this.route.queryParams.subscribe(params => {
          const objectString = params['objectParam'];
          this.clientObj = JSON.parse(objectString);
          console.log(this.clientObj)
          // Now, you have your object in 'myObject'.
        });
       }



  ngOnInit(): void
  {

    this.formValue = this.formBuilder.group({
      name :[''],
      email :[''],
      password :[''],
      confirmPassword:[''],
      address:[''],
    })

    this.formValue.patchValue({
      name: this.clientObj.name,
      email :this.clientObj.email,
      password :this.clientObj.password,
      confirmPassword:this.clientObj.confirmPassword,
      address:this.clientObj.address,
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
      id: this.clientObj.id,
      name: value.name,
      email :value.email,
      password :value.password,
      confirmPassword:value.confirmPassword,
      address:value.address,

    }


    
      // Call the service method to post data
    this.service.updateClient(clientData).subscribe(
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
