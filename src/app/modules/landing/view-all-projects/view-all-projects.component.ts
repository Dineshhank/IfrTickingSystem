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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CreateProjectService } from 'app/modules/services/create-project.service';
import { MasterService } from 'app/modules/services/master.service';
import { TicketService } from 'app/modules/services/ticket.service';
import { MaterialModule } from 'material.module';


export interface PeriodicElement {
  clientName: string;
  projectName: string;
  startDate: string;
  endDate: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {projectName: 'Made-in', clientName: 'Made-in', startDate: '12-10-2023', endDate: '30-12-2023'},
  {projectName: 'Drawing Approval', clientName: 'KSB', startDate: '10-04-23', endDate: '30-06-2023'},
  {projectName: 'Made-in', clientName: 'Made-in', startDate: '12-10-2023', endDate: '30-12-2023'},
  {projectName: 'Drawing Approval', clientName: 'KSB', startDate: '10-04-23', endDate: '30-06-2023'},
];


@Component({
  selector: 'app-view-all-projects',
  templateUrl: './view-all-projects.component.html',
  styleUrls: ['./view-all-projects.component.scss'],
  standalone     : true,
  imports        : [CommonModule,RouterLink, NgIf, NgClass, NgFor, CdkScrollable,MaterialModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule]
})


export class ViewAllProjectsComponent {

  projectId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute , private router: Router , private service : MasterService , private _fuseConfirmationService: FuseConfirmationService,
    private _snackBar: MatSnackBar , private projectService:CreateProjectService) { }
 

  displayedColumns: string[] = ['projectName', 'clientName', 'startDate', 'endDate','actions'];
  dataSource = new MatTableDataSource;
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(){
    this.getAllProjects()
  }


  getAllProjects(){
    this.service.getAllProject().subscribe((res)=>{
      console.log(res)
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
}


navigateToViewProject(data:any){
  console.log(data)
  const objectString = JSON.stringify(data);
  console.log(objectString)

  const queryParams = { objectParam: objectString };
  console.log(queryParams)
  this.router.navigate(['/view-project'], { queryParams });
}


delete(element : any){
  console.log(element)


  const confirmation = this._fuseConfirmationService.open({
    title  : 'Delete Project',
    message: 'Are you sure you want to delete this project?',
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

  this.projectService.deleteProject(element.id).subscribe((res:any) => {
    console.log(res)
    this.openSnackbar(res)
    this.getAllProjects()
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
