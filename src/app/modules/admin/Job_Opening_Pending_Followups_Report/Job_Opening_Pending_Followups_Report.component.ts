// import { Component, OnInit, Input, Injectable } from '@angular/core';
// import { Department_Service } from '../../../services/Department.Service';
// import { DialogBox_Component } from '../DialogBox/DialogBox.component';

// import { Student } from '../../../models/Student';
// import { Department_Status } from '../../../models/Department_Status';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component'
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
// import { Branch } from '../../../models/Branch';
import { Users } from '../../../models/Users';
// import { Department } from '../../../models/Department';
//import { Department_Status } from '../../../models/Department_Status';
import { Gender } from '../../../models/Gender';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Employer_Details_Servive } from 'app/services/Employer_Details.Service';
import { Job_Posting } from 'app/models/Job_Posting';
import { Employer_Status } from 'app/models/Employer_Status';
import { Employer_Details } from 'app/models/Employer_Details';
import { Job_Opening } from 'app/models/Job_Opening';

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
selector: 'app-Job_Opening_Pending_Followups_Report',
templateUrl: './Job_Opening_Pending_Followups_Report.component.html',
styleUrls: ['./Job_Opening_Pending_Followups_Report.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Job_Opening_Pending_Followups_ReportComponent implements OnInit {
    // Status_Search: Department_Status = new Department_Status();
    User_Search: Users = new Users();
    Search_Name = "";
    // Department_Search: Department = new Department()
    // Search_Branch: Branch = new Branch();
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    Look_In_Date: Boolean = false;
    More_Search_Options: boolean = true;

    // Department_Data: Department[]
    Users_Data: Users[]
    Search_Team_Member_=new FormControl();
    Search_Team_Member_Temp:any
    // Branch_Data: Branch[]
    // Status_Data: Department_Status[]
    Gender_Data: Gender[]
    // Branch_Temp1: Branch = new Branch();
    Users_Temp: Users = new Users();
    // Department_Temp: Department = new Department();
    // Status_Temp: Department_Status = new Department_Status();
    missedfollowup_count: number = 1;
    followup_count: number = 1;

    Lead_Data: Student[]
    Student_Data_Search: Student[]
    Lead_: Student = new Student();
    Search_Div: boolean = false;
    Summary_Div: boolean = false;
    
    array: any;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
myInnerHeight: number;
myTotalHeight:number;
    issLoading: boolean;

    Black: boolean = false;
    Red: boolean = false;
    pagePointer: number = 0;
    pageindex2: number = 0;
    pageindex: number = 0;
    Total_Rows: number = 0;
    isLoading = false;
    Search_By_: any;
    Registered_By_: any;
    year: any;
    month: any;
    day: any;
    date: any;
    Login_User: string = "0";
    Menu_Id: number = 28;
    Total_Data:number=0
    Total_Entries:number=0

    RowCount: number = 0;
    RowCount2: number = 0;
    nextflag: number = -1;
    Page_Length_: number = 10;
    firstnum: number = 0;
    lastnum: number = 1;
    shownext: boolean = false;
    showprev: boolean = false;

    Black_Start: number = 1;
    Black_Stop: number = 0;
    Red_Start: number = 1;
    Red_Stop: number = 0;
    points25: boolean = false;
    Edit_Page_Permission: any;

    Export_Permission:any
    Export_View:boolean=false;
    Graph:boolean=false;
    Summary_Sub:boolean=true

    Enquiry_Source_title = '';
    Enquiry_Source_type = 'BarChart';
    Type_PIe='PieChart'
    Branchwise_data = [  ];
    Data_Bar = [  ];
    Branchwise_columnNames = ['User_Detils_Name', 'Data_Count'];
    Enquiry_Source_options = { 
      is3D: true,
    };
    width = 550;
    height = 400; 
    Permissions: any;
    Missed_follow:number=0;

    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();


    Job_Title_Data: Job_Posting[];
    Job_Title_:Job_Posting=new Job_Posting();
    Job_Title_Search:Job_Posting=new Job_Posting();
    Job_Title_Temp: Job_Posting = new Job_Posting();
    Job_Title_Data_Filter: Job_Posting[] 


    Employer_Status_: Employer_Status = new Employer_Status();
    Employer_Status_Temp: Employer_Status = new Employer_Status();
    Employer_Status_Data: Employer_Status[];
    Employer_Status_Data_Filter: Employer_Status[];
    editpermission :number=1;
    Employer_Status_Search: Employer_Status = new Employer_Status();


    Employeedetails_Data: Employer_Details[];
    Employeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_new_:any;
    JobEmployeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_Search:Employer_Details=new Employer_Details();
    Employeedetails_Temp: Employer_Details = new Employer_Details();
    Employeedetails_Data_Filter: Employer_Details[] 

    Job_Opening_:Job_Opening=new Job_Opening;
    Job_Opening_Temp:Job_Opening=new Job_Opening;
    Job_Opening_Data:Job_Opening[];


    // Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    // nextflag: number;

 
constructor(public Student_Service_:Student_Service,public Employer_Details_Servive_:Employer_Details_Servive, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) 
{   }
ngOnInit() 
{
  
    this.Login_User = localStorage.getItem("Login_User");
    this.array = Get_Page_Permission(88);
    this.Export_Permission=Get_Page_Permission(50);

    if (this.array == undefined || this.array == null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else 
    {
        this.Page_Load()
        
        if (this.Export_Permission != undefined && this.Export_Permission != null)
            this.Export_View=this.Export_Permission.Edit
    }
}
Page_Load()
{
  
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 250;
    
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight - 250;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight -230;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.Pointer_Start_ = 1;
    this.Pointer_Stop_ = this.Page_Length_;

    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;
    this.Search_Div=false
    this.Summary_Div=true
     this.Get_Lead_Load_Data();
    
  
    // this.FollowUp_Summary();
    this.Job_Opening_Pending_Followups_Report();
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
}




New_Date(Date_)
{
    this.date = Date_;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10)
    {
        this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10)
    {
        this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    return this.date;
}
trackByFn(index, item) 
{
return index;
}
Edit_Lead(Lead_Id, i) {
        localStorage.setItem('Lead_Id', Lead_Id);

        this.Edit_Page_Permission = Get_Page_Permission(1);
        if (this.Edit_Page_Permission == undefined) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
        }
        else if (this.Edit_Page_Permission.View == true)
            this.router.navigateByUrl('/Leads');
        else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
        }

    }
    Edit_Job_Opening_Pending_Followups_Report(Student_Id, i) {
        
            localStorage.setItem('Student_Id', Student_Id);
            console.log(Student_Id)
            this.Edit_Page_Permission = Get_Page_Permission(14);
            if (this.Edit_Page_Permission == undefined) {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
            }
            else if (this.Edit_Page_Permission.View == true)
              
              this.goToLink();
            else {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
            }
        }
    
        goToLink() {
            
            return;
            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/Student'])
            );
           
            window.open(url, '_blank');
          }
Search_Lead_button() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.FollowUp_Summary();
}
Search_Lead_button2() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.Job_Opening_Pending_Followups_Report();
}
Search_More_Options()
{
    if (this.More_Search_Options == true)
    this.More_Search_Options = false;
    else
    this.More_Search_Options = true;
}
View_Back(){
   
    this.Search_Div=true
    this.Summary_Div=false
    this.User_Search.Users_Id=0
    this.User_Search.Users_Name="All"
    this.FollowUp_Summary();

}
Export()
{
        this.Student_Service_.exportExcel(this.Student_Data_Search,'Job_Opening_Pending_Followups_Report')

}

// Job_Opening_Pending_Followups_Report()
// {
    
    
//     this.Search_Div=false
//     this.Summary_Div=true
//     this.Graph=false
//     this.missedfollowup_count =0;
// var value = 1, dept_id=0,search_name_='0',look_In_Date_Value=0,branch_id=0;
//     if(this.Search_By_!=undefined && this.Search_By_!=null)
//     if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
//     value=this.Search_By_;

//     if (this.Look_In_Date == true )
//     look_In_Date_Value = 1;

//     if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
//     search_name_ = this.Search_Name;


//     // for (var i = 0; i < this.Users_Data.length; i++) {
//     //     if (User_Id== this.Users_Data[i].Users_Id)
//     //     this.User_Search=this.Users_Data[i];
//     // }


//     var User_Id=0


//     this.issLoading = true;
    
//     this.Employer_Details_Servive_.Job_Opening_Pending_Followups_Report(User_Id,this.Login_User)
// .subscribe(Rows => 
// {
    
 
//     this.Student_Data_Search = Rows.returnvalue.Leads;
//     this.Total_Data= this.Student_Data_Search.length
//     this.missedfollowup_count =0;
//     this.followup_count=0;
   
   
//     for (var i = 0; i < this.Student_Data_Search.length; i++) {
//     this.Student_Data_Search[i].RowNo =i+1 + this.Total_Rows;
//     if (this.Student_Data_Search[i].tp == 1)
//     this.followup_count = this.followup_count + 1;
//     if (this.Student_Data_Search[i].tp == 2)

//     this.missedfollowup_count = this.missedfollowup_count + 1;
// }

// if ( this.Student_Data_Search.length>0)
// this.Total_Rows= this.Total_Rows+this.Student_Data_Search.length;
// this.issLoading = false;
// if(this.Student_Data_Search.length==0)
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
// }
// },
// Rows => 
// {   
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     this.issLoading = false;
// });
// }





Job_Opening_Pending_Followups_Report()
        {


            this.Search_Div=false
            this.Summary_Div=true
            this.Graph=false
            this.missedfollowup_count =0; var Team_Member_Selection='';

            var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,Job_id_=0,Employee_Status_Id_=0;
           this.Total_Entries =0;
            if (this.Is_Date == true)
                look_In_Date_Value = 1;


                this.Search_Team_Member_Temp=this.Search_Team_Member_;
    if (this.Search_Team_Member_.value !=undefined)
    {
        for (var i=0;i<this.Search_Team_Member_.value.length;i++)
        {
            Team_Member_Selection=Team_Member_Selection + this.Search_Team_Member_.value[i].Users_Id.toString() +",";
        }
        if(Team_Member_Selection.length>0)
        Team_Member_Selection=Team_Member_Selection.substring(0,Team_Member_Selection.length-1)
    
        
    }
    if(Team_Member_Selection==""){Team_Member_Selection='0'}
        
                
                if (this.Job_Title_ != undefined && this.Job_Title_ != null)
                if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
                Job_id_ = this.Job_Title_.Job_Posting_Id;
        
                if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
                if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
                Company_id_ = this.Employeedetails_.Employer_Details_Id;  
        
        
                if (this.Employer_Status_Search != undefined && this.Employer_Status_Search != null)
                if (this.Employer_Status_Search.Employer_Status_Id != undefined && this.Employer_Status_Search.Employer_Status_Id != null)
                Employee_Status_Id_ = this.Employer_Status_Search.Employer_Status_Id;  
                
            this.issLoading = true;
           
            this.Employer_Details_Servive_.Job_Opening_Pending_Followups_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Job_id_,Team_Member_Selection,Employee_Status_Id_
            ,this.Pointer_Start_,
            this.Pointer_Stop_,
            this.Page_Length_).subscribe(Rows =>{
               debugger
                this.Job_Opening_Data=Rows[0];
              
                this.Total_Entries =  this.Job_Opening_Data.length;
                
            this.issLoading = false;
            if(this.Job_Opening_Data.length==0)
            { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
            }
            this.issLoading=false;
            },
            Rows => 
            { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
        }



FollowUp_Summary()
{
    
    this.Search_Div=true
    this.Summary_Div=false
    this.Summary_Sub=true
    var User_Id=0;
    this.Missed_follow=0;
    this.Graph=false
    var look_In_Date_Value=0,Team_Member_Selection='';

    if (this.Is_Date == true)
        look_In_Date_Value = 1;
    
    if (this.User_Search != undefined && this.User_Search!=null)
    if (this.User_Search.Users_Id != undefined && this.User_Search.Users_Id != null)
    User_Id = this.User_Search.Users_Id;

    debugger
    this.Search_Team_Member_Temp=this.Search_Team_Member_;
    if (this.Search_Team_Member_.value !=undefined)
    {
        for (var i=0;i<this.Search_Team_Member_.value.length;i++)
        {
            Team_Member_Selection=Team_Member_Selection + this.Search_Team_Member_.value[i].Users_Id.toString() +",";
        }
        if(Team_Member_Selection.length>0)
        Team_Member_Selection=Team_Member_Selection.substring(0,Team_Member_Selection.length-1)
    
        
    }
    if(Team_Member_Selection==""){Team_Member_Selection='0'}

    this.issLoading = true;
    
    this.Employer_Details_Servive_.Job_Opening_Pending_Followups_Summary(Team_Member_Selection,this.Login_User)
.subscribe(Rows => 
{
    
    //log(Rows)
    this.Student_Data_Search = Rows.returnvalue.Leads;
    this.Total_Entries=this.Student_Data_Search.length
    this.issLoading = false;
    this.Missed_follow=0;
    var Branchwise_data_temp = Rows.returnvalue.Leads;
    var data= Rows.returnvalue.Leads;
    for (var j=0;j<data.length;j++){
        this.Missed_follow=Number( this.Missed_follow)+Number(data[j].Pending)
    }
    this.issLoading = false;
    var result = [];
     this.Branchwise_columnNames=[];
    for (var i in Branchwise_data_temp)
    {
        result.push([Branchwise_data_temp[i].Users_Name, Branchwise_data_temp[i].Missed_FollowUp]);
    } 
   
    this.Branchwise_columnNames.push('Users_Name')
    this.Branchwise_columnNames.push('Missed_FollowUp')
    this.Branchwise_data = result;
    this.Data_Bar=result;     

this.issLoading = false;
if(this.Student_Data_Search.length==0)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
}
},
Rows => 
{   
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    this.issLoading = false;
});
}

Get_Lead_Load_Data()
{
this.issLoading = true;
this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => {
   
    if (Rows != undefined)
    {
        
        this.issLoading = false;
        // this.Department_Data = Rows.returnvalue.Department;
         this.Users_Data = Rows.returnvalue.Users;
        // this.Branch_Data = Rows.returnvalue.Branch;
        // this.Status_Data = Rows.returnvalue.Department_Status;

        // this.Department_Temp.Department_Id = 0;
        // this.Department_Temp.Department_Name = "All";
        // this.Department_Data.unshift(Object.assign({}, this.Department_Temp));
        // this.Department_Search = this.Department_Data[0];

        // this.Users_Temp.Users_Id = 0;
        // this.Users_Temp.Users_Name = "All";
        // this.Users_Data.unshift(Object.assign({}, this.Users_Temp));
        // this.User_Search = this.Users_Data[0];

        
        // this.Users_Data = Rows[0].slice();
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];




        // this.Branch_Temp1.Branch_Id = 0;

        // this.Branch_Temp1.Branch_Name = "All";
        // this.Branch_Data.unshift(this.Branch_Temp1);
        // this.Search_Branch = this.Branch_Data[0];

        // this.Status_Temp.Department_Status_Id = 0;
        // this.Status_Temp.Department_Status_Name = "All";
        // this.Status_Data.unshift(Object.assign({}, this.Status_Temp));
        // this.Status_Search = this.Status_Data[0];
    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}

// Get_Lead_Load_Data_ByUser(Login_User)
//     {
        
//         this.issLoading = true;
//         this.Student_Service_.Get_Lead_Load_Data_ByUser(Login_User).subscribe(Rows => 
        
//     {
     


//    this.Users_Data = Rows[0].slice();
//    this.Users_Temp.Users_Id = 0;
//    this.Users_Temp.Users_Name = "All";
//    this.Users_Data.unshift(Object.assign({},this.Users_Temp));
//    this.User_Search = this.Users_Data[0];
   
  


// },
// Rows => { 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
// }



// Next_Click()
// {
//     if (this.Student_Data_Search.length == this.Page_Length_) 
//     {
//         this.Black_Start = this.Black_Start + this.Page_Length_;
//         this.Black_Stop = this.Black_Stop + this.Page_Length_;
//         if (this.missedfollowup_count > 0) {
//         this.Red_Start = this.Red_Start + this.missedfollowup_count;
//         this.Red_Stop = this.Red_Start + this.Page_Length_;
//     }
// this.nextflag = 1;
//     if (this.Student_Data_Search.length > 0)
//     {
//         this.Job_Opening_Pending_Followups_Report();
//     }
// }
// }
// previous_Click()
// {
//     if (this.Black_Start > 1) {
//     {
//         this.Black_Start = this.Black_Start - this.Page_Length_;
//         this.Black_Stop = this.Black_Stop - this.Page_Length_;
//     }
//     if (this.missedfollowup_count > 0 || this.Red_Start > 1) 
//     {
//     this.Red_Start = this.Red_Start - this.Page_Length_;
//     if (this.Red_Start <= 0)
//     this.Red_Start = 1;
//     this.Red_Stop = this.Red_Start + this.Page_Length_;
//     }
//     this.Total_Rows = this.Total_Rows - this.Student_Data_Search.length - this.Page_Length_;
//     this.Job_Opening_Pending_Followups_Report();
// }
// }   

Graph_View(){
    this.Graph=true
    this.Summary_Sub=false
}

Next_Click() {
   
    if (this.Job_Opening_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Job_Opening_Data.length > 0) {
            this.Job_Opening_Pending_Followups_Report();
        }
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }

  }
  
  previous_Click() {
   
    if (this.Pointer_Start_ > 1) {
        this.Pointer_Start_ = this.Pointer_Start_ - this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ - this.Page_Length_;
        this.Job_Opening_Pending_Followups_Report();
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }
  }
  

  Search_Employer_Status_Typeahead(event: any) {

    debugger


    var Value = "";

if(event!=""){
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
}

    if (
    this.Employer_Status_Data == undefined ||
    this.Employer_Status_Data.length == 0
    ) {
    this.issLoading = true;
    this.Student_Service_.Search_Employer_Status_Typeahead("").subscribe(
    (Rows) => {
    if (Rows != null) {
    this.Employer_Status_Data = Rows[0];
    this.issLoading = false;
    
    this.Employer_Status_Data_Filter = [];
    
    for (var i = 0; i < this.Employer_Status_Data.length; i++) {
    if (
    this.Employer_Status_Data[i].Employer_Status_Name.toLowerCase().includes(
    Value
    )
    )
    this.Employer_Status_Data_Filter.push(
    this.Employer_Status_Data[i]
    );
    }
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    } else {
    this.Employer_Status_Data_Filter = [];
    for (var i = 0; i < this.Employer_Status_Data.length; i++) {
    if (
    this.Employer_Status_Data[i].Employer_Status_Name.toLowerCase().includes(Value)
    )
    this.Employer_Status_Data_Filter.push(this.Employer_Status_Data[i]);
    }
    }
    }
    display_Employer_Status(Employer_Status_: Employer_Status) {
    if (Employer_Status_) {
    return Employer_Status_.Employer_Status_Name;
    }
    }


}

