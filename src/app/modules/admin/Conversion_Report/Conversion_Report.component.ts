import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Course } from '../../../models/Course';
import { FormControl } from '@angular/forms';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Conversion_Report',
templateUrl: './Conversion_Report.component.html',
styleUrls: ['./Conversion_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Conversion_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;

    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Conversion_Report_Edit:boolean;
    Conversion_Report_Save:boolean;
    Conversion_Report_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;

    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();
    Users_Data_Filter: Users[]  

    Search_Team_Member_=new FormControl();
    Search_Team_Member_Temp:any

    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];


    


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Conversion_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    
    Conversion_Report_Data:any;

    Edit_Page_Permission: any;

    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[]    
   
     Con_Sum :number=0;
    Con_Avg :number=0;
    Con_Avg_Fixed:string="";
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(74);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Conversion_Report_Edit=this.Permissions.Edit;
    this.Conversion_Report_Save=this.Permissions.Save;
    this.Conversion_Report_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 280;
    this.Search_Conversion_Report();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Conversion_Report_Data,'Lead Report')
       
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
         this.Enquiry_Status_Data = Rows.returnvalue.Status;
        
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];

        this.Enquiry_Status_Temp.Status_Id = 0;
        this.Enquiry_Status_Temp.Status_Name = "All";
        this.Enquiry_Status_Data.unshift(Object.assign({},this.Enquiry_Status_Temp));
        this.Enquiry_Status_Search = this.Enquiry_Status_Data[0];

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
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
isMobileMenu() {
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};
isDesktopMenu() 
{
    if ($(window).width() < 991)
    {
        return false;
    }
    return true;
};
trackByFn(index, item) 
{
    return index;
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
Edit_Lead(Student_Id, i) {

    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    this.Edit_Page_Permission = Get_Page_Permission(74);
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
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}
New_Date(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}
Search_Conversion_Report()
{
    var  Enquiry_Source_Id = 0,look_In_Date_Value=0,Team_Member_Selection="";

    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    var User_Id=0,status =0,Course_Id=0;
    if (this.Is_Date == true)
         look_In_Date_Value = 1;
    if (this.Enquiry_Source_ != undefined && this.Enquiry_Source_ != null)
        if (this.Enquiry_Source_.Enquiry_Source_Id != undefined && this.Enquiry_Source_.Enquiry_Source_Id != null)
        Enquiry_Source_Id = this.Enquiry_Source_.Enquiry_Source_Id;
    if (this.User_Search != undefined && this.User_Search!=null)
        if (this.User_Search.Users_Id != undefined && this.User_Search.Users_Id != null)
            User_Id = this.User_Search.Users_Id;
    if (this.Enquiry_Status_Search != undefined && this.Enquiry_Status_Search!=null)
    if (this.Enquiry_Status_Search.Status_Id != undefined && this.Enquiry_Status_Search.Status_Id != null)
        status = this.Enquiry_Status_Search.Status_Id;

    if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
            Course_Id = this.Course_.Course_Id;   



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



    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Conversion_Report(look_In_Date_Value, moment(this.ToDate_).format('YYYY-MM-DD'), this.Login_User,Team_Member_Selection).subscribe(Rows =>{
debugger
    this.Conversion_Report_Data = Rows[0];
debugger
    for (var i=0;i<this.Conversion_Report_Data.length;i++)
    {
        if(this.Conversion_Report_Data[i].conversion_count<=25)
        {
            this.Conversion_Report_Data[i].convesion_color=1
        }
        
    }

    for (var i=0;i<this.Conversion_Report_Data.length;i++)
    {
        if(this.Conversion_Report_Data[i].conversion_count>=25 && this.Conversion_Report_Data[i].conversion_count<=45)
        {
            this.Conversion_Report_Data[i].convesion_color=2
        }
        
    }

    for (var i=0;i<this.Conversion_Report_Data.length;i++)
    {
        if(this.Conversion_Report_Data[i].conversion_count>=46)
        {
            this.Conversion_Report_Data[i].convesion_color=3
        }
        
    }

    debugger
    this.Con_Sum = 0;
    this.Con_Avg = 0;
    this.Con_Avg_Fixed="";
    for (var i=0;i<this.Conversion_Report_Data.length;i++)
    {
       this.Con_Sum =
        Number(this.Con_Sum) + Number(this.Conversion_Report_Data[i].conversion_count);


    }
    console.log(this.Con_Sum);


    this.Con_Avg= Number(this.Con_Sum)/Number(this.Conversion_Report_Data.length);
    this.Con_Avg_Fixed=this.Con_Avg.toFixed(2);
    console.log(this.Con_Avg_Fixed);
    
    

    this.Total_Entries = this.Conversion_Report_Data.length;
    
    debugger
;
    
  
    this.issLoading = false;
    if(this.Conversion_Report_Data.length==0)
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


Search_Team_Member_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Users_Data == undefined || this.Users_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Team_Member_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Users_Data = Rows[0];
        this.issLoading = false;

        this.Users_Data_Filter=[];

        for (var i=0;i<this.Users_Data.length;i++)
        {
            if(this.Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Users_Data_Filter.push(this.Users_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Users_Data_Filter=[];
        for (var i=0;i<this.Users_Data.length;i++)
        {
            if(this.Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Users_Data_Filter.push(this.Users_Data[i])
        }
    }
}

display_Team_Member(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}



}

