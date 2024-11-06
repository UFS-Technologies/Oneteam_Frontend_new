import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Agreement_Details_Master } from '../../../models/Agreement_Details_Master';
// import { Agreement_Details_Student } from '../../../models/Agreement_Details_Student';
import {Employer_Details} from '../../../models/Employer_Details'
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { environment } from 'environments/environment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Agreement_Details',
templateUrl: './Agreement_Details.component.html',
styleUrls: ['./Agreement_Details.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Agreement_DetailsComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
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

    Agreement_Details_Master_:Agreement_Details_Master=new Agreement_Details_Master;
    Agreement_Details_Master_Temp:Agreement_Details_Master=new Agreement_Details_Master;
    Agreement_Details_Master_Data:Agreement_Details_Master[];

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


constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
    this.Interview_Master_Id_localStorage = localStorage.getItem('Interview_Master_Id');
   if(this.Interview_Master_Id_localStorage >"0")
   {
    this.Interview_Master_Id = Number(this.Interview_Master_Id_localStorage) ;
    localStorage.setItem('Interview_Master_Id', "0");
   }
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(91);
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
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.Get_Login_User_Type();
    this.Trainer =this.Login_User;
    // this.Agreement_Details_Master_.Description='';
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.FromDate_Search=this.New_Date(this.FromDate_Search)
    this.ToDate_Search=this.New_Date(this.ToDate_Search)
    this.Is_Date_Search=false;
    // this.Load_Employer_Details();
    this.Clr_Agreement_Details();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 245;
    if (this.Interview_Master_Id > 0)
    {          
        this.Entry_View = true;
        this.Load_Placement_Student(this.Interview_Master_Id);
    }

    this.Search_Agreement_Details();

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
  this.Entry_View=false;
  this.Clr_Agreement_Details();
  this.Search_Agreement_Details();
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
        this.Student_Service_.Search_Batch_Typeahead_1('',Course_Id).subscribe(Rows => {
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
    this.Agreement_Details_Master_.Student_Course_Id=0;
    this.Agreement_Details_Master_.Student_Id=0;
    this.Agreement_Details_Master_.Agreement_File="";
    this.Agreement_Details_Master_.Agreement_File_Name="";
    this.Agreement_FileName="";
    
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
    
Search_Agreement_Details()
{

    debugger
    var  Course_Id = 0, Employer_Id = 0,look_In_Date_Value=0,Batch_Id=0;
    var  student_name_ = "",Faculty_Id = 0 ;

    if (this.Is_Date_Search == true)
        look_In_Date_Value = 1;
   
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
    this.Student_Service_.Search_Agreement_Details(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Course_Id,Batch_Id,student_name_,Faculty_Id).subscribe(Rows =>{
        debugger
       
       
        this.Agreement_Details_Student_Data=Rows[0];

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
    
    if(this.Agreement_Details_Master_.Agreement_File_Name==""||this.Agreement_Details_Master_.Agreement_File_Name==undefined||
    this.Agreement_Details_Master_.Agreement_File_Name==null )
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose File',Type:"3"}});
    }
    else
   {
    this.Agreement_Details_Master_.Student_Id =this.Student_Id_;
    this.Agreement_Details_Master_.Student_Course_Id =this.Student_Course_Id_;
    this.Agreement_Details_Master_.Agreement_File_Name =this.Agreement_FileName;
    debugger
    this.Student_Service_.Save_Agreement_Details(this.Agreement_Details_Master_,this.ImageFile_Photo1,this.Document_File_Array).subscribe(Save_status => {
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
Edit_Agreement_Details(Agreement_Details_Master_e:Agreement_Details_Master,index)
{
    this.Entry_View=true;
    this.Agreement_Details_Master_=Agreement_Details_Master_e;
    this.Agreement_Details_Master_=Object.assign({},Agreement_Details_Master_e);

    this.Student_Course_Id_ =this.Agreement_Details_Master_.Student_Course_Id;
    this.Student_Id_ =this.Agreement_Details_Master_.Student_Id;
 
   
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
    if (Batch_) { return Batch_.Batch_Name; }
}


File_Change_Photo1(event: Event) 
{  
    ////debugger  
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Photo1 = file;
    this.Agreement_FileName = this.ImageFile_Photo1[0].name;
    this.Agreement_Details_Master_.Agreement_File_Name =this.Agreement_FileName;

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

}

