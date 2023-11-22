import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CreateClientService } from 'app/modules/services/create-client.service';
import { MasterService } from 'app/modules/services/master.service';
import { TicketService } from 'app/modules/services/ticket.service';
import { MaterialModule } from 'material.module';


export interface PeriodicElement {
  message: string;
  subject: string;
  priority: string;
  status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {subject: 'Task', message: 'Hydrogen', priority: 'Low', status: 'In-Progress'},
  {subject: 'Task', message: 'Hydrogen', priority: 'Low', status: 'In-Progress'},
  {subject: 'Task', message: 'Hydrogen', priority: 'Medium', status: 'Completed'},
  {subject: 'Task', message: 'Hydrogen', priority: 'High', status: 'Completed'},
];


@Component({
  selector: 'app-view-all-clients',
  templateUrl: './view-all-clients.component.html',
  styleUrls: ['./view-all-clients.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule]
})

export class ViewAllClientsComponent {

  projectId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute , private router: Router , private service : MasterService , private _fuseConfirmationService: FuseConfirmationService,
    private _snackBar: MatSnackBar , private clientService : CreateClientService) { }


  displayedColumns: string[] = ['name','email','actions'];
  dataSource = new MatTableDataSource;

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit(){
    this.getAllClients()
  }


  getAllClients(){
    this.service.getAllClient().subscribe((res)=>{
      console.log(res)
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
}


navigateToViewClient(data:any){
  // console.log(data)
  //  // Use NavigationExtras to specify query parameters
  //  const navigationExtras: NavigationExtras = {
  //   queryParams: { id: data }
  // };

  // // Navigate to /ticket-list with the projectId as a query parameter
  // this.router.navigate(['/view-client'], navigationExtras);

  console.log(data)
    const objectString = JSON.stringify(data);
    console.log(objectString)

    const queryParams = { objectParam: objectString };
    console.log(queryParams)
    this.router.navigate(['/view-client'], { queryParams });
}



delete(element : any){
  console.log(element)


  const confirmation = this._fuseConfirmationService.open({
    title  : 'Delete Client',
    message: 'Are you sure you want to delete this client?',
    actions: {
        confirm: {
            label: 'Delete'
        }
    }
});

confirmation.afterClosed().subscribe((result) => {

  // If the confirm button pressed...
  if ( result === 'confirmed' )
  {
   console.log("deleted")

  this.clientService.deleteClient(element.id).subscribe((res:any) => {
    console.log(res)
    this.openSnackbar(res)
    this.getAllClients()
  })
  
  }
}) 

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed', result);
  //   // You can handle the result returned from the dialog if needed
  // });

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
