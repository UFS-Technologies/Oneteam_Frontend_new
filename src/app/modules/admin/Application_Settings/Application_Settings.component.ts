
import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
// import { Branch } from '../../../models/Branch';
import { Users } from '../../../models/Users';
// import { Department } from '../../../models/Department';
// import { Department_Status } from '../../../models/Department_Status';
import { Gender } from '../../../models/Gender';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { Users_Service } from '../../../services/Users.Service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Company } from '../../../models/Company';
import { Company_Service } from '../../../services/Company.Service';
import { Application_Settings } from '../../../models/Application_Settings';

// import { Company_Service } from '../../../services/Company.service';

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
selector: 'app-Application_Settings',
templateUrl: './Application_Settings.component.html',
styleUrls: ['./Application_Settings.component.css'],
providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    })

export class Application_SettingsComponent implements OnInit {
   
    Application_Div: boolean = false;

    array: any;
    color = 'primary';
    mode = 'indeterminate';

    issLoading: boolean;

    Login_User: string = "0";
    Menu_Id: number = 55;

    
    Application_Settings_:Application_Settings = new Application_Settings()

    Application_Settings_Data:Application_Settings []
    ImageFile: any;
    File: string;
    file:File;
    companyfile:string;
    Permissions: any;

    Users_Data: Users[];
    Users_Search: Users = new Users();
    Users_Search_Temp: Users = new Users();

    Users_Complaint: Users = new Users();

    // User_Profile_Department_:Department=new Department();
    // User_Profile_Department_c_:Department=new Department();
    // User_Profile_Department_Temp:Department=new Department();
    // User_Profile_Department_Data: Department[];
    Reg_Transfer_Status:boolean=false;
constructor(public User_Details_Service_:Users_Service,public Company_Service_:Company_Service,public Student_Service_: Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) 
{   }
ngOnInit() 
{
    this.Login_User = localStorage.getItem("Login_User");    
    this.Page_Load()   
}
Page_Load()
{
    this.Get_Menu_Status(76,this.Login_User); 
    this.Application_Div=true 
    this.Load_Student_Search_Dropdowns()
    this.Get_Application_Settings();
    
}
Get_Menu_Status(Menu_id, Login_user_id)
{    
this.issLoading = false;
this.User_Details_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {    
    if (Rows[0][0]==undefined)
    {
        if(Menu_id==76)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {      
        if(Menu_id==76)
        {
            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }  
        }
    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Save_Application_Setitngs()
{
    debugger
    this.Application_Settings_.Application_Settings_Id=1;
    this.Application_Settings_.Users_Id=this.Users_Search.Users_Id;
    this.Application_Settings_.Users_Name=this.Users_Search.Users_Name;

    this.Application_Settings_.Complaint_Users_Id=this.Users_Complaint.Users_Id;
    this.Application_Settings_.Complaint_Users_Name=this.Users_Complaint.Users_Name;


    if ( this.Application_Settings_.Users_Id== undefined ||  this.Application_Settings_.Users_Id == null|| this.Application_Settings_.Users_Id==0  ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select staff', Type: "3" } });
        return;
    }
    // if ( this.Application_Settings_.Complaint_Users_Id== undefined ||  this.Application_Settings_.Complaint_Users_Id == null|| this.Application_Settings_.Complaint_Users_Id==0  ) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select staff', Type: "3" } });
    //     return;
    // }

   

    this.issLoading = true;
    debugger
    this.Company_Service_.Save_Application_Settings(this.Application_Settings_).subscribe(Save_status => {
        debugger
            this.issLoading=false;
        if(Number(Save_status[0].Application_Settings_Id_)>0)
        { 
           
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    //    this.Clr_Application_Settings();
    
    }
     
        
        this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 
    });
}

Get_Application_Settings()
{  
    
    this.Company_Service_.Get_Application_Settings().subscribe(Rows =>
        {
       
            
            this.Application_Settings_Data =Rows['Settings_Data']

            if(this.Application_Settings_Data[0]!=undefined){
                this.Application_Settings_=this.Application_Settings_Data[0];
            }

            
            for (var i = 0; i < this.Users_Data.length; i++) {
                if (this.Application_Settings_.Users_Id == this.Users_Data[i].Users_Id)
                this.Users_Search = this.Users_Data[i];
                }


                for (var i = 0; i < this.Users_Data.length; i++) {
                    if (this.Application_Settings_.Complaint_Users_Id == this.Users_Data[i].Users_Id)
                    this.Users_Complaint = this.Users_Data[i];
                    }
    


            //     for (var i = 0; i < this.User_Profile_Department_Data.length; i++) {
            //         if (this.Application_Settings_.Department_Id_Created == this.User_Profile_Department_Data[i].Department_Id)
            //         this.User_Profile_Department_c_ = this.User_Profile_Department_Data[i];
            //         }

                //    else{
        //     this.Application_Settings_.Application_Settings_Id=0;
        //    }
            this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}})
    })
}



// Clr_Application_Settings()
// {
//     // this.Application_Settings_.Application_Settings_Id=0;
//     // this.Application_Settings_.Settings_Value="";
//     this.Application_Settings_.Register_Transfer_Status="";

    
// if(this.User_Profile_Department_Data!=null && this.User_Profile_Department_Data != undefined)
// this.User_Profile_Department_=this.User_Profile_Department_Data[0];



// }





Load_Dropdowns() 
    {
         
    this.User_Details_Service_.Get_Users_Load_Data().subscribe(Rows =>
    {



// this.User_Profile_Department_Data=Rows.Profile_Department;

//    this.User_Profile_Department_Temp.Department_Id = 0;
//    this.User_Profile_Department_Temp.Department_Name = "Select";
//    this.User_Profile_Department_Data.unshift(this.User_Profile_Department_Temp);
//    this.User_Profile_Department_ = this.User_Profile_Department_Data[0];
//    this.User_Profile_Department_c_= this.User_Profile_Department_Data[0];
   
    this.Get_Application_Settings();


    },
  Rows => { 
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}

Load_Student_Search_Dropdowns() {
    this.issLoading = true;
    this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(
    (Rows) => {
    if (Rows != null) {
   
    this.Users_Data = Rows[1];
    this.Users_Search_Temp.Users_Id = 0;
    this.Users_Search_Temp.Users_Name = "Select";
    this.Users_Data.unshift(this.Users_Search_Temp);
    this.Users_Search = this.Users_Data[0];

    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }







}

