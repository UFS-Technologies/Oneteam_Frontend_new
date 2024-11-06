import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Attendance_Master } from '../../../models/Attendance_Master';
import { Attendance_Student } from '../../../models/Attendance_Student';
import { Attendance_Subject } from '../../../models/Attendance_Subject';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Attendance',
templateUrl: './Attendance.component.html',
styleUrls: ['./Attendance.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class AttendanceComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Permissions1: any;
    Attendance_Edit:boolean;
    Attendance_Save:boolean;
    Attendance_Delete:boolean;
    myInnerHeight: number;
    myInnerHeightt: number;
    myInnerHeighttt: number;
    myTotalHeight:number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Attendance_Id: number = 0;
    Attendance_Data: []
    Job_Code_Search:string;
    Student_Search:string;
    Job_Location_Search:string;

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Search:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[] 

    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Search:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Attendance_EditIndex: number = -1;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;
    batchsaveview:boolean=true;

    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];

    Attendance_Student_:Attendance_Student=new Attendance_Student;
    Attendance_Student_Temp:Attendance_Student=new Attendance_Student;
    Attendance_Student_Data:Attendance_Student[];
    Attendance_Student_Data_Temp:Attendance_Student[];
    Absent_Student_Temp:Attendance_Student=new Attendance_Student;
    Absent_Student_Data_Temp:Attendance_Student[];
    Absent_Student_Data:Attendance_Student[];
    Attendance_Subject_:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Temp:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Data:Attendance_Subject[];
    Attendance_Subject_Data_saved_syllabus:Attendance_Subject[];
    Attendance_Subject_Data_Temp:Attendance_Subject[];

    Attendance_Syllabus_Edit:boolean;
    batchsavepermission:number;

    Batch_End_Warning_Data:any;

    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    AgreementStatus_: boolean=false

    Attendance_Count :number;
    Entry_Level_Status_: boolean=false
    Mid_Level_Status_: boolean=false
    Exit_Level_Status_: boolean=false
    Project_Status_: boolean=false
    End_days_difference :number;
    Absent_remark_view:boolean=false;
    
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(33);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Attendance_Edit=this.Permissions.Edit;
    this.Attendance_Save=this.Permissions.Save;
    this.Attendance_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{

    this.Search_Batch_End_Warning();
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 250;


    

    this.myInnerHeightt = (window.innerHeight);
    this.myInnerHeightt = this.myInnerHeightt - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.myInnerHeightt = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeightt
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeightt = this.myInnerHeightt - 250;

    
    this.myInnerHeighttt = (window.innerHeight);
    this.myInnerHeighttt = this.myInnerHeighttt - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.myInnerHeighttt = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeighttt-250
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeighttt = this.myInnerHeighttt - 300;

   
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
}
Search_Course_change()
{
    this.Batch_Search.Batch_Id=0;
    this.Batch_Search.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
}
Close_Click()
{
  this.Entry_View=false;
  this.clr_Attendance()
  this.Search_Attendance_Student();
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
        this.Course_Data_Filter=[];
        this.issLoading = false;

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
        // this.Student_Service_.Search_Batch_Typeahead_1('',Course_Id).subscribe(Rows => {
        this.Student_Service_.Search_Batch_Typeahead_Attendance('',Course_Id,this.Login_User).subscribe(Rows => {
    if (Rows != null) 
    {

        debugger
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

Batch_Typeahead_Service1(Value,Course_Id)
{
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        
        // this.Student_Service_.Search_Batch_Typeahead_1('',this.Course_Search.Course_Id).subscribe(Rows =>
        // this.Student_Service_.Search_Batch_Typeahead_1('',Course_Id).subscribe(Rows => {
        this.Student_Service_.Search_Batch_Typeahead_Attendance1('',Course_Id,this.Login_User).subscribe(Rows => {
    if (Rows != null) 
    {

        debugger
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
   
    this.Batch_Typeahead_Service1(Value,this.Course_.Course_Id);
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
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
}
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
display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Search_Attendance()
{
    var  Course_Id = 0, Batch_Id = 0;

    if (this.Course_ == undefined || this.Course_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Batch_ == undefined || this.Batch_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
        return
    }
    if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
        return
    }

    if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    
    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;

        
    this.issLoading = true;
    
    this.Student_Service_.Search_Attendance(Course_Id,Batch_Id,this.Login_User).subscribe(Rows =>{
        debugger
        this.Attendance_Student_Data=Rows[0];
        this.Attendance_Subject_Data=Rows[2];
        this.Attendance_Subject_Data_saved_syllabus=Rows[3];
        for(var i=0;i<this.Attendance_Subject_Data.length;i++ )
            for(var j=0;j<this.Attendance_Subject_Data_saved_syllabus.length;j++ )
                if(this.Attendance_Subject_Data[i].Subject_Id==this.Attendance_Subject_Data_saved_syllabus[j].Subject_Id)
                    this.Attendance_Subject_Data[i].Checkbox=true;



        // for (var i=0;i<this.Attendance_Subject_Data.length;i++)
        // {
        //     if(this.Attendance_Subject_Data[i].Checkbox ==true)
        //     {
        //         this.Attendance_Subject_Data[i].CheckboxView=0
        //     }
        //     else (this.Attendance_Subject_Data[i].CheckboxView = 1);
            
        // }    


        this.Permissions1 = Get_Page_Permission(78);
        if(this.Permissions1!=undefined || this.Permissions1!=null)
                {
                    this.Attendance_Syllabus_Edit=this.Permissions1.Edit;
                        if(this.Attendance_Syllabus_Edit==true)
                        {
                            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
                            {
                                if(this.Attendance_Subject_Data[i].Checkbox ==true)
                                {
                                    this.Attendance_Subject_Data[i].CheckboxView=1
                                }
                                else (this.Attendance_Subject_Data[i].CheckboxView = 1);
                                
                            }
                        }


                        else
                        {
                            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
                            {
                                if(this.Attendance_Subject_Data[i].Checkbox ==true)
                                {
                                    this.Attendance_Subject_Data[i].CheckboxView=0
                                }
                                else (this.Attendance_Subject_Data[i].CheckboxView = 1);
                                
                            } 
                        }
                   
                }
        else
        {
            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
        {
            if(this.Attendance_Subject_Data[i].Checkbox ==true)
            {
                this.Attendance_Subject_Data[i].CheckboxView=0
            }
            else (this.Attendance_Subject_Data[i].CheckboxView = 1);
            
        }
        }


        for (var i=0;i<this.Attendance_Subject_Data.length;i++)
        {
            if(this.Attendance_Subject_Data[i].Checkbox ==true)
            {
                this.Attendance_Subject_Data[i].Color=1
            }
            else (this.Attendance_Subject_Data[i].Color = 2);
            
        }

        debugger
        // this.Attendance_Subject_Data.sort((a, b) => a.Checkbox - b.Checkbox);
        this.Attendance_Subject_Data.sort((a, b) => Number(a.Checkbox) - Number(b.Checkbox));

        this.Attendance_Count =Rows[4][0].Attendance_Count;
        this.End_days_difference =Rows[5][0].End_days_difference;



    this.issLoading = false;
    if(this.Attendance_Student_Data.length==0 && this.Attendance_Subject_Data.length==0)
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
clr_Attendance()
{
    this.Attendance_Master_.Attendance_Master_Id=0;
    this.Attendance_Master_.Duration=0;
    this.Attendance_Master_.Percentage=0;
    this.Course_=null;
    this.Batch_=null;
    this.Attendance_Student_Data=[];
    this.Attendance_Subject_Data=[];
    // this.Attendance_Student_.Attendance_Status = false;
}
Save_Attendance()
{
    debugger
    var Menu_Student=false; var Menu_Subject=false;

    this.Exit_Level_Status_=false;
//  var Attendance_Status_value=false;
    
    if (this.Course_ == undefined || this.Course_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Batch_ == undefined || this.Batch_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
        return
    }
    if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
        return
    }    
    if (this.Attendance_Master_.Duration == undefined ||this.Attendance_Master_.Duration == null || this.Attendance_Master_.Duration==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Duration', Type: "3" } });
        return
    }    
    if (this.Attendance_Student_Data==undefined||this.Attendance_Student_Data.length==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data in Student', Type: "3" } });
        return
    }
    if (this.Attendance_Subject_Data==undefined||this.Attendance_Subject_Data.length==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data in Subject', Type: "3" } });
        return
    }
    

 

    // if (this.Attendance_Student_.Attendance_Status == true)
    // Attendance_Status_value = true;




    for (var i = 0; i < this.Attendance_Student_Data.length; i++)
    {
        if(this.Attendance_Student_Data[i].Check_Box== true)
        
        {
            Menu_Student=true
            i=this.Attendance_Student_Data.length
            }
    } 
    for (var i = 0; i < this.Attendance_Subject_Data.length; i++)
    {
        if(this.Attendance_Subject_Data[i].Checkbox== true)
        {
        Menu_Subject=true
        i=this.Attendance_Subject_Data.length
        }
    } 
    // if (Menu_Student==false)
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Are you sure you want to continue without student ?',Type:true,Heading:'Confirm'}});
    //     dialogRef.afterClosed().subscribe(result =>
    //     {
    //     if(result=='Yes')
    //     {
      
    //     // this.issLoading=true;
    
    
    //     }
    //     else
    //     {
    //         return 
    //     }
    //     });
    // }
    // if (Menu_Subject==false)
    // {
    //     // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Syllabus', Type: "3" } });
    //     // return
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Are you sure you want to continue without syllabus ?',Type:true,Heading:'Confirm'}});
    //     dialogRef.afterClosed().subscribe(result =>
    //     {
    //     if(result=='Yes')
    //     {
      
    //     // this.issLoading=true;
    
    
    //     }
    //     else
    //     {
    //         return 
    //     }
    //     });
    // }




 
// 
    // this.Attendance_Student_.Attendance_Status = false;
    this.Attendance_Master_.Course_Id=this.Course_.Course_Id;
    this.Attendance_Master_.Batch_Id=this.Batch_.Batch_Id;
    this.Attendance_Master_.Faculty_Id=this.Login_User;

    this.Attendance_Student_Data_Temp=[]; 
    this.Absent_Student_Data_Temp = [];
    // for (var i = 0; i< this.Attendance_Student_Data.length; i++) 
    // {
    //     if (Boolean(this.Attendance_Student_Data[i].Check_Box) == true) 
    //     {
    //     this.Attendance_Student_Data_Temp.push(this.Attendance_Student_Data[i]);
    //     }
    //     if (Boolean(this.Attendance_Student_Data[i].Check_Box) == false) 
    //     {
    //         this.Absent_Student_Data_Temp.push(this.Attendance_Student_Data[i]);
    //     }
           
    // }
    this.Attendance_Master_.Attendance_Student = this.Attendance_Student_Data;

    //this.Attendance_Master_.Absent_Student = this.Absent_Student_Data_Temp;
    this.Attendance_Subject_Data_Temp=[]; 

    var Percentage  :number = 0;
    var Sum:number = 0;
    var Count :number = 0;

    for (var i = 0; i< this.Attendance_Subject_Data.length; i++) 
    {
        
        if (Boolean(this.Attendance_Subject_Data[i].Checkbox) == true) 
        {
            this.Attendance_Subject_Data_Temp.push(this.Attendance_Subject_Data[i]);
            if (Number(this.Attendance_Subject_Data[i].Minimum_Mark)>Percentage)
                Percentage=Number(this.Attendance_Subject_Data[i].Minimum_Mark)
    
        }
    }
   //Percentage = Sum/Count;
    this.Attendance_Master_.Absent_Value=1;
    this.Attendance_Master_.Attendance_Student_Value=1;
    this.Attendance_Master_.Attendance_Subject_Value=1;
    this.Attendance_Master_.Attendance_Status = Menu_Student;
    this.Attendance_Master_.Percentage=Percentage;
    this.Attendance_Master_.Attendance_Subject = this.Attendance_Subject_Data_Temp;
    
    if(this.Attendance_Master_.Attendance_Subject.length==0)
{
    this.Attendance_Master_.Attendance_Subject_Value=0;
    this.Attendance_Subject_Temp.Attendance_Master_Id=0;
    this.Attendance_Subject_Data_Temp.push( this.Attendance_Subject_Temp);
    this.Attendance_Master_.Attendance_Subject = this.Attendance_Subject_Data_Temp;
}

if(this.Attendance_Master_.Attendance_Student.length==0)
{
    this.Attendance_Master_.Attendance_Student_Value=0;
    this.Attendance_Student_Temp.Attendance_Master_Id=0;
    this.Attendance_Student_Data_Temp.push( this.Attendance_Student_Temp);
    this.Attendance_Master_.Attendance_Student = this.Attendance_Student_Data_Temp;
}

// if(this.Attendance_Master_.Absent_Student.length==0)
// {
//     this.Attendance_Master_.Absent_Value=0;
//     this.Absent_Student_Temp.Attendance_Master_Id=0;
//     this.Absent_Student_Data_Temp.push( this.Absent_Student_Temp);
//     this.Attendance_Master_.Absent_Student = this.Absent_Student_Data_Temp;
// }
// if(this.Attendance_Count>10)
//     {

//         for (var i = 0; i < this.Attendance_Student_Data.length; i++)
//             {
//                 if(this.Attendance_Student_Data[i].Entry_Level_Status_Name== 'Entry Level Pending')
                
//                 {
//                     this.Entry_Level_Status_=true
//                     i=this.Attendance_Student_Data.length
//                     }
//             } 
// }

debugger
var j=0;
for (var i = 0; i< this.Attendance_Student_Data.length; i++) 
    {
        if (Number(this.Attendance_Student_Data[i].Check_Box) == 0) 
        {   j=i+1
            if(this.Attendance_Student_Data[i].Absent_Remark==""||this.Attendance_Student_Data[i].Absent_Remark==undefined||this.Attendance_Student_Data[i].Absent_Remark==null)
                {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: {Message:'Absent Remark is blank at row ' +j ,Type: "3" } });
                    i= this.Attendance_Student_Data.length
                    return
                }


        }
        
           
    }

  

debugger
var day_count=0;
this.Entry_Level_Status_=false;
for (var i = 0; i < this.Attendance_Subject_Data.length; i++)
    {
        if(this.Attendance_Subject_Data[i].Checkbox==true)
        {

        
        if(this.Attendance_Subject_Data[i].Day== 'Day 11')
            {
                day_count=1 
            }
    }
}



debugger
if(day_count==1)
    {

        for (var i = 0; i < this.Attendance_Student_Data.length; i++)
            {
                if(this.Attendance_Student_Data[i].Entry_Level_Status_Name== 'Entry Level Pending')
                
                {
                    this.Entry_Level_Status_=true
                    i=this.Attendance_Student_Data.length
                    }
            } 
}


debugger
if (this.Entry_Level_Status_==true)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'You cannot update syllubus in case of entry level assessment marked', Type: "3" } });
        return
    }
    


    // if(this.Attendance_Count>50)
    //     {
    
    //         for (var i = 0; i < this.Attendance_Student_Data.length; i++)
    //             {
    //                 if(this.Attendance_Student_Data[i].Mid_Level_Status_Name== 'Mid Level Pending')
                    
    //                 {
    //                     this.Mid_Level_Status_=true
    //                     i=this.Attendance_Student_Data.length
    //                     }
    //             } 
    // }
    debugger

    var day_count1=0;
    this.Mid_Level_Status_=false;
for (var i = 0; i < this.Attendance_Subject_Data.length; i++)
    {
        if(this.Attendance_Subject_Data[i].Checkbox==true)
        {
        if(this.Attendance_Subject_Data[i].Day== 'Day 51')
            {
                day_count1=1 
            }
        }
    }



debugger
if(day_count1==1)
    {

        for (var i = 0; i < this.Attendance_Student_Data.length; i++)
            {
                if(this.Attendance_Student_Data[i].Mid_Level_Status_Name== 'Mid Level Pending')
                
                {
                    this.Mid_Level_Status_=true
                    i=this.Attendance_Student_Data.length
                    }
            } 
}
    
    
    
    if (this.Mid_Level_Status_==true)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'You cannot update syllubus in case of mid level assessment marked', Type: "3" } });
            return
        }
debugger

        if(this.End_days_difference <= 2)
            {
        
                for (var i = 0; i < this.Attendance_Student_Data.length; i++)
                    {
                        if(this.Attendance_Student_Data[i].Exit_Level_Status_Name== 'Exit Level Pending')
                        
                        {
                            this.Exit_Level_Status_=true
                            i=this.Attendance_Student_Data.length
                            }
                    } 
        }
        
        debugger
        
        if (this.Exit_Level_Status_==true)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'You cannot update syllubus in case of Exit level assessment marked', Type: "3" } });
                return
            }
    


for (var i = 0; i < this.Attendance_Student_Data.length; i++)
{
    if(this.Attendance_Student_Data[i].Agreement_Status_Name== 'Agreement Pending')
    
    {
        this.AgreementStatus_=true
        i=this.Attendance_Student_Data.length
        }
} 


debugger
    // this.issLoading=true;

    if(this.AgreementStatus_ ==true)
{
const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: {
        Message: "Agreement pending for some students, Are you sure to save the attendance ?",
        Type: true,
        Heading: "Confirm",
        },
        });
        dialogRef.afterClosed().subscribe((result) => {
        if (result == "Yes") {

    
            this.issLoading=true;
    this.Student_Service_.Save_Attendance(this.Attendance_Master_).subscribe(Save_status => {
        debugger
    if(Number(Save_status[0].Attendance_Master_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click()
    }

   else if(Number(Save_status[0].Attendance_Master_Id_)==-5)
    {
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Attendance Already Marked',Type:"2"}});
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
    });
}
});}


else
{


    

    this.Student_Service_.Save_Attendance(this.Attendance_Master_).subscribe(Save_status => {
        debugger
    if(Number(Save_status[0].Attendance_Master_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click()
    }

   else if(Number(Save_status[0].Attendance_Master_Id_)==-5)
    {
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Attendance Already Marked',Type:"2"}});
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
    });
}





}

Search_Attendance_Student()
{
    var look_In_Date_Value=0, Course_Id = 0, Batch_Id = 0;

    if (this.Is_Date == true)
        look_In_Date_Value = 1;
    if (this.Course_Search!= undefined && this.Course_Search != null)
        if (this.Course_Search.Course_Id != undefined && this.Course_Search.Course_Id != null)
            Course_Id = this.Course_Search.Course_Id;
    
    if (this.Batch_Search != undefined && this.Batch_Search != null)
        if (this.Batch_Search.Batch_Id != undefined && this.Batch_Search.Batch_Id != null)
            Batch_Id = this.Batch_Search.Batch_Id;
        
    this.issLoading = true;
    this.Student_Service_.Search_Attendance_Student(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Course_Id,Batch_Id,this.Login_User).subscribe(Rows =>{
         this.Attendance_Master_Data=Rows[0];
    this.issLoading = false;
    if(this.Attendance_Master_Data.length==0 )
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
Create_New()
{
    this.Entry_View = true;
    this.clr_Attendance()
    this.Attendance_Master_.Duration = null;
}
Edit_Attendance(Attendance_Master_e:Attendance_Master,index)
{ 
    debugger
    this.Entry_View=true;
    this.Attendance_Master_=Attendance_Master_e;
    this.Attendance_Master_=Object.assign({},Attendance_Master_e);
    
    this.Course_Temp.Course_Id = this.Attendance_Master_.Course_Id;
    this.Course_Temp.Course_Name = this.Attendance_Master_.Course_Name;
    this.Course_ = Object.assign({}, this.Course_Temp);
    

    this.Batch_Temp.Batch_Id = this.Attendance_Master_.Batch_Id;
    this.Batch_Temp.Batch_Name = this.Attendance_Master_.Batch_Name;
    this.Batch_ = Object.assign({}, this.Batch_Temp);

    this.issLoading = true;
    debugger
    this.Student_Service_.Get_Attendance(this.Attendance_Master_.Attendance_Master_Id,this.Attendance_Master_.Course_Id,this.Attendance_Master_.Batch_Id,this.Login_User).subscribe(Rows => {
        debugger  
        this.Attendance_Student_Data = Rows[0];


       

for (var i = 0; i< this.Attendance_Student_Data.length; i++) 
    {
        if (Number(this.Attendance_Student_Data[i].Check_Box) == 1) 
        {
        this.Attendance_Student_Data[i].Check_Box=true;
        }
        if (Number(this.Attendance_Student_Data[i].Check_Box) == 0) 
        {
            this.Attendance_Student_Data[i].Check_Box=false;
        }
           
    }


    this.Absent_remark_view=false;

    for (var i = 0; i< this.Attendance_Student_Data.length; i++) 
        {
            if (Number(this.Attendance_Student_Data[i].Check_Box) == 0) 
            {
                this.Absent_remark_view=true;
            }
            
               
        }

debugger
        this.Attendance_Subject_Data = Rows[1];
        debugger
        this.Permissions1 = Get_Page_Permission(78);
        if(this.Permissions1!=undefined || this.Permissions1!=null)
                {
                    this.Attendance_Syllabus_Edit=this.Permissions1.Edit;
                        if(this.Attendance_Syllabus_Edit==true)
                        {
                            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
                            {
                                if(this.Attendance_Subject_Data[i].Checkbox ==true)
                                {
                                    this.Attendance_Subject_Data[i].CheckboxView=1
                                }
                                else (this.Attendance_Subject_Data[i].CheckboxView = 1);
                                
                            }
                        }


                        else
                        {
                            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
                            {
                                if(this.Attendance_Subject_Data[i].Checkbox ==true)
                                {
                                    this.Attendance_Subject_Data[i].CheckboxView=0
                                }
                                else (this.Attendance_Subject_Data[i].CheckboxView = 1);
                                
                            } 
                        }
                   
                }
        else
        {
            for (var i=0;i<this.Attendance_Subject_Data.length;i++)
        {
            if(this.Attendance_Subject_Data[i].Checkbox ==true)
            {
                this.Attendance_Subject_Data[i].CheckboxView=0
            }
            else (this.Attendance_Subject_Data[i].CheckboxView = 1);
            
        }
        }

        for (var i=0;i<this.Attendance_Subject_Data.length;i++)
        {
            if(this.Attendance_Subject_Data[i].Checkbox ==true)
            {
                this.Attendance_Subject_Data[i].Color=1
            }
            else (this.Attendance_Subject_Data[i].Color = 2);
            
        }

        //this.Attendance_Subject_Data = Rows[2]
        this.issLoading = false;

    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}


Search_Batch_End_Warning()
{
    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Batch_End_Warning(this.Login_User).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Batch_End_Warning_Data = Rows[0];
            // if( this.Batch_End_Warning_Data[0].User_Type==1)
            // {
            //     this.faculty_edit =1
            // }
            // else( this.faculty_edit =0);
           

            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}


Batch_change()
{

    debugger
    this.batchsaveview =true;

    this.batchsavepermission=this.Batch_.Batch_Complete_Status;
if(this.batchsavepermission==1){ this.batchsaveview =false}
else(this.batchsaveview =true);

}

Checkbox_change()
{

    this.Absent_remark_view=false;

    for (var i = 0; i< this.Attendance_Student_Data.length; i++) 
        {
            if (Number(this.Attendance_Student_Data[i].Check_Box) == 0) 
            {
                this.Absent_remark_view=true;
            }
            
               
        }
}


}

