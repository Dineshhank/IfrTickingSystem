import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule, NgIf, NgClass, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterialModule } from 'material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { TicketService } from 'app/modules/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule]
})


export class TicketsListComponent {

  projectId: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute , private router: Router , private service : TicketService , private _fuseConfirmationService: FuseConfirmationService,
    private _snackBar: MatSnackBar) { }


  displayedColumns: string[] = ['name','subject', 'message', 'priority', 'status','actions'];
  dataSource = new MatTableDataSource;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Access the 'id' query parameter and store it in the 'projectId' variable
      this.projectId = +params['id']; // '+' is used to convert the parameter to a number
      console.log(this.projectId);
      // Now you have access to the projectId in this component
    });

    this.getTicketListByProjectId()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  navigateToViewTickets(element:any){

    console.log(element)
    const objectString = JSON.stringify(element);
    console.log(objectString)

    const queryParams = { objectParam: objectString };
    console.log(queryParams)
    this.router.navigate(['/view-ticket'], { queryParams });

  }


  getTicketListByProjectId(){
      this.service.getTicketList(this.projectId).subscribe((res)=>{
        console.log(res)
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }


  navigateToCreateTicket(){
   
    // const queryParams = this.projectId ;
    // console.log(queryParams)
    // this.router.navigate(['/create-ticket'], { queryParams });

    if (this.projectId) {
      const queryParams = { id: this.projectId }; // Use 'id' or the actual parameter name
      console.log(queryParams);
      this.router.navigate(['/create-ticket'], { queryParams });
    } else {
      // Handle the case where projectId is not available
      console.error('projectId is not available.');
    }
  }


  delete(element : any){
    console.log(element)


    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete Ticket',
      message: 'Are you sure you want to delete this ticket?',
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

    this.service.deleteTicket(element.id).subscribe((res:any) => {
      console.log(res)
      this.openSnackbar(res)
      this.getTicketListByProjectId()
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





