import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import {Register_Whatsapp} from '../../../models/Register_Whatsapp';
import { Attendance_Master } from '../../../models/Attendance_Master';
import { Attendance_Student } from '../../../models/Attendance_Student';
import { Exam_Result } from '../../../models/Exam_Result';
import { Exam_ResultDetails } from '../../../models/Exam_ResultDetails';
import { Attendance_Subject } from '../../../models/Attendance_Subject';
import { Exam_Type } from '../../../models/Exam_Type';
import { Exam } from '../../../models/Exam';
import { MarkStatus } from '../../../models/MarkStatus';
// import { Level_Score_Master_Master } from '../../../models/Level_Score_Master_Master';
// import { Level_Score_Details } from '../../../models/Level_Score_Details';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Session } from  '../../../models/Session';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Level_Score_Master } from 'app/models/Level_Score_Master';
import { Level_Score_Details } from 'app/models/Level_Score_Details';
;
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Level_Score_Details',
templateUrl: './Level_Score_Details.component.html',
styleUrls: ['./Level_Score_Details.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Level_Score_DetailsComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Attendance_Edit:boolean;
    Attendance_Save:boolean;
    Attendance_Delete:boolean;
    myInnerHeight: number;
    myInnerHeightNew: number;
    myTotalHeight:number;
    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
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
    Login_User: number = 0;
    Attendance_EditIndex: number = -1;
    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

   


    Level_Score_Master_:Level_Score_Master=new Level_Score_Master;
    Level_Score_Master_Temp:Level_Score_Master=new Level_Score_Master;
    Level_Score_Master_Data:Level_Score_Master[];
    Level_Score_Details_:Level_Score_Details=new Level_Score_Details();
    Level_Score_Details_Temp:Level_Score_Details=new Level_Score_Details;
    Level_Score_Details_Data:Level_Score_Details[];
    Level_Score_Details_Data_Temp:Level_Score_Details[];





    Session_:Session = new Session()
    Session_Temp:Session=new Session();
    Session_Data:Session[];
    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    TotalDuration:number=0
    MarkStatus_Type_: MarkStatus = new MarkStatus();
    MarkStatus_Type_Temp: MarkStatus = new MarkStatus();
    MarkStatus_Type_Data: MarkStatus[];


    Finalexamstatus_Sub_Data_save:any[]=[];

    Student_Name_Search:string ="";

constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(99);
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
    this.myInnerHeightNew = this.myTotalHeight - 200;
    this.Load_Session()
    this.Load_Markstatus();
     this.Search_Examdetails_Final();
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
  this.clr_Exam_ResultInternal()
  this.Search_Examdetails_Final();
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

    debugger
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_ == undefined ||this.Course_ == null||this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
   
    this.Batch_Typeahead_Service(Value,this.Course_.Course_Id);
}
Search_Batch_Typeahead_Search(event: any)
{   
    debugger  
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_Search == undefined ||this.Course_Search == null ||this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
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
Search_ExamResult_Final()
{
    var  Course_Id = 0, Batch_Id = 0; var  student_name_ = "";

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

    if (this.Student_Name_Search != undefined && this.Student_Name_Search != null && this.Student_Name_Search != '')
        student_name_ = this.Student_Name_Search;

        
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_LevelScore_Details_Student(Course_Id,Batch_Id,this.Login_User,student_name_).subscribe(Rows =>{
        debugger
        this.Level_Score_Details_Data=Rows[0];
        // this.Level_Score_Details_Data[0].MarkStatus_Type_ =this.MarkStatus_Type_Data[0]; 
        for(var i=0;i<this.Level_Score_Details_Data.length;i++)
        {
        this.Level_Score_Details_Data[i].MarkStatus_Type_ =this.MarkStatus_Type_Data[0]; 
        }
        // this.Attendance_Subject_Data=Rows[2];
        // this.Attendance_Subject_Data_saved_syllabus=Rows[3];
        // for(var i=0;i<this.Attendance_Subject_Data.length;i++ )
        //     for(var j=0;j<this.Attendance_Subject_Data_saved_syllabus.length;j++ )
        //         if(this.Attendance_Subject_Data[i].Subject_Id==this.Attendance_Subject_Data_saved_syllabus[j].Subject_Id)
        //             this.Attendance_Subject_Data[i].Checkbox=true;
                 
        //             // this.Attendance_Master_Data = Rows[4];
        //             this.TotalDuration=Rows[4][0].Total_Duration;
          
        //             for (var i = 0; i < this.Attendance_Subject_Data.length; i++) {
        //                 this.Attendance_Subject_Data[i].Checkbox = false;
                   
        //         }
            

    this.issLoading = false;
    //  && this.Attendance_Subject_Data.length==0
    if(this.Level_Score_Details_Data.length==0)
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
clr_Exam_ResultInternal()
{
    this.Level_Score_Master_.Level_Score_Master_Id=0;
    this.Course_=null;
    this.Batch_=null;
    this.Level_Score_Details_Data=[];

}


Calculate_Total_Mark(i)
{
    var E=0,P_E=0,M=0,P_M=0,EX=0,P_EX=0,P=0,TotalMark=0;
   debugger
    // for (i = 0; i < this.Level_Score_Details_Data.length; i++)
    // {
    


    if(this.Level_Score_Details_Data[i].Entry_Level ==undefined||this.Level_Score_Details_Data[i].Entry_Level ==null)
    E=0;
    else
    E= this.Level_Score_Details_Data[i].Entry_Level ; 
  
    if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel ==undefined||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel  ==null)
    P_E=0;
    else
    P_E= this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel;

   

    if(this.Level_Score_Details_Data[i].Mid_Level ==undefined||this.Level_Score_Details_Data[i].Mid_Level  ==null)
    M=0;
    else
    M= this.Level_Score_Details_Data[i].Mid_Level;



    if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel ==undefined||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel  ==null)
    P_M=0;
    else
    P_M= this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel;



    if(this.Level_Score_Details_Data[i].Exit_Level ==undefined||this.Level_Score_Details_Data[i].Exit_Level  ==null)
    EX=0;
    else
    EX= this.Level_Score_Details_Data[i].Exit_Level;

    if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel ==undefined||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel  ==null)
    P_EX=0;
    else
    P_EX= this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel;


    if(this.Level_Score_Details_Data[i].Project_Score ==undefined||this.Level_Score_Details_Data[i].Project_Score  ==null)
        P=0;
        else
        P= this.Level_Score_Details_Data[i].Project_Score;
    
    
    



    TotalMark = Number(E)+ Number(P_E) + Number(M) + Number(P_M) +Number(EX)+Number(P_EX)+Number(P);
    this.Level_Score_Details_Data[i].TotalMark = TotalMark;
    // if(this.Level_Score_Details_Data[i].TotalMark ==undefined||this.Level_Score_Details_Data[i].TotalMark  ==null)
    // TotalMark =0
// }

}




Save_Exam_Result_Final()
{
    var Menu_Student=false; var Menu_Subject=false; 
    this.Finalexamstatus_Sub_Data_save=[];
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
     
    if (this.Level_Score_Details_Data==undefined||this.Level_Score_Details_Data.length==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data in Student', Type: "3" } });
        return
    }
 debugger
    for (var i = 0; i < this.Level_Score_Details_Data.length; i++)
    {
        if(this.Level_Score_Details_Data[i].Check_Box== true)
        
        {
//    if (this.Level_Score_Details_Data[i].Speaking==undefined||this.Level_Score_Details_Data[i].Speaking==0||this.Level_Score_Details_Data[i].Speaking==null)
//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Speaking Section Mark', Type: "3" } });
//        return
//    }

//    if (this.Level_Score_Details_Data[i].Reading==undefined||this.Level_Score_Details_Data[i].Reading==0||this.Level_Score_Details_Data[i].Reading==null)
//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Reading Section Mark', Type: "3" } });
//        return
//    }

//    if (this.Level_Score_Details_Data[i].Listening==undefined||this.Level_Score_Details_Data[i].Listening==0||this.Level_Score_Details_Data[i].Listening==null)
//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Listening Section Mark', Type: "3" } });
//        return
//    }

//    if (this.Level_Score_Details_Data[i].Writing==undefined||this.Level_Score_Details_Data[i].Writing==0||this.Level_Score_Details_Data[i].Writing==null)
//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Writing Section Mark', Type: "3" } });
//        return
//    }

   
//    if (this.Level_Score_Details_Data[i].Grammer==undefined||this.Level_Score_Details_Data[i].Grammer==0||this.Level_Score_Details_Data[i].Grammer==null)
//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Grammer Section Mark', Type: "3" } });
//        return
//    }


//    if (this.Level_Score_Details_Data[i].MarkStatus_Type_ ==undefined || this.Level_Score_Details_Data[i].MarkStatus_Type_ ==null)

//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select MarK Status', Type: "3" } });
//        return
//    }
//    if (this.Level_Score_Details_Data[i].MarkStatus_Type_.Markstatus_Id ==undefined || this.Level_Score_Details_Data[i].MarkStatus_Type_.Markstatus_Id ==null || this.Level_Score_Details_Data[i].MarkStatus_Type_.Markstatus_Id ==0)

//    {
//        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select MarK Status', Type: "3" } });
//        return
//    }

}
}


// for (var i = 0; i< this.Level_Score_Details_Data.length; i++) 
// {
    
//     if (Boolean(this.Level_Score_Details_Data[i].Check_Box) == true) 
//     {
//         if (this.Level_Score_Details_Data[i].MarkStatus_Type_ =this.MarkStatus_Type_Data[0]); 

//         {
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select MarK Status', Type: "3" } });
//             return
//         }

//     }

// }
debugger

    for (var i = 0; i < this.Level_Score_Details_Data.length; i++)
    {
        if(this.Level_Score_Details_Data[i].Check_Box== true)
        
        {
            Menu_Student=true
            i=this.Level_Score_Details_Data.length
            }
    } 
  
    if (Menu_Student==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Student', Type: "3" } });
        return
    }
    debugger
    this.Level_Score_Master_.Course_Id=this.Course_.Course_Id;
    this.Level_Score_Master_.Batch_Id=this.Batch_.Batch_Id;
    this.Level_Score_Master_.User_Id=this.Login_User;
  

    this.Level_Score_Details_Data_Temp=[]; 
   

    

    for (var i = 0; i< this.Level_Score_Details_Data.length; i++) 
    {
        
        if (Boolean(this.Level_Score_Details_Data[i].Check_Box) == true) 
        {
                   
        this.Level_Score_Details_Data_Temp.push(this.Level_Score_Details_Data[i]);
        this.Level_Score_Details_Data[i].Markstatus_Id=this.Level_Score_Details_Data[i].MarkStatus_Type_.Markstatus_Id
        this.Level_Score_Details_Data[i].Markstatus_Name=this.Level_Score_Details_Data[i].MarkStatus_Type_.Markstatus_Name
        
        }
        
    }

    for (var i = 0; i< this.Level_Score_Details_Data.length; i++) 
        {
            
            if (Boolean(this.Level_Score_Details_Data[i].Check_Box) == true) 
            {
                       
           
            if(this.Level_Score_Details_Data[i].Entry_Level==null||this.Level_Score_Details_Data[i].Entry_Level==undefined)
            {
                this.Level_Score_Details_Data[i].Entry_Level=0
            }
            if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel==null||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel==undefined)
            {
            this.Level_Score_Details_Data[i].Personality_and_Professionalism_Entrylevel=0
            }
            if(this.Level_Score_Details_Data[i].Mid_Level==null||this.Level_Score_Details_Data[i].Mid_Level==undefined)
            {
            this.Level_Score_Details_Data[i].Mid_Level=0
            }
            if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel==null||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel==undefined)
            {
            this.Level_Score_Details_Data[i].Personality_and_Professionalism_Midlevel=0
            }
            if(this.Level_Score_Details_Data[i].Exit_Level==null||this.Level_Score_Details_Data[i].Exit_Level==undefined)
            {
            this.Level_Score_Details_Data[i].Exit_Level=0
            }

            if(this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel==null||this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel==undefined)
            {
            this.Level_Score_Details_Data[i].Personality_and_Professionalism_Exitlevel=0
            }
            if(this.Level_Score_Details_Data[i].Project_Score==null||this.Level_Score_Details_Data[i].Project_Score==undefined)
            {
            this.Level_Score_Details_Data[i].Project_Score=0
            }
            if(this.Level_Score_Details_Data[i].Project_Url==null||this.Level_Score_Details_Data[i].Project_Url==undefined)
            {
            this.Level_Score_Details_Data[i].Project_Url=''
            }

            // this.Level_Score_Details_Data_Temp.push(this.Level_Score_Details_Data[i]);
            
            }
            
        }



debugger
     this.Level_Score_Master_.Level_Score_Details = this.Level_Score_Details_Data_Temp;
   
 
  
    this.Level_Score_Master_.Level_Score_Details_Value=1;
    this.Level_Score_Master_.Check_Box = Menu_Student;


if(this.Level_Score_Master_.Level_Score_Details.length==0)
{
    debugger
    this.Level_Score_Master_.Level_Score_Details_Value=0;
    this.Level_Score_Details_Temp.Level_Score_Master_Id=0;
    // this.Level_Score_Details_.Markstatus_Id = 
    this.Level_Score_Details_Data_Temp.push( this.Level_Score_Details_Temp);
    //  this.Level_Score_Details_Data_Temp.push( this.MarkStatus_Type_);
    this.Level_Score_Master_.Level_Score_Details = this.Level_Score_Details_Data_Temp;

   
}

  this.Level_Score_Master_.Level_Score_Details= this.Level_Score_Details_Data_Temp;
    this.issLoading=true;
debugger
    this.Student_Service_.Save_Level_Score_Student(this.Level_Score_Master_).subscribe(Save_status => {
        
        this.issLoading=false;
        debugger
    if(Number(Save_status[0].Level_Score_Master_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});

// this. Save_Student_Whatsapp(Save_status[0].Date_);
        this.Close_Click()
    }
   
//     else if(Save_status[0].Attendance_Master_Id_=-2)
// {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Edit Not allowed', Type: "3" } });
//     return
// }

    else 
    {        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
       
    },
    Rows => { 
        this.issLoading=false;  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

Search_Examdetails_Final()
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
    debugger
    this.Student_Service_.Search_LevelScore_Master_Student(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Course_Id,Batch_Id,this.Login_User).subscribe(Rows =>{
         this.Level_Score_Master_Data=Rows[0];
        
         debugger
    this.issLoading = false;
    if(this.Level_Score_Master_Data.length==0 )
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
    this.clr_Exam_ResultInternal()
}
Edit_ExamresultFinal(Level_Score_Master_e:Level_Score_Master,index)
{
    
    this.Entry_View=true;
    this.Level_Score_Master_=Level_Score_Master_e;
    this.Level_Score_Master_=Object.assign({},Level_Score_Master_e);
 
    this.Course_Temp.Course_Id = this.Level_Score_Master_.Course_Id;
    this.Course_Temp.Course_Name = this.Level_Score_Master_.Course_Name;
    this.Course_ = Object.assign({}, this.Course_Temp);
    

    this.Batch_Temp.Batch_Id = this.Level_Score_Master_.Batch_Id;
    this.Batch_Temp.Batch_Name = this.Level_Score_Master_.Batch_Name;
    this.Batch_ = Object.assign({}, this.Batch_Temp);

  
            

debugger
    this.issLoading = true;
    this.Student_Service_.Get_LevelScore_Student_Details(this.Level_Score_Master_.Level_Score_Master_Id,this.Level_Score_Master_.Course_Id,this.Level_Score_Master_.Batch_Id,this.Login_User).subscribe(Rows => {
         
        this.Level_Score_Details_Data = Rows[0];

        debugger
        for(var i=0;i<this.Level_Score_Details_Data.length;i++)
        {
        if (this.Level_Score_Details_Data[i].Check_Box.toString()=='1')
        {
        this.Level_Score_Details_Data[i].Check_Box=true
        }
        else 
        {
        this.Level_Score_Details_Data[i].Check_Box=false
        }
        for (var j = 0; j < this.MarkStatus_Type_Data.length; j++) 
        {
            debugger
            if (this.MarkStatus_Type_Data[j].Markstatus_Id == this.Level_Score_Details_Data[i].Markstatus_Id) 
            {
                debugger
                this.Level_Score_Details_Data[i].MarkStatus_Type_ = this.MarkStatus_Type_Data[j];
            }
        }
        if(this.Level_Score_Details_Data[i].Markstatus_Id==null)
            this.Level_Score_Details_Data[i].MarkStatus_Type_ =this.MarkStatus_Type_Data[0]; 
        }


      
        this.issLoading = false;
    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Load_Session() {
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(
    (Rows) => {
    if (Rows != null) {
    this.Session_Data = Rows[1];
    this.Session_Temp.Session_Id = 0;
    this.Session_Temp.Session_Name = "Select";
    this.Session_Data.unshift(this.Session_Temp);
    this.Session_ = this.Session_Data[0];
    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }


  

    Delete_ExamResultFinal(Level_Score_Master_Id,index)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
        dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
            {
            this.issLoading=true;
            this.Student_Service_.Delete_LevelScore_Student(Level_Score_Master_Id).subscribe(Delete_status => {
            debugger
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_.data[0];
            if(Delete_status==1){
            this.Level_Score_Master_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
            this.Search_Examdetails_Final();
            }
            else
            {
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            }
            this.issLoading=false;
            },
            Rows => { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
        }
        });
    }


            Load_Markstatus()
            {
                this.Student_Service_.Load_Markstatus().subscribe(Rows =>
            {
                debugger
            this.MarkStatus_Type_Data= Rows[0];        
            this.MarkStatus_Type_Temp.Markstatus_Id = 0;
            this.MarkStatus_Type_Temp.Markstatus_Name = "Select";
            this.MarkStatus_Type_Data.unshift(this.MarkStatus_Type_Temp);
            this.MarkStatus_Type_=this.MarkStatus_Type_Data[0]; 
           
           
            },
                Rows => {
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
        }
        
}

