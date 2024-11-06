import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Gender } from '../../../models/Gender';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
dateInput: 'DD/MM/YYYY',
},
display: {
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};
@Component({
selector: 'app-Dashboard',
templateUrl: './Dashboard.component.html',
styleUrls: ['./Dashboard.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class DashboardComponent implements OnInit {
    Permissions: any;
    Dashboard_Edit:boolean;
    Dashboard_Save:boolean;
    Dashboard_Delete:boolean;
 
    missedfollowup_count: number = 1;

    followup_count: number = 1;

     
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
myInnerHeight: number;
    issLoading: boolean;
 
    Login_User: string = "0";
    Menu_Id: number = 17;

     

    Dashboard_Count:number;
    Dashboard_Count1: number;
    Dashboard_Count2:number;
    Dashboard_Count3:number; 
    Dashboard_Count4:number;
    Dashboard_Count5: number;
    Dashboard_Count6:number;
    Dashboard_Count7:number; 
    Dashboard_Count8:number;
 
    Edit_Page_Permission: any;
 

    Graph_Button: boolean = false;

    Enquiry_Source_title = '';
    Enquiry_Source_type = 'PieChart';
    Enquiry_Source_data = [
      
    ];
    Enquiry_Source_columnNames = [];
    Enquiry_Source_options = {
      is3D: true,
    };
    width = 550;
    height = 400;
  


    Title_Bar = '';
  Type_Bar = 'BarChart';
    Data_Bar = [
   
  ];
  columnNames_Bar = ['Source', 'Count'];
  options_Bar = {
    is3D: true,
  };

constructor( public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }

ngOnInit() 
{
    this.Login_User = localStorage.getItem("Login_User");
    this.Permissions = Get_Page_Permission(41);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }
    else
    {
    this.Dashboard_Edit=this.Permissions.Edit;
    this.Dashboard_Save=this.Permissions.Save;
    this.Dashboard_Delete=this.Permissions.Delete;
    this.Get_Dashboard_Count();
    }
} 
Get_Dashboard_Count()
{
    {
            this.issLoading = true;
            
            this.Student_Service_.Get_Dashboard_Count(this.Login_User)
        .subscribe(Rows => 
        {
            
            //console.log(Rows)
            this.Dashboard_Count =Rows.returnvalue.Leads[0].Data_Count;  
            this.Dashboard_Count1=Rows.returnvalue.Leads[1].Data_Count; 
            this.Dashboard_Count2=Rows.returnvalue.Leads[2].Data_Count; 
            this.Dashboard_Count3=Rows.returnvalue.Leads[3].Data_Count; 
            this.Dashboard_Count4=Rows.returnvalue.Leads[4].Data_Count; 
            this.Dashboard_Count5=Rows.returnvalue.Leads[5].Data_Count; 
            this.Dashboard_Count6=Rows.returnvalue.Leads[6].Data_Count; 
            this.Dashboard_Count7=Rows.returnvalue.Leads[7].Data_Count; 
            // console.log(this.Dashboard_Count)    
            
            var Enquiry_Source_data_temp = Rows.returnvalue.Enquiry_Source_data;
           
            var result = [];
             this.Enquiry_Source_columnNames=[];
            for (var i in Enquiry_Source_data_temp)
            {
                result.push([Enquiry_Source_data_temp[i].Enquiry_Source_Name, Enquiry_Source_data_temp[i].Data_Count]);
      
            }
           // var data_temp = new google.visualization.DataTable(result);
            this.Enquiry_Source_columnNames.push('Source')
            this.Enquiry_Source_columnNames.push('Count')
            this.Enquiry_Source_data = result;  
            this.Data_Bar=result; 
               
            this.issLoading = false; 
        },
        Rows => 
        {   
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            this.issLoading = false;
        });
        }
}
Click_No1()
{
    this.router.navigateByUrl('/Lead_Report');
}
Click_No2()
{
      this.router.navigateByUrl('/Registration_Report');  
}
Click_No3()
{
    this.router.navigateByUrl('/Admission_Report');
   
}
Click_No4()
{
    this.router.navigateByUrl('/Receipt_Summary_Report');
   
}
Click_No5()
{
    this.router.navigateByUrl('/Enquiry_Source_Summary');
   
}
Click_No6()
{
    this.router.navigateByUrl('/Enquiry_Source_Report');
}
Click_No7()
{
      this.router.navigateByUrl('/Registration_Summary');  
}

Click_No8()
{
    this.router.navigateByUrl('/Receipt_Summary_Report');
   
}

}

