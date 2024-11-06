import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Level_Details_Status_Master } from '../../../models/Level_Details_Status_Master';
// import { Agreement_Details_Student } from '../../../models/Agreement_Details_Student';
import {Employer_Details} from '../../../models/Employer_Details'
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { environment } from 'environments/environment';
import { Student } from 'app/models/Student';
import { Company } from 'app/models/Company';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Score_Card_Report',
templateUrl: './Score_Card_Report.component.html',
styleUrls: ['./Score_Card_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Score_Card_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    DownloadPermissions: any;
    Agreement_Details_Edit:boolean;
    Agreement_Details_Save:boolean;
    Agreement_Details_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Agreement_Details_Id: number = 0;
    Agreement_Details_Data: []
    Job_Code_Search:string;
    Student_Search:string;
    Job_Location_Search:string;

  
    Course_Data: Course[];
    Course_Data_Filter: Course[] 
    Course_:Course=new Course;
    Course_Search:Course=new Course;
    Course_Temp: Course = new Course;

    Batch_Data: Batch[];
    Batch_Data_Filter: Batch[]
    Batch_:Batch=new Batch;
    Batch_Search:Batch=new Batch;
    Batch_Temp: Batch = new Batch;

    
    Employeedetails_Data: Employer_Details[];
    Employeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_Search:Employer_Details=new Employer_Details();
    Employeedetails_Temp: Employer_Details = new Employer_Details();
    Employeedetails_Data_Filter: Employer_Details[]   


    Employer_Details_: Employer_Details = new Employer_Details();
    Search_Employer_Details_: Employer_Details = new Employer_Details();
    Searchinner_Employer_Details_: Employer_Details = new Employer_Details();
    Employer_Details_Temp: Employer_Details = new Employer_Details();
    Employer_Details_Data: Employer_Details[]
    Employer_Details_Search:Employer_Details=new Employer_Details();
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Agreement_Details_EditIndex: number = -1;
    Portion_Covered: number = 0;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    Level_Details_Status_Master_:Level_Details_Status_Master=new Level_Details_Status_Master;
    Level_Details_Status_Master_Temp:Level_Details_Status_Master=new Level_Details_Status_Master;
    Level_Details_Status_Master_Data:Level_Details_Status_Master[];

    // Agreement_Details_Student_:Agreement_Details_Student=new Agreement_Details_Student;
    // Agreement_Details_Student_Temp:Agreement_Details_Student=new Agreement_Details_Student;
    // Agreement_Details_Student_Data:Agreement_Details_Student[];
    // Agreement_Details_Student_Data_Temp:Agreement_Details_Student[];

    Agreement_Details_Student_Data:any;

    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Is_Date_Search:boolean=false;    
    FromDate_Search: Date = new Date();
    ToDate_Search: Date = new Date();
    Interview_Master_Id:number;
    Interview_Master_Id_localStorage:string;

    Agreement_FileName: string;
    ImageFile_Photo1: any;
    Display_Photo_1_: string;
    Document_File_Array: any[];

    Student_Course_Id_:number;
    Student_Id_:number;

    Search_By_ :number=0;
    
   Student_Name_Search: "";
   Faculty_Data_Filter: Users[];
   Trainer:number;
   faculty_edit:number;
   Login_User_Type_Data:any;

   Entry_Level_View: boolean = false;
   Mid_Level_View: boolean = false;
   Exit_Level_View: boolean = false;
   Project_View: boolean = false;

   Export_Permission:any;
   Export_View :boolean =false;



   Companyprint_Data: Company[];
print_Company_Name: string;
print_Company_Address1: string;
print_Company_Address2: string;
print_Company_Address3: string;
print_Company_Address4: string;
print_Company_pincode: string;
print_Company_Phone: string;
print_Company_Mobile: string;
print_Company_Email: string;
print_Company_Website: string;
Company_: Company = new Company();



Company_Name: string;
Address1: string;
Address2: string;
Address3: string;
PinCode: string;
GSTNo: string;

Student_Name:string;
course_name:string;

Entry_Level :number; 
Personality_and_Professionalism_Entrylevel :number; 
Mid_Level :number; 
Personality_and_Professionalism_Midlevel :number; 
Exit_Level :number; 
Personality_and_Professionalism_Exitlevel :number; 
Project_Score :number; 
BatchName:any;
Faculty:any;
startdate:any;
enddate:any;
Final_Score:any;
Grade:any;
Sum_Final_Score:any;
currentdate:Date;
attendance_percentage:any;

finalscore_statusname :string;
Entry_Level_statusname :string;
Entry_Level_pp_statusname :string;
Mid_Level_statusname :string;
Mid_Level_pp_statusname :string;
Exit_Level_statusname :string;
Exit_Level_pp_statusname :string;
Project_Score_statusname :string;


Entry_Level_grade :string;
Entry_Level_pp_grade :string;
Mid_Level_grade :string;
Mid_Level_pp_grade :string;
Exit_Level_grade :string;
Exit_Level_pp_grade :string;
Project_Score_grade :string;
DownloadPermissionsView:boolean =false;


//    Student_Name_Search: "";


constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

    debugger
    
    this.Interview_Master_Id_localStorage = localStorage.getItem('Interview_Master_Id');
   if(this.Interview_Master_Id_localStorage >"0")
   {
    this.Interview_Master_Id = Number(this.Interview_Master_Id_localStorage) ;
    localStorage.setItem('Interview_Master_Id', "0");
   }
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(97);
    
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Agreement_Details_Edit=this.Permissions.Edit;
    this.Agreement_Details_Save=this.Permissions.Save;
    this.Agreement_Details_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
        this.Export_View=this.Export_Permission.Edit
    }
    debugger
    this.DownloadPermissions = Get_Page_Permission(100);
    if(this.DownloadPermissions==undefined || this.DownloadPermissions==null)
    {
        this.DownloadPermissionsView =false
    }
    else
    {
        this.DownloadPermissionsView =true;
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = true;
    this.Get_Login_User_Type();
    this.Trainer =this.Login_User;
    // this.Level_Details_Status_Master_.Description='';
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.FromDate_Search=this.New_Date(this.FromDate_Search)
    this.ToDate_Search=this.New_Date(this.ToDate_Search)
    this.Is_Date_Search=false;
    // this.Load_Employer_Details();
    // this.Clr_Agreement_Details();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 245;
   

    this.Search_Score_Card_Report();

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
Course_change()
{
    
    // this.Batch_.Batch_Id=0;
    // this.Batch_.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
  this.Batch_=null;
}
Search_Course_change()
{
    
    // this.Batch_Search.Batch_Id=0;
    // this.Batch_Search.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
    this.Batch_Search=null
}
Close_Click()
{
  this.Entry_View=true;
  this.Entry_Level_View=false;
  this.Mid_Level_View=false;
  this.Exit_Level_View=false;
  this.Project_View=false;
  this.Clr_Agreement_Details();
//   this.Search_Level_Details_Status();
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
Batch_Typeahead_Service(Value,Course_Id)
{
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        
        // this.Student_Service_.Search_Batch_Typeahead_1('',this.Course_Search.Course_Id).subscribe(Rows =>
        this.Student_Service_.Search_Batch_Typeahead_Attendance1('',Course_Id,this.Login_User).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Batch_Data = Rows[0];
        this.issLoading = false;
        this.Batch_Data_Filter=[];

        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }

    }
    },
    Rows => {
     this.issLoading = false;
    })
    // );
    } 
    else
    {
        
        this.Batch_Data_Filter=[];
        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
}
Search_Batch_Typeahead_New(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
   
    this.Batch_Typeahead_Service(Value,this.Course_.Course_Id);
}
Search_Batch_Typeahead_Search(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
   
    this.Batch_Typeahead_Service(Value,this.Course_Search.Course_Id);
}
// display_Batch(Batch_: Batch)
// {     
//     if (Batch_) { return Batch_.Batch_Name; }
// }
Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
// display_Faculty(Users_: Users)
// {     
//     if (Users_) { return Users_.Users_Name; }
// }
Clr_Agreement_Details()
{
    
    this.Level_Details_Status_Master_.Entry_Level  =0;
    this.Level_Details_Status_Master_.Personality_and_Professionalism_Entrylevel  =0;
    this.Level_Details_Status_Master_.Mid_Level  =0;
    this.Level_Details_Status_Master_.Personality_and_Professionalism_Midlevel  =0;
    this.Level_Details_Status_Master_.Exit_Level  =0;
    this.Level_Details_Status_Master_.Personality_and_Professionalism_Exitlevel  =0;
    this.Level_Details_Status_Master_.Project_Score  =0;
    this.Level_Details_Status_Master_.Project_Url =""; 
    this.Level_Details_Status_Master_.Student_Course_Id =0;
    this.Level_Details_Status_Master_.Student_Id =0;
    this.Level_Details_Status_Master_.Entry_Level_Add_UserId  =0; 
    this.Level_Details_Status_Master_.Mid_Level_Add_UserId  =0; 
    this.Level_Details_Status_Master_.Exit_Level_Add_UserId  =0; 
    this.Level_Details_Status_Master_.Project_Add_UserId  =0;

    this.Student_Course_Id_ =0;
    this.Student_Id_ =0
    
}


Load_Employer_Details()
{
    
    this.issLoading = true;
    this.Student_Service_.Load_Employer_Details().subscribe(Rows => {
        
        if (Rows != null) {
            this.Employer_Details_Data = Rows[0];
            this.Employer_Details_Temp.Employer_Details_Id = 0;
            this.Employer_Details_Temp.Company_Name = "Select";
            this.Employer_Details_Data.unshift(this.Employer_Details_Temp);
            this.Employer_Details_ = this.Employer_Details_Data[0];
            this.Search_Employer_Details_ = this.Employer_Details_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
    }

    Search_Company_Typeahead(event: any)
    {     
        var Value = "";
        if (event.target.value == "")
            Value = "";
        else
            Value = event.target.value;
        if (this.Employeedetails_Data == undefined || this.Employeedetails_Data.length==0)
        {
            this.issLoading = true;
            this.Student_Service_.Search_Company_Typeahead('').subscribe(Rows => {
        if (Rows != null) 
        {
            this.Employeedetails_Data = Rows[0];
            this.Employeedetails_Data_Filter=[];
            this.issLoading = false;
    
            for (var i=0;i<this.Employeedetails_Data.length;i++)
            {
                if(this.Employeedetails_Data[i].Company_Name.toLowerCase().includes(Value))
                    this.Employeedetails_Data_Filter.push(this.Employeedetails_Data[i])
            }
        }
        },
        Rows => {
         this.issLoading = false;
        });
        } 
        else
        {
            
            this.Employeedetails_Data_Filter=[];
            for (var i=0;i<this.Employeedetails_Data.length;i++)
            {
                if(this.Employeedetails_Data[i].Company_Name.toLowerCase().includes(Value))
                    this.Employeedetails_Data_Filter.push(this.Employeedetails_Data[i])
            }
        }
    }
    display_Company(Employeedetails_e: Employer_Details)
    {     
        if (Employeedetails_e) { return Employeedetails_e.Company_Name; }
    }
    
    Search_Score_Card_Report()
{

    debugger
    var  Course_Id = 0, Employer_Id = 0,look_In_Date_Value=0,Batch_Id=0;
    var  student_name_ = "",Faculty_Id = 0 ;

    if (this.Is_Date == true){look_In_Date_Value = 1;}
        
   
        if (this.Course_Search != undefined && this.Course_Search != null)
        if (this.Course_Search.Course_Id != undefined && this.Course_Search.Course_Id != null)
        Course_Id = this.Course_Search.Course_Id;

        if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;

        if (this.Student_Name_Search != undefined && this.Student_Name_Search != null && this.Student_Name_Search != '')
        student_name_ = this.Student_Name_Search;

        if (this.Faculty_ != undefined && this.Faculty_ != null)
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
        Faculty_Id = this.Faculty_.Users_Id;

        
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Score_Card_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Course_Id,Batch_Id,student_name_,Faculty_Id).subscribe(Rows =>{
        debugger
       
       
        this.Agreement_Details_Student_Data=Rows[0];
debugger
        for (var i=0;i<this.Agreement_Details_Student_Data.length;i++)
            {

                if(this.Agreement_Details_Student_Data[i].Final_Score>0)
                    {

                    
                if(this.Agreement_Details_Student_Data[i].Final_Score <=100 && this.Agreement_Details_Student_Data[i].Final_Score >90)
                {
                this.Agreement_Details_Student_Data[i].Grade="A+"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=90 && this.Agreement_Details_Student_Data[i].Final_Score >80)
                {
                this.Agreement_Details_Student_Data[i].Grade="A"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=80 && this.Agreement_Details_Student_Data[i].Final_Score >70)
                {
                this.Agreement_Details_Student_Data[i].Grade="B+"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=70 && this.Agreement_Details_Student_Data[i].Final_Score >60)
                {
                this.Agreement_Details_Student_Data[i].Grade="B"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=60 && this.Agreement_Details_Student_Data[i].Final_Score >50)
                {
                this.Agreement_Details_Student_Data[i].Grade="C+"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=50 && this.Agreement_Details_Student_Data[i].Final_Score >40)
                {
                this.Agreement_Details_Student_Data[i].Grade="C"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=40 && this.Agreement_Details_Student_Data[i].Final_Score >30)
                {
                this.Agreement_Details_Student_Data[i].Grade="D+"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <=30 && this.Agreement_Details_Student_Data[i].Final_Score >=20)
                {
                this.Agreement_Details_Student_Data[i].Grade="D"
                }
                else if(this.Agreement_Details_Student_Data[i].Final_Score <20)
                {
                this.Agreement_Details_Student_Data[i].Grade="E"
                }
                   }
            }

        this.Total_Entries =this.Agreement_Details_Student_Data.length
    this.issLoading = false;
    if(this.Agreement_Details_Student_Data.length==0 )
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
Save_Agreement_Details()
{
    debugger
    this.issLoading=true;  
    var Menu_Student=false; 
    
    
   {
    this.Level_Details_Status_Master_.Student_Id =this.Student_Id_;
    this.Level_Details_Status_Master_.Student_Course_Id =this.Student_Course_Id_;
    debugger
    this.Student_Service_.Save_Agreement_Details(this.Level_Details_Status_Master_,this.ImageFile_Photo1,this.Document_File_Array).subscribe(Save_status => {
        debugger
    if(Number(Save_status[0][0].Student_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else
    {        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
        this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });}
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Agreement_Details()
}
Edit_Agreement_Details(Level_Details_Status_Master_e:Level_Details_Status_Master,index)
{
    this.Entry_View=true;
    this.Level_Details_Status_Master_=Level_Details_Status_Master_e;
    this.Level_Details_Status_Master_=Object.assign({},Level_Details_Status_Master_e);

    this.Student_Course_Id_ =this.Level_Details_Status_Master_.Student_Course_Id;
    this.Student_Id_ =this.Level_Details_Status_Master_.Student_Id;
 
   
}
Load_Placement_Student(Interview_Master_Id_)
{
    
    this.issLoading = true;
    this.Student_Service_.Load_Placement_Student(Interview_Master_Id_).subscribe(Rows => {
        
   
 
    this.Course_Temp.Course_Id = Rows[0][0].Course_Id;
    this.Course_Temp.Course_Name = Rows[0][0].Course_Name;
    this.Course_ = Object.assign({}, this.Course_Temp);

    this.Employeedetails_Temp.Employer_Details_Id = Rows[0][0].Employer_Details_Id;
    this.Employeedetails_Temp.Company_Name = Rows[0][0].Company_Name;
    this.Searchinner_Employer_Details_ = Object.assign({}, this.Employeedetails_Temp);


       
        this.Agreement_Details_Student_Data = Rows[1];
       this.issLoading = false;

   },

       Rows => {
           this.issLoading = false;
           const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
       });
}




Search_Batch_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Batch_Data = Rows[0];
        this.issLoading = false;

        this.Batch_Data_Filter=[];

        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Batch_Data_Filter=[];
        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
}


display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name }
}


File_Change_Photo1(event: Event) 
{  
    ////debugger  
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Photo1 = file;
    this.Agreement_FileName = this.ImageFile_Photo1[0].name;
    // this.Level_Details_Status_Master_.Agreement_File_Name =this.Agreement_FileName;

}



Download_Agreement(File_Name,StudentId) {

    var bs= environment.FilePath;
    var s=bs+File_Name;
    window.open(s,'_blank'); 
    }



    Search_Faculty_Typeahead(event: any)
    {     
        var Value = "";
        if (event.target.value == "")
            Value = "";
        else
            Value = event.target.value;       
         if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
               {
                this.issLoading = true;
             this.Student_Service_.Search_Typeahead_Loadfaculty('').subscribe(Rows => {
            if (Rows != null) {
                this.Faculty_Data = Rows[0];
                this.issLoading = false;
    
                this.Faculty_Data_Filter=[];
    
                for (var i=0;i<this.Faculty_Data.length;i++)
                {
                    if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                        this.Faculty_Data_Filter.push(this.Faculty_Data[i])
                }
    
             
    
    
    
            }
        },
            Rows => {
                this.issLoading = false;
              });
        } 
    
        else
        {
            
            this.Faculty_Data_Filter=[];
            for (var i=0;i<this.Faculty_Data.length;i++)
            {
                if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.Faculty_Data_Filter.push(this.Faculty_Data[i])
            }
        }
    }
    
    
    display_Faculty(Users_: Users)
    {     
        if (Users_) { return Users_.Users_Name; }
    }


    Trainer_Change()
{
    debugger
    if (this.Faculty_ != undefined && this.Faculty_ != null ){
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null )
        this.Trainer = this.Faculty_.Users_Id; 
        else
        this.Trainer =0;
    }
    else
    this.Trainer =0;
   

    // this.Search_Batch_Typeahead_Report_New(this.Trainer)

}

Get_Login_User_Type()
{
    
    this.issLoading = true;
    this.Student_Service_.Get_Login_User_Type(this.Login_User).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Login_User_Type_Data = Rows[0];
            if( this.Login_User_Type_Data[0].User_Type==1)
            {
                this.faculty_edit =1
            }
            else( this.faculty_edit =0);
           

            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Edit_Lead(Student_Id, i) {

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


  Edit_Entry_Level(Level_Details_Status_Master_e:Level_Details_Status_Master,index)
  {

    debugger
      this.Entry_Level_View=true;
      this.Entry_View=false;
      this.Level_Details_Status_Master_=Level_Details_Status_Master_e;
      this.Level_Details_Status_Master_=Object.assign({},Level_Details_Status_Master_e);
  
      this.Student_Course_Id_ =this.Level_Details_Status_Master_.Student_Course_Id;
      this.Student_Id_ =this.Level_Details_Status_Master_.Student_Id;
   
     
  }

  Edit_Mid_Level(Level_Details_Status_Master_e:Level_Details_Status_Master,index)
  {
      this.Mid_Level_View=true;
      this.Entry_View=false;
      this.Level_Details_Status_Master_=Level_Details_Status_Master_e;
      this.Level_Details_Status_Master_=Object.assign({},Level_Details_Status_Master_e);
  
      this.Student_Course_Id_ =this.Level_Details_Status_Master_.Student_Course_Id;
      this.Student_Id_ =this.Level_Details_Status_Master_.Student_Id;
   
     
  }

  Edit_Exit_Level(Level_Details_Status_Master_e:Level_Details_Status_Master,index)
  {
      this.Exit_Level_View=true;
      this.Entry_View=false;
      this.Level_Details_Status_Master_=Level_Details_Status_Master_e;
      this.Level_Details_Status_Master_=Object.assign({},Level_Details_Status_Master_e);
  
      this.Student_Course_Id_ =this.Level_Details_Status_Master_.Student_Course_Id;
      this.Student_Id_ =this.Level_Details_Status_Master_.Student_Id;
   
     
  }

  Edit_Project_Level(Level_Details_Status_Master_e:Level_Details_Status_Master,index)
  {
      this.Project_View=true;
      this.Entry_View=false;
      this.Level_Details_Status_Master_=Level_Details_Status_Master_e;
      this.Level_Details_Status_Master_=Object.assign({},Level_Details_Status_Master_e);
  
      this.Student_Course_Id_ =this.Level_Details_Status_Master_.Student_Course_Id;
      this.Student_Id_ =this.Level_Details_Status_Master_.Student_Id;
   
     
  }


  

  Save_Entry_Level_Details()
{
    if( this.Level_Details_Status_Master_.Entry_Level==0||this.Level_Details_Status_Master_.Entry_Level==undefined||this.Level_Details_Status_Master_.Entry_Level==null)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Entry Level ',Type: "3" }});
    return  
    }

  else  if( this.Level_Details_Status_Master_.Personality_and_Professionalism_Entrylevel==0||this.Level_Details_Status_Master_.Personality_and_Professionalism_Entrylevel==undefined||this.Level_Details_Status_Master_.Personality_and_Professionalism_Entrylevel==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Personality & Professionalism ',Type: "3" }});
        return  
        }

  
    this.issLoading=true;
    debugger
    this.Level_Details_Status_Master_.Entry_Level_Add_UserId= this.Login_User;
    this.Level_Details_Status_Master_.Student_Id= this.Student_Id_;
    this.Level_Details_Status_Master_.Student_Course_Id= this.Student_Course_Id_;
    debugger
    this.Student_Service_.Save_Entry_Level_Details(this.Level_Details_Status_Master_).subscribe(Level_Details_Status => {
        
        debugger
    Level_Details_Status=Level_Details_Status[0];
    if(Number(Level_Details_Status[0].Student_Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}

Save_Mid_Level_Details()
{
    if( this.Level_Details_Status_Master_.Mid_Level==0||this.Level_Details_Status_Master_.Mid_Level==undefined||this.Level_Details_Status_Master_.Mid_Level==null)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Mid Level ',Type: "3" }});
    return  
    }

  else  if( this.Level_Details_Status_Master_.Personality_and_Professionalism_Midlevel==0||this.Level_Details_Status_Master_.Personality_and_Professionalism_Midlevel==undefined||this.Level_Details_Status_Master_.Personality_and_Professionalism_Midlevel==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Personality & Professionalism ',Type: "3" }});
        return  
        }

  
    this.issLoading=true;
    debugger
    this.Level_Details_Status_Master_.Mid_Level_Add_UserId= this.Login_User;
    this.Level_Details_Status_Master_.Student_Id= this.Student_Id_;
    this.Level_Details_Status_Master_.Student_Course_Id= this.Student_Course_Id_;
    
    this.Student_Service_.Save_Mid_Level_Details(this.Level_Details_Status_Master_).subscribe(Level_Details_Status => {
        
        debugger
    Level_Details_Status=Level_Details_Status[0];
    if(Number(Level_Details_Status[0].Student_Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}

Save_Exit_Level_Details()
{
    if( this.Level_Details_Status_Master_.Exit_Level==0||this.Level_Details_Status_Master_.Exit_Level==undefined||this.Level_Details_Status_Master_.Exit_Level==null)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Exit Level ',Type: "3" }});
    return  
    }

  else  if( this.Level_Details_Status_Master_.Personality_and_Professionalism_Exitlevel==0||this.Level_Details_Status_Master_.Personality_and_Professionalism_Exitlevel==undefined||this.Level_Details_Status_Master_.Personality_and_Professionalism_Exitlevel==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Personality & Professionalism ',Type: "3" }});
        return  
        }

  
    this.issLoading=true;
    debugger
    this.Level_Details_Status_Master_.Exit_Level_Add_UserId= this.Login_User;
    this.Level_Details_Status_Master_.Student_Id= this.Student_Id_;
    this.Level_Details_Status_Master_.Student_Course_Id= this.Student_Course_Id_;
    
    this.Student_Service_.Save_Exit_Level_Details(this.Level_Details_Status_Master_).subscribe(Level_Details_Status => {
        
        debugger
    Level_Details_Status=Level_Details_Status[0];
    if(Number(Level_Details_Status[0].Student_Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}

Save_Project_Details()
{
    if( this.Level_Details_Status_Master_.Project_Score==0||this.Level_Details_Status_Master_.Project_Score==undefined||this.Level_Details_Status_Master_.Project_Score==null)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Entry Level ',Type: "3" }});
    return  
    }

  else  if( this.Level_Details_Status_Master_.Project_Url==''||this.Level_Details_Status_Master_.Project_Url==undefined||this.Level_Details_Status_Master_.Project_Url==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Personality & Professionalism ',Type: "3" }});
        return  
        }

  
    this.issLoading=true;
    debugger
    this.Level_Details_Status_Master_.Project_Add_UserId= this.Login_User;
    this.Level_Details_Status_Master_.Student_Id= this.Student_Id_;
    this.Level_Details_Status_Master_.Student_Course_Id= this.Student_Course_Id_;
    
    this.Student_Service_.Save_Project_Details(this.Level_Details_Status_Master_).subscribe(Level_Details_Status => {
        
        debugger
    Level_Details_Status=Level_Details_Status[0];
    if(Number(Level_Details_Status[0].Student_Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Agreement_Details_Student_Data,'Score Card Report')
       
}



print_Certificate(Student_e: Student, index) {

    debugger


    this.Student_Name =Student_e.Student_Name;
    this.course_name=Student_e.Course_Name;
    this.BatchName=Student_e.Batch_Name;
    this.Faculty=Student_e.Faculty;
    this.startdate=Student_e.Start_Date;
    this.enddate=Student_e.End_Date;

    this.Final_Score=Student_e.Final_Score;

    if(this.Final_Score>=60){this.finalscore_statusname ="Pass"}
    else(this.finalscore_statusname ="Fail")
    this.Grade=Student_e.Grade;
    this.Sum_Final_Score=Student_e.Sum_Final_Score;
    // this.currentdate=this.New_Date(this.FromDate_Search);

    this.currentdate = new Date();
    this.currentdate = this.New_Date(this.currentdate);

    this.Entry_Level  =Student_e.Entry_Level;
    this.Personality_and_Professionalism_Entrylevel  =Student_e.Personality_and_Professionalism_Entrylevel;
    this.Mid_Level  =Student_e.Mid_Level;
    this.Personality_and_Professionalism_Midlevel =Student_e.Personality_and_Professionalism_Midlevel; 
    this.Exit_Level  =Student_e.Exit_Level;
    this.Personality_and_Professionalism_Exitlevel  =Student_e.Personality_and_Professionalism_Exitlevel;
    this.Project_Score  =Student_e.Project_Score;
    this.attendance_percentage =Student_e.attendance_percentage

    if(this.Entry_Level>=60){this.Entry_Level_statusname ="Pass"}
    else(this.Entry_Level_statusname ="Fail")

    if(this.Personality_and_Professionalism_Entrylevel>=6){this.Entry_Level_pp_statusname ="Pass"}
    else(this.Entry_Level_pp_statusname ="Fail")

    if(this.Mid_Level>=60){this.Mid_Level_statusname ="Pass"}
    else(this.Mid_Level_statusname ="Fail")

    if(this.Personality_and_Professionalism_Midlevel>=6){this.Mid_Level_pp_statusname ="Pass"}
    else(this.Mid_Level_pp_statusname ="Fail")

    if(this.Exit_Level>=60){this.Exit_Level_statusname ="Pass"}
    else(this.Exit_Level_statusname ="Fail")

    if(this.Personality_and_Professionalism_Exitlevel>=6){this.Exit_Level_pp_statusname ="Pass"}
    else(this.Exit_Level_pp_statusname ="Fail")

    if(this.Project_Score>=60){this.Project_Score_statusname ="Pass"}
    else(this.Project_Score_statusname ="Fail")



        
    if(this.Entry_Level <=100 && this.Entry_Level >90)
        {
        this.Entry_Level_grade="A+"
        }
        else if(this.Entry_Level <=90 && this.Entry_Level >80)
        {
        this.Entry_Level_grade="A"
        }
        else if(this.Entry_Level <=80 && this.Entry_Level >70)
        {
        this.Entry_Level_grade="B+"
        }
        else if(this.Entry_Level <=70 && this.Entry_Level >60)
        {
        this.Entry_Level_grade="B"
        }
        else if(this.Entry_Level <=60 && this.Entry_Level >50)
        {
        this.Entry_Level_grade="C+"
        }
        else if(this.Entry_Level <=50 && this.Entry_Level >40)
        {
        this.Entry_Level_grade="C"
        }
        else if(this.Entry_Level <=40 && this.Entry_Level >30)
        {
        this.Entry_Level_grade="D+"
        }
        else if(this.Entry_Level <=30 && this.Entry_Level >=20)
        {
        this.Entry_Level_grade="D"
        }
        else if(this.Entry_Level <20)
        {
        this.Entry_Level_grade="E"
        }


        if(this.Personality_and_Professionalism_Entrylevel <=10 && this.Personality_and_Professionalism_Entrylevel >9)
            {
            this.Entry_Level_pp_grade="A+"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=9 && this.Personality_and_Professionalism_Entrylevel >8)
            {
            this.Entry_Level_pp_grade="A"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=8 && this.Personality_and_Professionalism_Entrylevel >7)
            {
            this.Entry_Level_pp_grade="B+"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=7 && this.Personality_and_Professionalism_Entrylevel >6)
            {
            this.Entry_Level_pp_grade="B"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=6 && this.Personality_and_Professionalism_Entrylevel >5)
            {
            this.Entry_Level_pp_grade="C+"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=5 && this.Personality_and_Professionalism_Entrylevel >4)
            {
            this.Entry_Level_pp_grade="C"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=4 && this.Personality_and_Professionalism_Entrylevel >3)
            {
            this.Entry_Level_pp_grade="D+"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <=3 && this.Personality_and_Professionalism_Entrylevel >=2)
            {
            this.Entry_Level_pp_grade="D"
            }
            else if(this.Personality_and_Professionalism_Entrylevel <2)
            {
            this.Entry_Level_pp_grade="E"
            }



            
        
    if(this.Mid_Level <=100 && this.Mid_Level >90)
        {
        this.Mid_Level_grade="A+"
        }
        else if(this.Mid_Level <=90 && this.Mid_Level >80)
        {
        this.Mid_Level_grade="A"
        }
        else if(this.Mid_Level <=80 && this.Mid_Level >70)
        {
        this.Mid_Level_grade="B+"
        }
        else if(this.Mid_Level <=70 && this.Mid_Level >60)
        {
        this.Mid_Level_grade="B"
        }
        else if(this.Mid_Level <=60 && this.Mid_Level >50)
        {
        this.Mid_Level_grade="C+"
        }
        else if(this.Mid_Level <=50 && this.Mid_Level >40)
        {
        this.Mid_Level_grade="C"
        }
        else if(this.Mid_Level <=40 && this.Mid_Level >30)
        {
        this.Mid_Level_grade="D+"
        }
        else if(this.Mid_Level <=30 && this.Mid_Level >=20)
        {
        this.Mid_Level_grade="D"
        }
        else if(this.Mid_Level <20)
        {
        this.Mid_Level_grade="E"
        }


        if(this.Personality_and_Professionalism_Midlevel <=10 && this.Personality_and_Professionalism_Midlevel >9)
            {
            this.Mid_Level_pp_grade="A+"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=9 && this.Personality_and_Professionalism_Midlevel >8)
            {
            this.Mid_Level_pp_grade="A"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=8 && this.Personality_and_Professionalism_Midlevel >7)
            {
            this.Mid_Level_pp_grade="B+"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=7 && this.Personality_and_Professionalism_Midlevel >6)
            {
            this.Mid_Level_pp_grade="B"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=6 && this.Personality_and_Professionalism_Midlevel >5)
            {
            this.Mid_Level_pp_grade="C+"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=5 && this.Personality_and_Professionalism_Midlevel >4)
            {
            this.Mid_Level_pp_grade="C"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=4 && this.Personality_and_Professionalism_Midlevel >3)
            {
            this.Mid_Level_pp_grade="D+"
            }
            else if(this.Personality_and_Professionalism_Midlevel <=3 && this.Personality_and_Professionalism_Midlevel >=2)
            {
            this.Mid_Level_pp_grade="D"
            }
            else if(this.Personality_and_Professionalism_Midlevel <2)
            {
            this.Mid_Level_pp_grade="E"
            }
    


                
        
    if(this.Exit_Level <=100 && this.Exit_Level >90)
        {
        this.Exit_Level_grade="A+"
        }
        else if(this.Exit_Level <=90 && this.Exit_Level >80)
        {
        this.Exit_Level_grade="A"
        }
        else if(this.Exit_Level <=80 && this.Exit_Level >70)
        {
        this.Exit_Level_grade="B+"
        }
        else if(this.Exit_Level <=70 && this.Exit_Level >60)
        {
        this.Exit_Level_grade="B"
        }
        else if(this.Exit_Level <=60 && this.Exit_Level >50)
        {
        this.Exit_Level_grade="C+"
        }
        else if(this.Exit_Level <=50 && this.Exit_Level >40)
        {
        this.Exit_Level_grade="C"
        }
        else if(this.Exit_Level <=40 && this.Exit_Level >30)
        {
        this.Exit_Level_grade="D+"
        }
        else if(this.Exit_Level <=30 && this.Exit_Level >=20)
        {
        this.Exit_Level_grade="D"
        }
        else if(this.Exit_Level <20)
        {
        this.Exit_Level_grade="E"
        }


        if(this.Personality_and_Professionalism_Exitlevel <=10 && this.Personality_and_Professionalism_Exitlevel >9)
            {
            this.Exit_Level_pp_grade="A+"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=9 && this.Personality_and_Professionalism_Exitlevel >8)
            {
            this.Exit_Level_pp_grade="A"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=8 && this.Personality_and_Professionalism_Exitlevel >7)
            {
            this.Exit_Level_pp_grade="B+"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=7 && this.Personality_and_Professionalism_Exitlevel >6)
            {
            this.Exit_Level_pp_grade="B"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=6 && this.Personality_and_Professionalism_Exitlevel >5)
            {
            this.Exit_Level_pp_grade="C+"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=5 && this.Personality_and_Professionalism_Exitlevel >4)
            {
            this.Exit_Level_pp_grade="C"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=4 && this.Personality_and_Professionalism_Exitlevel >3)
            {
            this.Exit_Level_pp_grade="D+"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <=3 && this.Personality_and_Professionalism_Exitlevel >=2)
            {
            this.Exit_Level_pp_grade="D"
            }
            else if(this.Personality_and_Professionalism_Exitlevel <2)
            {
            this.Exit_Level_pp_grade="E"
            }

            if(this.Project_Score <=100 && this.Project_Score >90)
                {
                this.Project_Score_grade="A+"
                }
                else if(this.Project_Score <=90 && this.Project_Score >80)
                {
                this.Project_Score_grade="A"
                }
                else if(this.Project_Score <=80 && this.Project_Score >70)
                {
                this.Project_Score_grade="B+"
                }
                else if(this.Project_Score <=70 && this.Project_Score >60)
                {
                this.Project_Score_grade="B"
                }
                else if(this.Project_Score <=60 && this.Project_Score >50)
                {
                this.Project_Score_grade="C+"
                }
                else if(this.Project_Score <=50 && this.Project_Score >40)
                {
                this.Project_Score_grade="C"
                }
                else if(this.Project_Score <=40 && this.Project_Score >30)
                {
                this.Project_Score_grade="D+"
                }
                else if(this.Project_Score <=30 && this.Project_Score >=20)
                {
                this.Project_Score_grade="D"
                }
                else if(this.Project_Score <20)
                {
                this.Project_Score_grade="E"}
    
    
    this.Get_Companydetails();
   
    ////debugger
    // this.Company_Name = this.Receipt_Voucher_.Company_Name;
    // this.Address1 = this.Receipt_Voucher_.Address1;
    // this.Address2 = this.Receipt_Voucher_.Address2;
    // this.Address3 = this.Receipt_Voucher_.Address3;
    // this.PinCode = this.Receipt_Voucher_.PinCode;
    // this.GSTNo = this.Receipt_Voucher_.GSTNo;
    
    
    
    // this.print_paid = this.numberToEnglish(this.print_amount, "");
    ////debugger;
    setTimeout(function () {
    // this.print_Mark()
    let popupWinindow;
    
    let innerContents = document.getElementById("Print_Div").innerHTML;
    popupWinindow = window.open(
    "",
    "_blank",
    "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
    );
    popupWinindow.document.open();
    popupWinindow.document.write(
    '<html><head><style>@page { size: auto; margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
    innerContents +
    "</html>"
    );
    popupWinindow.document.close();
    }, 1000);
    }
    
    Get_Companydetails() {
    this.issLoading = true;
    this.Student_Service_.Get_Companydetails().subscribe(
    (Rows) => {
    this.issLoading = false;
    this.Companyprint_Data = Rows[0];
    this.print_Company_Name = Rows[0][0].Company_Name;
    this.print_Company_Address1 = Rows[0][0].Address1;
    this.print_Company_Address2 = Rows[0][0].Address2;
    this.print_Company_Address3 = Rows[0][0].Address3;
    this.print_Company_Address4 = Rows[0][0].Address4;
    this.print_Company_pincode = Rows[0][0].Pincode;
    this.print_Company_Phone = Rows[0][0].Phone1;
    this.print_Company_Mobile = Rows[0][0].Mobile;
    this.print_Company_Email = Rows[0][0].Email;
    this.print_Company_Website = Rows[0][0].Website;
    },
    (Rows) => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Error Occured", Type: false },
    });
    }
    );
    }



    
// print_CourseCompletion_Certificate(Student_e: Student, index) {

//     debugger


//     this.Student_Name =Student_e.Student_Name;
//     this.course_name=Student_e.Course_Name;
//     this.BatchName=Student_e.Batch_Name;
//     this.Faculty=Student_e.Faculty;
//     this.startdate=Student_e.Start_Date;
//     this.enddate=Student_e.End_Date;

//     this.Final_Score=Student_e.Final_Score;

//     if(this.Final_Score>=60){this.finalscore_statusname ="Pass"}
//     else(this.finalscore_statusname ="Fail")
//     this.Grade=Student_e.Grade;
//     this.Sum_Final_Score=Student_e.Sum_Final_Score;
//     // this.currentdate=this.New_Date(this.FromDate_Search);

//     this.currentdate = new Date();
//     this.currentdate = this.New_Date(this.currentdate);

//     this.Entry_Level  =Student_e.Entry_Level;
//     this.Personality_and_Professionalism_Entrylevel  =Student_e.Personality_and_Professionalism_Entrylevel;
//     this.Mid_Level  =Student_e.Mid_Level;
//     this.Personality_and_Professionalism_Midlevel =Student_e.Personality_and_Professionalism_Midlevel; 
//     this.Exit_Level  =Student_e.Exit_Level;
//     this.Personality_and_Professionalism_Exitlevel  =Student_e.Personality_and_Professionalism_Exitlevel;
//     this.Project_Score  =Student_e.Project_Score;
//     this.attendance_percentage =Student_e.attendance_percentage

    
    
    
//     this.Get_Companydetails();
   
   
//     setTimeout(function () {
//     let popupWinindow;
    
//     let innerContents = document.getElementById("Print_Div_new").innerHTML;
//     popupWinindow = window.open(
//     "",
//     "_blank",
//     "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
//     );
//     popupWinindow.document.open();
//     popupWinindow.document.write(
//     '<html><head><style>@page { size: auto; margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
//     innerContents +
//     "</html>"
//     );
//     popupWinindow.document.close();
//     }, 1000);
//     }

print_CourseCompletion_Certificate(Student_e: Student, index) {
    this.Student_Name = Student_e.Student_Name;
    this.course_name = Student_e.Course_Name;
    this.startdate = Student_e.Start_Date;
    this.enddate = Student_e.End_Date;
    this.Final_Score = Student_e.Final_Score;
    this.Grade=Student_e.Grade;

   
    this.currentdate = new Date();
    this.currentdate = this.New_Date(this.currentdate);

    setTimeout(() => {
        const innerContents = document.getElementById("Print_Div_new").innerHTML;
        const popupWinindow = window.open("", "_blank", "width=800,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no");

        popupWinindow.document.open();
        popupWinindow.document.write(`
            <html>
            <head>
                <style>
                    @page { size: auto; margin: 0mm; }
                    body { margin: 0; }
                </style>
                <link rel="stylesheet" type="text/css" href="style.css">
            </head>
            <body onload="window.print()">
                ${innerContents}
            </body>
            </html>
        `);
        popupWinindow.document.close();
    }, 1000);
}


}

