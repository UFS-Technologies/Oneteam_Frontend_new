import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Service } from '../../../services/Course.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Course_Fees } from '../../../models/Course_Fees';
import { Course_Subject } from '../../../models/Course_Subject';
import { Study_Materials } from '../../../models/Study_Materials';
import { Fees_Type } from '../../../models/Fees_Type';
import { Course_Type } from '../../../models/Course_Type';
import { Part } from '../../../models/Part';
import { Online_Exam_Status } from '../../../models/Online_Exam_Status';
import { Subject } from '../../../models/Subject';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Period } from '../../../models/Period';
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: { dateInput: "DD/MM/YYYY" },
    display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
    },
    };


@Component({
    selector: 'app-Course',
    templateUrl: './Course.component.html',
    styleUrls: ['./Course.component.css']
})
export class CourseComponent implements OnInit {
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Course_Edit:boolean;
    Course_Save:boolean;
    Course_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    year: any;
month: any;
day: any;
date: any;

    Course_: Course = new Course();
    Course_Data: Course[]
    Course_Name_Search: string;

    Is_Check:boolean=true;  


    Course_Subject: Course_Subject = new Course_Subject();
    Course_Subject_Data: Course_Subject[]

    Course_Fees: Course_Fees = new Course_Fees();
    Course_Fees_Data: Course_Fees[]

    Study_Materials: Study_Materials=new Study_Materials;
    Study_Materials_Data: Study_Materials[];

    Course_Type: Course_Type = new Course_Type;
    Course_Type_Search: Course_Type = new Course_Type;
    Course_Type_Temp: Course_Type = new Course_Type;
    Course_Type_Data: Course_Type[]

    Fees_Type: Fees_Type = new Fees_Type;
    Fees_Type_Temp: Fees_Type = new Fees_Type;
    Fees_Type_Data: Fees_Type[]


    Period_Type: Period = new Period;
    Period_Type_Temp: Period = new Period;
    Period_Type_Data: Period[]

    Part: Part = new Part;
    Part_Material: Part = new Part;
    Part_Temp: Part = new Part;
    Part_Data: Part[]

    Subject: Subject = new Subject;
    Subject_Materials: Subject = new Subject;
    Subject_Temp: Subject = new Subject;
    Subject_Data: Subject[]
    Subject_Data_Filter: Subject[]

    Online_Exam_Status: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Temp: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Data: Online_Exam_Status[]

    Login_User_Id:number=0;

    Course_Fees_Index: number = -1;
    Course_Subject_Index: number = -1;
    Study_Materials_Index: number = -1;
constructor(public Course_Service_:Course_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(12);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Course_Edit=this.Permissions.Edit;
    this.Course_Save=this.Permissions.Save;
    this.Course_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Course();
    this.Search_Course();
    this.Entry_View=false;
    this.Load_Course_DropDowns(); 
    this.Load_Fees_Type();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight - 70;
    this.myTotalHeight=this.myTotalHeight-150;
    this.myInnerHeight = this.myInnerHeight - 120;
}
trackByFn(index, item) 
{
return index;
}
Load_Course_DropDowns()
{
    this.Course_Service_.Load_Course_DropDowns().subscribe(Rows => {

        if (Rows != null) {

            this.Course_Type_Data = Rows[0];
            this.Course_Type_Temp.Course_Type_Id = 0;
            this.Course_Type_Temp.Course_Type_Name = "Select";
            this.Course_Type_Data.unshift(this.Course_Type_Temp);
            this.Course_Type = this.Course_Type_Data[0]
            this.Course_Type_Search = this.Course_Type_Data[0]

            this.Fees_Type_Data = Rows[1];
            this.Fees_Type_Temp.Fees_Type_Id = 0;
            this.Fees_Type_Temp.Fees_Type_Name = "Select";
            this.Fees_Type_Data.unshift(this.Fees_Type_Temp);
            this.Fees_Type = this.Fees_Type_Data[0]

            this.Part_Data = Rows[2];
            this.Part_Temp.Part_Id = 0;
            this.Part_Temp.Part_Name = "Select";
            this.Part_Data.unshift(this.Part_Temp);
            this.Part = this.Part_Data[0]

            this.Online_Exam_Status_Data = Rows[3];
            this.Online_Exam_Status_Temp.Online_Exam_Status_Id = 0;
            this.Online_Exam_Status_Temp.Online_Exam_Status_Name = "Select";
            this.Online_Exam_Status_Data.unshift(this.Online_Exam_Status_Temp);
            this.Online_Exam_Status = this.Online_Exam_Status_Data[0]


            this.Period_Type_Data = Rows[4];
            this.Period_Type_Temp.Period_Id = 0;
            this.Period_Type_Temp.Period_Name = "Select";
            this.Period_Type_Data.unshift(this.Period_Type_Temp);
            this.Period_Type = this.Period_Type_Data[0]
    }

        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}


Load_Fees_Type()
{
    this.issLoading = true;
    this.Course_Service_.Load_Fees_Type().subscribe(Rows => {
        if (Rows != null) {
            this.Fees_Type_Data = Rows[0];
            this.Fees_Type_Temp.Fees_Type_Id = 0;
            this.Fees_Type_Temp.Fees_Type_Name = "Select";
            this.Fees_Type_Data.unshift(this.Fees_Type_Temp);
            this.Fees_Type = this.Fees_Type_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}


Create_New()
{
    this.Entry_View = true;
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data=[];
    this.Course_Subject_Data=[]
    this.Course_.Agent_Amount = null;
    this.Course_.Total_Fees= null;
    this.Course_.Noof_Installment= null;
    
}
Close_Click()
{
    
 
        let top = document.getElementById('Topdiv');
        if (top !== null) {
        top.scrollIntoView();
        top = null;
        }
    this.Search_Course();
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = []
    this.Entry_View = false;
}


Clr_Course()
{
    this.Course_.Course_Id=0;
    this.Course_.Course_Name="";
    this.Course_.User_Id = 0;
    this.Course_.Course_Type_Name = '';
    this.Course_.Duration='';
    this.Course_.Agent_Amount= 0;
    this.Course_.User_Id = 0;
    this.Course_.Total_Fees=0;
    this.Course_.Total_Fees= null;
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = []
    if (this.Course_Type_Data != undefined && this.Course_Type_Data != null)
        this.Course_Type = this.Course_Type_Data[0];

}
Search_Course()
{
   var Course_Type_Id=0
    if (this.Course_Type_Search != undefined && this.Course_Type_Search != null)
        if (this.Course_Type_Search.Course_Type_Id != undefined && this.Course_Type_Search.Course_Type_Id != null)
            Course_Type_Id = this.Course_Type_Search.Course_Type_Id;

    this.issLoading=true;
    this.Course_Service_.Search_Course(this.Course_Name_Search, Course_Type_Id).subscribe(Rows => {
    this.Course_Data=Rows[0];
    this.Total_Entries=this.Course_Data.length;
    if(this.Course_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    this.issLoading=false;
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_Course(Course_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Course_Service_.Delete_Course(Course_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Course_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Can not be deleted because its already Used',Type:"2"}});
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
Search_Subject_Typeahead(event: any) 
{
    
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value.toLowerCase();
    if (this.Subject_Data == undefined || this.Subject_Data.length == 0)
    {
        this.issLoading = true;
        this.Course_Service_.Search_Subject_Typeahead(Value).subscribe(Rows => {
        if (Rows != null) {
        
            this.Subject_Data = Rows[0];
            this.Subject_Data_Filter=[];
            for (var i=0;i<this.Subject_Data.length;i++)
            {
                if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                    this.Subject_Data_Filter.push(this.Subject_Data[i])
            }

        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
        });
    }
    else
    {
        this.Subject_Data_Filter=[];
        for (var i=0;i<this.Subject_Data.length;i++)
        {
            if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                this.Subject_Data_Filter.push(this.Subject_Data[i])
        }
    }
}
display_Subject(Subject_e: Subject) 
{    
    if (Subject_e) { return Subject_e.Subject_Name; }
}

Clr_Course_Fees()
 {
this.Course_Fees.Course_Fees_Id=0;
this.Course_Fees.Course_Id=0;
this.Course_Fees.Amount=0;
this.Course_Fees.Tax=0;
this.Course_Fees.No_Of_Instalment="";
this.Course_Fees.Instalment_Period="";

if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    this.Fees_Type = this.Fees_Type_Data[0];

    if (this.Period_Type_Data != undefined && this.Period_Type_Data != null)
    this.Period_Type = this.Period_Type_Data[0];

}



Delete_Course_Fees(Course_Fees:Course_Fees,index)
{
    this.Course_Fees_Data.splice(index, 1);
 this.Clr_Course_Fees();
}
Plus_Course_Fees(event)
{
    
    if (this.Fees_Type.Fees_Type_Id == undefined || this.Fees_Type.Fees_Type_Id == null || this.Fees_Type.Fees_Type_Id == 0 || this.Fees_Type==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Fees ',Type:"3"}});
        return
    }
    else if (this.Course_Fees.Amount == undefined || this.Course_Fees.Amount == null || this.Course_Fees.Amount==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Amount',Type:"3"}});
        return
    } 
    else if (this.Course_Fees.Tax == undefined || this.Course_Fees.Tax == null)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Tax',Type:"3"}});
        return
    } 
    else if (this.Period_Type.Period_Id == undefined || this.Period_Type.Period_Id  == null || this.Period_Type.Period_Id  == 0 || this.Period_Type==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Period',Type:"3"}});
        return
    } 
    // else if (this.Course_Fees.No_Of_Instalment == undefined || this.Course_Fees.No_Of_Instalment == null || this.Course_Fees.No_Of_Instalment=="" )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the No Of Instalment',Type:"3"}});
    //     return
    // } 
  
    else if (this.Course_Fees.Instalment_Period == undefined || this.Course_Fees.Instalment_Period == null  )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Instalment Period',Type:"3"}});
        return
    } 
//debugger
    if (this.Course_Fees.Instalment_Period == undefined || this.Course_Fees.Instalment_Period == null ||  this.Course_Fees.Instalment_Period == "")
    {this.Course_Fees.Instalment_Period ="0"}

    if (this.Course_Fees_Data == undefined)
        this.Course_Fees_Data = [];
    this.Course_Fees.Fees_Type_Id = this.Fees_Type.Fees_Type_Id
    this.Course_Fees.Fees_Type_Name = this.Fees_Type.Fees_Type_Name
debugger
    this.Course_Fees.Period_Id = this.Period_Type.Period_Id
    this.Course_Fees.Period_Name = this.Period_Type.Period_Name
    // this.Course_Fees.Period_From = this.Period_Type.Period_From
    // this.Course_Fees.Period_To = this.Period_Type.Period_To


    this.Course_Fees.Period_From = this.New_Date(
        new Date(
        moment(this.Period_Type.Period_From).format(
        "YYYY-MM-DD"
        )
        )
        );

        this.Course_Fees.Period_To = this.New_Date(
            new Date(
            moment(this.Period_Type.Period_To).format(
            "YYYY-MM-DD"
            )
            )
            );

    if (this.Course_Fees_Index >= 0) {
        this.Course_Fees_Data[this.Course_Fees_Index] = Object.assign({}, this.Course_Fees)// this.Sales_Details_;
        }
        else {
        this.Course_Fees_Data.push(Object.assign({}, this.Course_Fees));
        }
    this.Course_Fees_Index=-1;
    this.Clr_Course_Fees();
}

New_Date(Date_) {
    this.date = Date_;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10) {
    this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10) {
    this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    //  this.date = this.day + "-"+ this.month + "-" + this.year ;
    return this.date;
    }

Clr_Course_Subject()
{
this.Course_Subject.Course_Subject_Id=0;
this.Course_Subject.Course_Id=0;
// this.Course_Subject.Part_Id=0;
// this.Course_Subject.Subject_Id=0;
// this.Course_Subject.Subject_Name="";
this.Course_Subject.Minimum_Mark="";
this.Course_Subject.Maximum_Mark="";
// this.Course_Subject.Online_Exam_Status="";
this.Course_Subject.No_of_Question="";
this.Course_Subject.Exam_Duration="";

    if (this.Part_Data != undefined && this.Part_Data != null)
        this.Part = this.Part_Data[0];

    this.Subject = null;

    if (this.Online_Exam_Status_Data != undefined && this.Online_Exam_Status_Data != null)
        this.Online_Exam_Status = this.Online_Exam_Status_Data[0];
}
Delete_Course_Subject(Course_Subject:Course_Subject,index)
{
    this.Course_Subject_Data.splice(index, 1);
    this.Clr_Course_Subject();
}
Plus_Course_Subject(event)
{
    // if (this.Part.Part_Id == undefined || this.Part.Part_Id == null || this.Part.Part_Id == 0 || this.Part==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
    //     return
    // }
    // else
     if (this.Subject == null || this.Subject == undefined ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Syllabus ', Type: "3" } });
        return
    }
    else if (this.Course_Subject.Minimum_Mark == undefined || this.Course_Subject.Minimum_Mark == null || this.Course_Subject.Minimum_Mark=="" )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Percentage',Type:"3"}});
        return
    }
    // else if (this.Course_Subject.Maximum_Mark == undefined || this.Course_Subject.Maximum_Mark == null || this.Course_Subject.Maximum_Mark == "")
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Maximum Mark',Type:"3"}});
    //     return
    // }
    // else if (this.Online_Exam_Status.Online_Exam_Status_Id == undefined || this.Online_Exam_Status.Online_Exam_Status_Id == null || this.Online_Exam_Status.Online_Exam_Status_Id == 0 || this.Online_Exam_Status == null) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status ', Type: "3" } });
    //     return
    // }
    // else if (this.Course_Subject.No_of_Question == undefined || this.Course_Subject.No_of_Question == null || this.Course_Subject.No_of_Question == "") {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the No Of Question', Type: "3" } });
    //     return
    // }
    // else if (this.Course_Subject.Exam_Duration == undefined || this.Course_Subject.Exam_Duration == null || this.Course_Subject.Exam_Duration == "") {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Exam Duration', Type: "3" } });
    //     return
    // }

    if (this.Course_Subject_Data == undefined)
        this.Course_Subject_Data = [];
    this.Course_Subject.Part_Id = 1
    // this.Course_Subject.Part_Name = this.Part.Part_Name
    if(this.Subject.Subject_Id==undefined||this.Subject.Subject_Id==null)
    {
        this.Course_Subject.Subject_Id=0
        this.Course_Subject.Subject_Name=String(this.Subject);
    }
    else
    {
        this.Course_Subject.Subject_Id = this.Subject.Subject_Id
        this.Course_Subject.Subject_Name = this.Subject.Subject_Name
    }
    this.Course_Subject.Online_Exam_Status = 1
    // this.Course_Subject.Online_Exam_Status_Name = this.Online_Exam_Status.Online_Exam_Status_Name

    if (this.Course_Subject_Index >= 0) {
        this.Course_Subject_Data[this.Course_Subject_Index] = Object.assign({}, this.Course_Subject)// this.Sales_Details_;
        }
        else {
        this.Course_Subject_Data.push(Object.assign({}, this.Course_Subject));
        }
    this.Course_Subject_Index=-1;
    this.Clr_Course_Subject();
}



Save_Course()
{
    if(this.Course_.Course_Name===undefined || this.Course_.Course_Name==null || this.Course_.Course_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Name ',Type: "3" }});
    return  
    }
    // else if (this.Course_Type.Course_Type_Id == undefined || this.Course_Type.Course_Type_Id == null || this.Course_Type.Course_Type_Id == 0 || this.Course_Type==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course Type ',Type:"3"}});
    //     return
    // }
    // else if (this.Course_.Agent_Amount === undefined || this.Course_.Agent_Amount == null || this.Course_.Agent_Amount==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter One Time  Amount ',Type: "3" }});
    // return  
    // }
    // else if (this.Course_.Total_Fees === undefined || this.Course_.Total_Fees == null || this.Course_.Total_Fees==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Installment Amount ',Type: "3" }});
    // return  
    // }

    // if (this.Fees_Type == undefined || this.Fees_Type == null || this.Fees_Type.Fees_Type_Id == undefined || this.Fees_Type.Fees_Type_Id==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Fees_Type', Type: "3" } });
    //     return;
    // }
   else if (this.Course_Fees_Data.length === undefined || this.Course_Fees_Data.length == null || this.Course_Fees_Data.length == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Fees ', Type: "3" } });
        return
    }
    // else if (this.Course_Subject_Data.length === undefined || this.Course_Subject_Data.length == null || this.Course_Subject_Data.length == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Syllabus ', Type: "3" } });
    //     return
    // }
   
    var  Is_Check_Value=0
    if (this.Is_Check == true)
    
        Is_Check_Value=1;
    
    else
        Is_Check_Value=0 ;
    
  
    this.issLoading=true;
    this.Course_.User_Id = this.Login_User_Id;
    this.Course_.Course_Type_Id = 1;
    this.Course_.Course_Type_Name = '';
    this.Course_.Fees_Type_Id = this.Fees_Type.Fees_Type_Id;
     this.Course_.Course_Fees = this.Course_Fees_Data;
     debugger

     if(this.Course_Subject_Data.length>0){
    this.Course_.Course_Subject = this.Course_Subject_Data;
}
    this.Course_.Is_Check=Is_Check_Value;
    // this.Course_.Study_Materials = this.Study_Materials_Data;
    this.Course_Service_.Save_Course(this.Course_).subscribe(Save_status => {
        debugger
    // Save_status=Save_status[0];
    if(Number(Save_status[0].Course_Id_)>0)
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
Edit_Course(Course_e:Course,index)
{
    this.Entry_View=true;
    this.Course_=Course_e;
    this.Course_=Object.assign({},Course_e);

    for (var i = 0; i < this.Course_Type_Data.length; i++) {
        if (this.Course_Type_Data[i].Course_Type_Id == this.Course_.Course_Type_Id) {
            this.Course_Type = this.Course_Type_Data[i];
        }
    }
    for (var i = 0; i < this.Fees_Type_Data.length; i++) {
        if (this.Fees_Type_Data[i].Fees_Type_Id == this.Course_.Fees_Type_Id) {
            this.Fees_Type = this.Fees_Type_Data[i];
        }
    }

    



    this.issLoading = true;
    this.Course_Service_.Get_Course(this.Course_.Course_Id).subscribe(Rows => {
        
         this.Course_Fees_Data = Rows[0]
        this.Course_Subject_Data = Rows[1]
        this.issLoading = false;

    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });

        
    


}

Edit_Course_Fees(Course_Fees_e:Course_Fees,index)
{   
    this.Course_Fees_Index=index;
    this.Course_Fees = Object.assign({}, Course_Fees_e); 

    // if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    //     this.Fees_Type = this.Fees_Type_Data[0];

    for (var i = 0; i < this.Fees_Type_Data.length; i++) {
        if (this.Fees_Type_Data[i].Fees_Type_Id == this.Course_Fees.Fees_Type_Id) {
            this.Fees_Type = this.Fees_Type_Data[i];
        }       
    }

    for (var i = 0; i < this.Period_Type_Data.length; i++) {
        if (this.Period_Type_Data[i].Period_Id == this.Course_Fees.Period_Id) {
            this.Period_Type = this.Period_Type_Data[i];
        }
    }


    // this.Course_Fees.Period_From = this.New_Date(
    //     new Date(
    //     moment(this.Period_Type.Period_From).format(
    //     "YYYY-MM-DD"
    //     )
    //     )
    //     );

    //     this.Course_Fees.Period_To = this.New_Date(
    //         new Date(
    //         moment(this.Period_Type.Period_To).format(
    //         "YYYY-MM-DD"
    //         )
    //         )
    //         );


}

Edit_Course_Subject(Course_Subject_e:Course_Subject,index)
{   
   
        this.Course_Subject_Index=index;
    this.Course_Subject = Object.assign({}, Course_Subject_e); 

    this.Subject_Temp.Subject_Id = this.Course_Subject.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Course_Subject.Subject_Name;
    this.Subject = Object.assign({}, this.Subject_Temp);


    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Course_Subject.Part_Id)
        {
            this.Part = this.Part_Data[i];
        }
    }
     for (var i = 0; i < this.Online_Exam_Status_Data.length;i++)
    {
         if (this.Online_Exam_Status_Data[i].Online_Exam_Status_Id == this.Course_Subject.Online_Exam_Status)
        {
            this.Online_Exam_Status = this.Online_Exam_Status_Data[i];
        }
    }
}

Edit_Study_Materials(Study_Materials_e:Study_Materials,index)
{   
   
        this.Study_Materials_Index=index;
    this.Study_Materials = Object.assign({}, Study_Materials_e);

    this.Subject_Temp.Subject_Id = this.Study_Materials.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Study_Materials.Subject_Name;
    this.Subject_Materials = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Study_Materials.Part_Id)
        {
            this.Part_Material = this.Part_Data[i];
        }
    }
}


//  Clr_Study_Materials()
//  {
// this.Study_Materials.Study_Materials_Id=0;
// this.Study_Materials.Course_Id=0;
// // this.Study_Materials.Part_Id=0;
// // this.Study_Materials.Subject_Id=0;
// this.Study_Materials.Course_Subject_Id=0;
// this.Study_Materials.Study_Materials_Name="";
// this.Study_Materials.File_Name="";


//      if (this.Part_Data != undefined && this.Part_Data != null)
//          this.Part_Material = this.Part_Data[0];

//      this.Subject_Materials = null;

// }
// Delete_Study_Materials(Study_Materials:Study_Materials,index)
// {
//     this.Study_Materials_Data.splice(index, 1);
//     this.Clr_Study_Materials();
// }
// Plus_Study_Materials(event)
// {
//     if (this.Part_Material.Part_Id == undefined || this.Part_Material.Part_Id == null || this.Part_Material.Part_Id == 0 || this.Part_Material==null )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
//         return
//     }
//     else if (this.Subject_Materials == null || this.Subject_Materials == undefined || this.Subject_Materials.Subject_Id == 0 || this.Subject_Materials.Subject_Id == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Subject ', Type: "3" } });
//         return
//     }
//     else if (this.Study_Materials.Study_Materials_Name == undefined || this.Study_Materials.Study_Materials_Name == null || this.Study_Materials.Study_Materials_Name=="" )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Study Materials',Type:"3"}});
//         return
//     }

//     if (this.Study_Materials_Data == undefined)
//         this.Study_Materials_Data = [];
//     this.Study_Materials.Part_Id = this.Part_Material.Part_Id
//     this.Study_Materials.Subject_Id = this.Subject_Materials.Subject_Id

//     if (this.Study_Materials_Index >= 0) {
//         this.Study_Materials_Data[this.Study_Materials_Index] = Object.assign({}, this.Study_Materials)// this.Sales_Details_;
//         }
//         else {
//         this.Study_Materials_Data.push(Object.assign({}, this.Study_Materials));
//         }
//     this.Study_Materials_Index=-1;
//     this.Clr_Study_Materials();
// }
}

