import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import { Attendance_Status } from '../../../models/Attendance_Status';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';

import { Attendance_Master } from '../../../models/Attendance_Master';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Attendance_Report',
templateUrl: './Attendance_Report.component.html',
styleUrls: ['./Attendance_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Attendance_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Duration:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Attendance_Report_Edit:boolean;
    Attendance_Report_Save:boolean;
    Attendance_Report_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Edit_Page_Permission: any;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    Export_Permission:any;
    Export_View :boolean =false;


    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]

    Login_User: number = 0;
    Attendance_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Faculty_Data: Users[];
    Faculty_Data_Filter: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;


    Attendance_Status_Data: Attendance_Status[]
    Attendance_Status: Attendance_Status = new Attendance_Status();
    Attendance_Status_Search: string;

    Login_User_Type_Data:any;
    faculty_edit:number;
    login_user_name: string;

    AbsentCount: number = 0;
    PresentCount: number = 0;
   

    Batch_Selection_=new FormControl();
    Search_Batch_Selection_Temp:any

    Trainer:number;
    
    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.login_user_name = (localStorage.getItem("uname"));
    
    this.Permissions = Get_Page_Permission(34);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Attendance_Report_Edit=this.Permissions.Edit;
    this.Attendance_Report_Save=this.Permissions.Save;
    this.Attendance_Report_Delete=this.Permissions.Delete;
    this.Page_Load()

    this.Attendance_Status_Data=[];
    this.Attendance_Status_Data.push({'Attendance_Status_Id':0,'Attendance_Status_Name':'All'});
    this.Attendance_Status_Data.push({'Attendance_Status_Id':1,'Attendance_Status_Name':'Present'});
    this.Attendance_Status_Data.push({'Attendance_Status_Id':2,'Attendance_Status_Name':'Absent'});


    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Export()
{
    
        this.Student_Service_.exportExcel(this.Attendance_Master_Data,'Attendance Report')
       
}

Page_Load()
{
    debugger
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight-350;
    this.myTotalHeight=this.myTotalHeight-100;
    this.myInnerHeight = this.myInnerHeight - 250;
    this.Get_Login_User_Type();
    this.Trainer =this.Login_User;
    // this.Load_Attendance_Status();
    this.Search_Attendance_Report();
    this.Search_Batch_Typeahead_Report_New( this.Trainer );
   

    this.Faculty_Temp.Users_Id = this.Login_User;
    this.Faculty_Temp.Users_Name = this.login_user_name;
    this.Faculty_ = Object.assign(this.Faculty_Temp);
    
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

// Load_Attendance_Status()
// {
//     
//     this.issLoading = true;
//     this.Student_Service_.Load_Attendance_Status().subscribe(Rows => {
//         if (Rows != null) {
//             this.Attendance_Status_Data = Rows[0];
//             this.Attendance_Status_Temp.Attendance_Status_Id = 0;
//             this.Attendance_Status_Temp.Attendance_Status_Name = "Select";
//             this.Attendance_Status_Data.unshift(this.Attendance_Status_Temp);
//             this.Attendance_Status = this.Attendance_Status_Data[0];
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }

// Fill_Student()
// {
//     this.Attendance_Master_.Attendance_Status=this.Attendance_Status.Attendance_Status_Id;
// }



// Search_Batch_Typeahead_Report()
// {
    
//     this.issLoading = true;
//     this.Student_Service_.Search_Batch_Typeahead_Report('',this.Login_User).subscribe(Rows => {
//         if (Rows != null) {
//             debugger
//             this.Batch_Data = Rows[0];
            
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }

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
   

    this.Search_Batch_Typeahead_Report_New(this.Trainer)

}

Search_Batch_Typeahead_Report_New(trainer)
{
    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Batch_Typeahead_Report_New('',this.Login_User,trainer).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Batch_Data = Rows[0];
            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
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

Edit_Attendance(Student_Id, i) {
    
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
    //   Search_Batch_Typeahead(event: any)
    //   {     
    //     debugger
    //       var Value = "";
    //       if (event.target.value == "")
    //           Value = "";
    //       else
    //           Value = event.target.value;
    //       if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    //       {
    //           this.issLoading = true;
    //            this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
    //             // this.Student_Service_.Search_Batch_Typeahead_Report('',this.Login_User).subscribe(Rows => {
    //                 debugger
    //       if (Rows != null) 
    //       {
    //           this.Batch_Data = Rows[0];
    //           this.issLoading = false;
      
    //           this.Batch_Data_Filter=[];
      
    //           for (var i=0;i<this.Batch_Data.length;i++)
    //           {
    //               if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
    //                   this.Batch_Data_Filter.push(this.Batch_Data[i])
    //           }
    //       }
    //       },
    //       Rows => {
    //        this.issLoading = false;
    //       });
    //       } 
      
    //       else
    //       {
              
    //           this.Batch_Data_Filter=[];
    //           for (var i=0;i<this.Batch_Data.length;i++)
    //           {
    //               if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
    //                   this.Batch_Data_Filter.push(this.Batch_Data[i])
    //           }
    //       }
    //   }
      display_Batch(Batch_: Batch)
      {     
          if (Batch_) { return Batch_.Batch_Name; }
      }



Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
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
Search_Attendance_Report()
{
    var  Course_Id = 0, Batch_Id = "", Faculty_Id = 0; 
    var Attendance_Status_Id=0;
    
    this.Total_Duration=0;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    
    if (this.Faculty_ != undefined && this.Faculty_ != null)
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
        Faculty_Id = this.Faculty_.Users_Id;


        if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    
    // if (this.Batch_ != undefined && this.Batch_ != null)
    //     if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
    //     Batch_Id = this.Batch_.Batch_Id;

        
       var t= this.Attendance_Status.Attendance_Status_Name
        if (this.Attendance_Status != undefined && this.Attendance_Status != null)
        if (this.Attendance_Status.Attendance_Status_Id != undefined && this.Attendance_Status.Attendance_Status_Id != null)
         Attendance_Status_Id = this.Attendance_Status.Attendance_Status_Id;




         debugger
         this.Search_Batch_Selection_Temp=this.Batch_Selection_;
         if (this.Batch_Selection_.value !=undefined)
         {
             for (var i=0;i<this.Batch_Selection_.value.length;i++)
             {
                 Batch_Id=Batch_Id + this.Batch_Selection_.value[i].Batch_Id.toString() +",";
             }
             if(Batch_Id.length>0)
             Batch_Id=Batch_Id.substring(0,Batch_Id.length-1)
         
             
         }


    this.issLoading = true;
    
    this.Student_Service_.Search_Attendance_Report(moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Faculty_Id,Course_Id,Batch_Id,Attendance_Status_Id,this.Login_User).subscribe(Rows =>{
       debugger 
    this.Attendance_Master_Data = Rows[0];
    
for (var i=0;i<this.Attendance_Master_Data.length;i++)
        {
            if(this.Attendance_Master_Data[i].Attendance_Status_Name =="Present")
            {
                this.Attendance_Master_Data[i].Attendance_clr=1
            }
            else (this.Attendance_Master_Data[i].Attendance_clr = 2);
            
        }  


      debugger

      let absentCount = 0;
      let presentCount = 0;

    for (let i = 0; i < this.Attendance_Master_Data.length; i++) {
    if (this.Attendance_Master_Data[i].Attendance_Status_Name === "Absent") {
        absentCount++;
    } else if (this.Attendance_Master_Data[i].Attendance_Status_Name === "Present") {
        presentCount++;
    }
    }


    this.AbsentCount=absentCount;
    this.PresentCount=presentCount


    this.Total_Entries = this.Attendance_Master_Data.length;
    for(var i=0;i<this.Attendance_Master_Data.length;i++)
    {
        this.Total_Duration=Number(this.Total_Duration)+Number(this.Attendance_Master_Data[i].Duration);
    }
    this.issLoading = false;
    if(this.Attendance_Master_Data.length==0)
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
}

