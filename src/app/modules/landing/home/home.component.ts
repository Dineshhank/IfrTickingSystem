import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { CreateTicketService } from 'app/modules/services/create-ticket.service';
import { MasterService } from 'app/modules/services/master.service';
import { MaterialModule } from 'material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,NgxMatSelectSearchModule]
})

export class LandingHomeComponent
{
   

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
   
    formValue!: FormGroup;
   
    dataSource !: MatTableDataSource<any>;
    clientId: any;
    projectList: any;
    userType:string;
  
    constructor( private dialog: MatDialog,private formBuilder : FormBuilder,private http: HttpClient , private _snackBar: MatSnackBar,
      private service : MasterService , private router: Router){}
  
  
    ngOnInit(): void
    {

        this.clientId = sessionStorage.getItem('userId');
        this.userType = sessionStorage.getItem('userType')
  
        this.service.getProjectListByClientId(this.clientId).subscribe((res:any) => {
            console.log(res)

            this.projectList = res
          })
     
    }


    
  
  
    navigateToTicketList(id:number){
        console.log(id)
       // Use NavigationExtras to specify query parameters
  const navigationExtras: NavigationExtras = {
    queryParams: { id: id }
  };

  // Navigate to /ticket-list with the projectId as a query parameter
  this.router.navigate(['/ticket-list'], navigationExtras);
    }
   

}
