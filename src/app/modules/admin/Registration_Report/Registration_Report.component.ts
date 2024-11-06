import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Gender } from '../../../models/Gender';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Course } from 'app/models/Course';
import { Enquiry_Source } from 'app/models/Enquiry_Source';

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
selector: 'app-Registration_Report',
templateUrl: './Registration_Report.component.html',
styleUrls: ['./Registration_Report.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Registration_ReportComponent implements OnInit {
    Search_Name = "";
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    Look_In_Date: Boolean = true;
    More_Search_Options: boolean = true;

    Gender_Data: Gender[]
    missedfollowup_count: number = 1;
    followup_count: number = 1;

    Lead_Data: Student[]
    
    Student_Data_Search: Student[]
    Lead_: Student = new Student();
    Search_Div: boolean = false;
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
    Export_View:boolean=false

    Search_Status: Status = new Status;
    Search_Status_Temp: Status = new Status;
    Status_Data: Status[];


    Users_Search: Users = new Users;
    Users_Search_Temp: Users = new Users;
    Users_Data: Users[];

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    
    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[]   


constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) 
{   }
ngOnInit() 
{
  
    this.Login_User = localStorage.getItem("Login_User");
    this.array = Get_Page_Permission(42);
    this.Export_Permission=Get_Page_Permission(50);


    // this.Export_Permission= Get_Page_Permission(42);
    if (this.array == undefined || this.array == null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else 
    {
        this.Page_Load()
        // if (this.Export_Permission == undefined || this.Export_Permission == null)
        //     this.Export_View=this.Export_Permission.View
        if(this.Export_Permission !=undefined && this.Export_Permission !=null)
        this.Export_View=this.Export_Permission.Edit
    
  
    }
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Student_Data_Search,'Registration Report')
       
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
  

    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;

    this.Load_Enquiry_Source();

    this.Search_Registration_Report();
    this.Search_By_=1;
    this.Registered_By_ = 1;
    this.Load_Student_Search_Dropdowns();
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight-200;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 200;
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
// Edit_Lead(Lead_Id, i) {
//         localStorage.setItem('Lead_Id', Lead_Id);

//         this.Edit_Page_Permission = Get_Page_Permission(1);
//         if (this.Edit_Page_Permission == undefined) {
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
//         }
//         else if (this.Edit_Page_Permission.View == true)
//             this.router.navigateByUrl('/Leads');
//         else {
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
//         }

//     }





Search_Lead_button() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.Search_Registration_Report();
}
Search_More_Options()
{
    if (this.More_Search_Options == true)
    this.More_Search_Options = false;
    else
    this.More_Search_Options = true;
}
// Export()
// {
//         // this.Student_Service_.exportExcel(this.Student_Data_Search,'Registration_Report')

// }
Search_Registration_Report()
{
var value = 1, Status_Id=0,User_Id=0,search_name_='0',look_In_Date_Value=0,branch_id=0;
var  Course_Id = 0,Enquiry_Source_Id=0;
    if(this.Search_By_!=undefined && this.Search_By_!=null)
    if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
    value=this.Search_By_;

    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    search_name_ = this.Search_Name;

    if (this.Users_Search != undefined && this.Users_Search!=null)
    if (this.Users_Search.Users_Id != undefined && this.Users_Search.Users_Id != null)
    User_Id = this.Users_Search.Users_Id;

    if (this.Search_Status != undefined && this.Search_Status != null)
    if (this.Search_Status.Status_Id != undefined && this.Search_Status.Status_Id != null)
    Status_Id = this.Search_Status.Status_Id;

    if (this.Course_ != undefined && this.Course_ != null)
    if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    Course_Id = this.Course_.Course_Id;

    if (this.Enquiry_Source_ != undefined && this.Enquiry_Source_ != null)
    if (this.Enquiry_Source_.Enquiry_Source_Id != undefined && this.Enquiry_Source_.Enquiry_Source_Id != null)
    Enquiry_Source_Id = this.Enquiry_Source_.Enquiry_Source_Id;


    this.issLoading = true;
    
    this.Student_Service_.Search_Registration_Report(moment(this.Search_FromDate).format('YYYY-MM-DD'),
     moment(this.Search_ToDate).format('YYYY-MM-DD'), value, search_name_, Status_Id, User_Id,  
     look_In_Date_Value, this.Black_Start, this.Black_Stop, this.Login_User, this.Red_Start, this.Red_Stop,Course_Id,Enquiry_Source_Id)
.subscribe(Rows => 
{
    
    //console.log(Rows)
    this.Student_Data_Search = Rows.returnvalue.Leads;
    this.missedfollowup_count =0;
    this.followup_count=0;

    for (var i = 0; i < this.Student_Data_Search.length; i++) {
    this.Student_Data_Search[i].RowNo =i+1 + this.Total_Rows;
    if (this.Student_Data_Search[i].tp == 1)
    this.followup_count = this.followup_count + 1;
    if (this.Student_Data_Search[i].tp == 2)

    this.missedfollowup_count = this.missedfollowup_count + 1;
}

if ( this.Student_Data_Search.length>0)
this.Total_Rows= this.Total_Rows+this.Student_Data_Search.length;
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

Edit_Registration(Student_Id, i) {
    
        localStorage.setItem('Student_Id', Student_Id);
        console.log(Student_Id)
        this.Edit_Page_Permission = Get_Page_Permission(14);
        if (this.Edit_Page_Permission == undefined) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
        }
        else if (this.Edit_Page_Permission.View == true)
           // this.router.navigateByUrl('/Stu');
          // window.open('/Student')
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
        // window.open('/Student');
        window.open(url, '_blank');
      }



Load_Student_Search_Dropdowns()
{
    this.issLoading = true;
    this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(Rows => {
    if (Rows != null) {
        this.Status_Data = Rows[0];
        this.Search_Status_Temp.Status_Id = 0;
        this.Search_Status_Temp.Status_Name = "All";
        this.Status_Data.unshift(this.Search_Status_Temp);
        this.Search_Status = this.Status_Data[0];

        this.Users_Data = Rows[1];
        this.Users_Search_Temp.Users_Id = 0;
        this.Users_Search_Temp.Users_Name = "All";
        this.Users_Data.unshift(this.Users_Search_Temp);
        this.Users_Search = this.Users_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}
Next_Click()
{
    if (this.Student_Data_Search.length == this.Page_Length_) 
    {
        this.Black_Start = this.Black_Start + this.Page_Length_;
        this.Black_Stop = this.Black_Stop + this.Page_Length_;
        if (this.missedfollowup_count > 0) {
        this.Red_Start = this.Red_Start + this.missedfollowup_count;
        this.Red_Stop = this.Red_Start + this.Page_Length_;
    }
this.nextflag = 1;
    if (this.Student_Data_Search.length > 0)
    {
        this.Search_Registration_Report();
    }
}
}
previous_Click()
{
    if (this.Black_Start > 1) {
    {
        this.Black_Start = this.Black_Start - this.Page_Length_;
        this.Black_Stop = this.Black_Stop - this.Page_Length_;
    }
    if (this.missedfollowup_count > 0 || this.Red_Start > 1) 
    {
    this.Red_Start = this.Red_Start - this.Page_Length_;
    if (this.Red_Start <= 0)
    this.Red_Start = 1;
    this.Red_Stop = this.Red_Start + this.Page_Length_;
    }
    this.Total_Rows = this.Total_Rows - this.Student_Data_Search.length - this.Page_Length_;
    this.Search_Registration_Report();
}
} 



Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Course_Data == undefined || this.Course_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Course_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Course_Data = Rows[0];
        this.issLoading = false;

        this.Course_Data_Filter=[];

        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Course_Data_Filter=[];
        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
}
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}

Load_Enquiry_Source()
{
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

}

