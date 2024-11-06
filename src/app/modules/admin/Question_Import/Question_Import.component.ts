import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question_ImportService } from '../../../services/Question_Import.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Question } from '../../../models/Question';
import { Question_Import_Master } from '../../../models/Question_Import_Master';
import { Course } from '../../../models/Course';
import { Part } from '../../../models/Part';
import { Subject } from '../../../models/Subject';
import { Course_Service } from '../../../services/Course.service';
import * as XLSX from 'ts-xlsx';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
// import * as XLSX from 'ts-xlsx';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
dateInput: 'DD/MM/YYYY',
},
display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY',  dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',},
};
@Component({
selector: 'app- Question_Import',
templateUrl: './Question_Import.component.html',
styleUrls: ['./Question_Import.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Question_ImportComponent implements OnInit {
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Question_Import_Master_Edit:boolean;
Question_Import_Master_Save:boolean;
Question_Import_Master_Delete:boolean;
year: any;
month: any;
day: any;
date: any;

Course_Data_Search:Course=new Course();
Course_Data_Search_Temp:Course=new Course();
Course_Data_Search1:Course=new Course();
course_Data:Course[];

FromDate_: Date = new Date();
ToDate_: Date = new Date();

Part_Data_Search:Part=new Part();
Part_Data_Search_Temp:Part=new Part();
Part_Data:Part[];
Part_Data1_Search:Part=new Part();
Part_Data1_:Part[];
Part_Data_Check:Part[];

Subject_Data_Search:Subject=new Subject();
Subject_Data_Search_Temp:Subject=new Subject();
Subject_Data_Search_1:Subject=new Subject();
Subject_Data:Subject[];
Subject_Data_:Subject[];
Subject_Data_Check:Subject[];


myInnerHeight: number;
arrayBuffer:any;
Display_File_Name_:string;
file:File;
Login_Id:string;

Question_Import_Master_Data:Question_Import_Master[]
Question_Import_Master_:Question_Import_Master= new Question_Import_Master();
Question_Name_Search:string;

Question_Data:Question[]
Question_:Question= new Question();
constructor(public Question_Import_Service_:Question_ImportService, public Course_Service_:Course_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Permissions = Get_Page_Permission(22);
    this.Login_Id=localStorage.getItem('Login_User');
if(this.Permissions==undefined || this.Permissions==null)
{
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
}
else
{
    this.Question_Import_Master_Edit=this.Permissions.Edit;
    this.Question_Import_Master_Save=this.Permissions.Save;
    this.Question_Import_Master_Delete=this.Permissions.Delete;
    this.Page_Load()
}
}
Page_Load()
{
    
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Clr_Question_Import_Master();
    this.Question_Data=[];
    // this.Search_Question_Import_Master();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Question_Import_Master();
    this.Question_Data=[];
}
Close_Click()
{
    this.Entry_View = false;
    this.Clr_Question_Import_Master();
    this.Question_Data=[];
}
trackByFn(index, item) 
{
    return index;
}
Search_Course_Typeahead(event: any)
{   
    var Value = "";
    if(this.course_Data==undefined)
    this.course_Data=[];
    if(this.course_Data.length==0 )
    {
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;

    if(this.course_Data==undefined || this.course_Data.length==0)
    {
    this.issLoading = true;
    this.Question_Import_Service_.Search_Course_Typeahead('').subscribe(Rows => {

    if (Rows != null) {
    this.course_Data = Rows[0];
    this.issLoading = false;
    }
    },
    Rows => {
    this.issLoading = false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    } 
}
display_Course(Course_: Course) 
{
    if (Course_) { return Course_.Course_Name; }
}
Search_Course_Part_Typeahead(event: any)
    {   
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;

    if(this.Course_Data_Search==null||this.Course_Data_Search.Course_Id==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Course',Type:"3"}});
    }
    else{
    if(this.Part_Data==undefined || this.Part_Data.length==0)
    {
    if(this.Part_Data_Check==undefined ||this.Part_Data_Check.length==0)
    {
    this.issLoading = true;
    this.Question_Import_Service_.Search_Course_Part_Typeahead(this.Course_Data_Search.Course_Id,'').subscribe(Rows => {
    if (Rows != null) {
    // if(Rows.code!=undefined)
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.Code,Type:"false"}});
    // }
    this.Part_Data = Rows[0];
    this.Part_Data_Check = Rows[0];
    this.issLoading = false;
    }
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    else
    {
    this.Part_Data=  this.Part_Data_Check;
    }
    }
    }  
}
display_Part(Part_: Part) {
    if (Part_) { 
    return Part_.Part_Name; }
}
Search_Part_Subject_Typeahead(event: any)
{ 
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;

    if(this.Part_Data_Search==null||this.Part_Data_Search.Part_Id==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class', data:{Message:'Select Part',Type:"3"}});

    }
    else
    {    
    if(this.Subject_Data==undefined || this.Subject_Data.length==0)
    {
    this.issLoading = true;
    this.Question_Import_Service_.Search_Part_Subject_Typeahead(this.Course_Data_Search.Course_Id,this.Part_Data_Search.Part_Id,'').subscribe(Rows => {


    if (Rows != null) {
    this.Subject_Data = Rows[0];
    this.issLoading = false;
    }

    },
    Rows => {
    this.issLoading = false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    }    
}
display_Subject(Subject_: Subject)
{
if (Subject_) { return Subject_.Subject_Name; }
}
Course_Change()
{ 
    this.Part_Data_Search=null;
    this.Subject_Data_Search=null;
    this.Part_Data=[];
    this.Part_Data_Check=[];
    this.Subject_Data=[];
}
Part_Change()
{    
    this.Subject_Data_Search=null;
    this.Subject_Data=[];
}
Search_Subject_Typeahead(event: any) 
{
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;
    if (this.Subject_Data_ == undefined || this.Subject_Data_.length == 0)
    {
    this.issLoading = true;
    this.Course_Service_.Search_Subject_Typeahead(Value).subscribe(Rows => {
    if (Rows != null) {

    this.Subject_Data_ = Rows[0];

    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    });
    }
}
Search_Part_Typeahead(event: any) 
{
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;
    if (this.Part_Data1_ == undefined || this.Part_Data1_.length == 0)
    {
    this.issLoading = true;
    this.Course_Service_.Search_Part_Typeahead(Value).subscribe(Rows => {
    if (Rows != null) {

    this.Part_Data1_ = Rows[0];

    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    });
    }
}
display_Subject_1(Subject_e: Subject) {

if (Subject_e) { return Subject_e.Subject_Name; }
}
display_part_1(Part_e: Part) {

if (Part_e) { return Part_e.Part_Name; }
}
incomingfile(event) {

this.file=event.target.files[0];

this.Display_File_Name_ = this.file.name;

this.Upload();
}
Upload() 
{
    let fileReader = new FileReader();
    fileReader.onload = (e) => {

    this.arrayBuffer = fileReader.result;
    var data = new Uint8Array(this.arrayBuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, {type:"binary"});
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    this.Question_Data=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    this.Question_Data.sort();
    
}
fileReader.readAsArrayBuffer(this.file);
}

Clr_Question_Import_Master()
{
    this.Question_Import_Master_.Question_Import_Master_Id=0;
    this.Question_Import_Master_.User_Id=0;
    this.Question_Import_Master_.Date=new Date;
    this.Question_Import_Master_.Date=this.New_Date(this.Question_Import_Master_.Date)
    this.Course_Data_Search=null;
    this.Part_Data_Search=null;
    this.Subject_Data_Search=null;
}
New_Date(Date_)
{
    this.date=Date_
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
    return this.date;
}
Search_Question_Import_Master()
{
    this.issLoading=true;
    this.Question_Import_Service_.Search_Question_Import_Master(moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),this.Course_Data_Search1.Course_Id,this.Subject_Data_Search_1.Subject_Id,this.Part_Data1_Search.Part_Id).subscribe(Rows => {

    this.Question_Import_Master_Data=Rows[0];

    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_Question_Import_Master(Question_Import_Master_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Question_Import_Service_.Delete_Question_Import_Master(Question_Import_Master_Id).subscribe(Delete_status => {
    Delete_status = Delete_status[0];
    if(Delete_status[0].Question_Import_Master_Id_>0){
    this.Question_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
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
Save_Question_Import_Master()
{
    if(this.Course_Data_Search==null || this.Course_Data_Search.Course_Id==undefined|| this.Course_Data_Search.Course_Id==null)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'select Course',Type:"3"}});
    }
    if(this.Part_Data_Search==null || this.Part_Data_Search.Part_Id==undefined|| this.Part_Data_Search.Part_Id==null)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'select Part',Type:"3"}});
    }
    if(this.Subject_Data_Search==null || this.Subject_Data_Search.Subject_Id==undefined|| this.Subject_Data_Search.Subject_Id==null)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'select Subject',Type:"3"}});
    }
    if(this.Question_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    
    return 
    }
    var j=0;
    for(var i=0; i<this.Question_Data.length;i++)
    {  j=i+1

    if (undefined == this.Question_Data[i].Question_Name)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Question Name is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    if ("" == this.Question_Data[i].Question_Name.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Question Name is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (undefined == this.Question_Data[i].Option_1)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (""== this.Question_Data[i].Option_1.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (undefined == this.Question_Data[i].Option_2)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (""== this.Question_Data[i].Option_2.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (undefined == this.Question_Data[i].Option_3)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (""== this.Question_Data[i].Option_3.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (undefined == this.Question_Data[i].Option_4)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 1 is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (""== this.Question_Data[i].Option_4.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Option 4 is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (undefined == this.Question_Data[i].Correct_Answer)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Correct Answer is blank at row ' + j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
    }
    else if (""== this.Question_Data[i].Correct_Answer.trim())
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Correct Answer is blank at row ' +j ,Type: "3" }});    
    i= this.Question_Data.length
    return;
}


// else if (this.Student_Import_Details_Data[i].Visa_Submission_Date=='MM-DD-YYYY')
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Incorrect Date format' +j ,Type: "3" }});    
//     i= this.Student_Import_Details_Data.length
//     return;
// }
}
// this.Question_.Course_Id=this.Subject_.
    this.Question_Import_Master_.Course_Id=this.Course_Data_Search.Course_Id;
    this.Question_Import_Master_.Course_Name=this.Course_Data_Search.Course_Name;
    this.Question_Import_Master_.Semester_Id=this.Part_Data_Search.Part_Id;
    this.Question_Import_Master_.Semester_Name=this.Part_Data_Search.Part_Name;
    this.Question_Import_Master_.Subject_Id=this.Subject_Data_Search.Subject_Id;
    this.Question_Import_Master_.User_Id=Number(this.Login_Id);
    this.Question_Import_Master_.Subject_Name=this.Subject_Data_Search.Subject_Name;
    this.Question_Import_Master_.Question=this.Question_Data;
    this.issLoading=true;
    this.Question_Import_Service_.Save_Question_Import_Master(this.Question_Import_Master_).subscribe(Save_status => {
        this.issLoading=false;
    Save_status=Save_status[0];
    if(Number(Save_status[0].Question_Import_Master_Id_)>0)
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
Edit_Question_Import_Master(Question_Import_Master_e:Question_Import_Master,index)
{
    this.Entry_View=true;
    this.Question_Import_Master_=Question_Import_Master_e;
    this.Question_Import_Master_=Object.assign({},Question_Import_Master_e);

    this.Course_Data_Search_Temp.Course_Id=this.Question_Import_Master_.Course_Id;
    this.Course_Data_Search_Temp.Course_Name=this.Question_Import_Master_.Course_Name;
    this.Course_Data_Search=Object.assign({},this.Course_Data_Search_Temp)
    
    this.Subject_Data_Search_Temp.Subject_Id=this.Question_Import_Master_.Subject_Id;
    this.Subject_Data_Search_Temp.Subject_Name=this.Question_Import_Master_.Subject_Name;
    this.Subject_Data_Search=Object.assign({},this.Subject_Data_Search_Temp)
    
    this.Part_Data_Search_Temp.Part_Id=this.Question_Import_Master_.Semester_Id;
    this.Part_Data_Search_Temp.Part_Name=this.Question_Import_Master_.Semester_Name;
    this.Part_Data_Search=Object.assign({},this.Part_Data_Search_Temp)
    
    this.Question_Import_Service_.Get_Question_Import(this.Question_Import_Master_.Question_Import_Master_Id).subscribe(Rows => {
        
        this.Question_Data = Rows[0];
        // if(this.Question_Data.length=0){
        // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "false"}});
        // }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });

}
Delete_Question_Import(Question_Id,index)
{
    this.Question_Data.splice(index, 1);
}
}

