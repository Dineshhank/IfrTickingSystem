import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CreateProjectService } from 'app/modules/services/create-project.service';
import { CreateTicketService } from 'app/modules/services/create-ticket.service';
import { MasterService } from 'app/modules/services/master.service';
import { MaterialModule } from 'material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,NgxMatSelectSearchModule]
})


export class CreateProjectComponent {
  
  url: string | ArrayBuffer;
  selectedFile: File | null = null;

  searchClient = new FormControl();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  startDate = new Date(2023, 0, 1);

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  formValue!: FormGroup;
 
  dataSource !: MatTableDataSource<any>;
  clientList: any;
  filteredClient: any;

  constructor( private dialog: MatDialog,private formBuilder : FormBuilder,private http: HttpClient , private _snackBar: MatSnackBar,
    private service : CreateProjectService , private masterService : MasterService ){}


    ngOnInit(): void
    {
  
      this.formValue = this.formBuilder.group({
        name :['',[Validators.required]],
        clientName :['',[Validators.required]],
        startDate :["",[Validators.required]],
        endDate:['',[Validators.required]],
        description:["",[Validators.required]],
      })

      this.searchClient.valueChanges.subscribe((value) => {
        console.log(value)
        this.filterClient(value);
      });

      this.getAllClient()
    }


  onSelectFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.displayFile(file);
    }
  }
  
  removeFile() {
    this.selectedFile = null;
    this.url = null;
    // Clear the displayed file, e.g., by setting this.url to null or an empty string.
  }
  
  
  displayFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.url = event.target.result;
    };
  }


  getAllClient(){
    this.masterService.getAllClient().subscribe((res:any) => {
      console.log(res)
      this.clientList = res
      this.filteredClient = res
    })
  }


  filterClient(value: string) {
    console.log(value)
    if (value) {
      console.log(value)
      this.filteredClient = this.clientList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredClient = this.clientList; // Show all items when search is empty
    }
    console.log(this.filteredClient)
  }
 


  getFormData(){


    const formData = this.formValue.value;
    console.log(formData);

    const { value } = this.formValue;
    console.log(value);

    let projectData = {

      clientId: value.clientName.id,
      name : value.name,
      clientName :value.clientName.name,
      startDate :value.startDate,
      endDate:value.endDate,
      description:value.description,

    }


    
      // Call the service method to post data
    this.service.createProject(projectData).subscribe(
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
