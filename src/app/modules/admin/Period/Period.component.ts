import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Period_Service } from '../../../services/Period.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Period } from '../../../models/Period';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Course } from 'app/models/Course';
import { Agent } from 'app/models/Agent';
import { Users } from 'app/models/Users';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-Period',
    templateUrl: './Period.component.html',
    styleUrls: ['./Period.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
 
})
export class PeriodComponent implements OnInit {
    Period_Data:Period[]
    Period_:Period= new Period();
    Period_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Period_Edit:boolean;
    Period_Save:boolean;
    Period_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;

    year: any;
    month: any;
    Period_From:Date;
    Period_To:Date;
    day: any;
    date: any;
    Login_User:string="0";



   Course_:Course=new Course;
   Course_Temp:Course=new Course;
   Course_Data:Course[];

   Branch_:Agent=new Agent;
   Branch_Temp:Agent=new Agent;
   Branch_Data:Agent[];

    Trainers_:Users=new Users;
    Trainers_Temp:Users=new Users;
    Trainers_Data:Users[];




array:any;
constructor(public Period_Service_:Period_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    debugger
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(32);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Period_Edit=this.Permissions.Edit;
    // this.Period_Save=this.Permissions.Save;
    // this.Period_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    debugger
    this.Get_Menu_Status(89,this.Login_User);
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
   this.Clr_Period();
    // this.Load_PeriodPage_Dropdowns()
    this.Search_Period();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 250;
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Period_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==89)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==89)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Period_Edit= this.array.Edit;
                this.Period_Save= this.array.Save;
                this.Period_Delete= this.array.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Period();
    this.Period_.Period_From = new Date();
    this.Period_.Period_From = this.New_Date(this.Period_.Period_From);  
    this.Period_.Period_To = new Date();
    this.Period_.Period_To = this.New_Date(this.Period_.Period_To);  
}
Close_Click()
{
    this.Search_Period();
    this.Clr_Period();
    this.Entry_View = false;
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
trackByFn(index, item) 
{
return index;
}

Clr_Period()
{
    this.Period_.Period_Id=0;
    this.Period_.Period_Name="";
    this.Period_.Duration="";
    
    this.Period_.Period_From = new Date();
    this.Period_.Period_From = this.New_Date(this.Period_.Period_From);  
    this.Period_.Period_To = new Date();
    this.Period_.Period_To = this.New_Date(this.Period_.Period_To); 
  

    if(this.Course_Data!=null && this.Course_Data != undefined)
    this.Course_=this.Course_Data[0];
    if(this.Trainers_Data!=null && this.Trainers_Data != undefined)
    this.Trainers_=this.Trainers_Data[0];
    if(this.Branch_Data!=null && this.Branch_Data != undefined)
    this.Branch_=this.Branch_Data[0];
   
}
Search_Period()
{
    debugger
    this.issLoading=true;
    this.Period_Service_.Search_Period(this.Period_Name_Search).subscribe(Rows => {
        debugger
    this.Period_Data=Rows[0];
    this.Total_Entries=this.Period_Data.length;
    if(this.Period_Data.length==0)
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



Delete_Period(Period_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        //this.issLoading=true;
        this.Period_Service_.Delete_Period(Period_Id).subscribe(Delete_Period => {
        
        Delete_Period = Delete_Period[0];
        Delete_Period = Delete_Period[0].DeleteStatus_.data[0];
        if(Delete_Period==1){
        this.Period_Data.splice(index, 1);
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
Save_Period()
{
    if(this.Period_.Period_Name===undefined || this.Period_.Period_Name==null || this.Period_.Period_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Period ',Type: "3" }});
    return  
    }

  
    
    if(this.Period_.Period_From==undefined || this.Period_.Period_From==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Period from ',Type: "3" }});
    return  
    }
    if(this.Period_.Period_To==undefined || this.Period_.Period_To==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Period To ',Type: "3" }});
    return  
    }
    if(this.Period_.Duration===undefined || this.Period_.Duration==null || this.Period_.Duration=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Period ',Type: "3" }});
    return  
    }

  
  

    
    debugger
   

    this.issLoading=true;
   
  


    this.Period_.Period_From = this.New_Date(new Date(moment(this.Period_.Period_From).format('YYYY-MM-DD')));
    this.Period_.Period_To = this.New_Date(new Date(moment(this.Period_.Period_To).format('YYYY-MM-DD')));
    this.Period_Service_.Save_Period(this.Period_).subscribe(Save_Period => {
        
        debugger
    Save_Period=Save_Period[0];
    if(Number(Save_Period[0].Period_Id_)>0)
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
Edit_Period(Period_e:Period,index)
{
    
    this.Entry_View=true;
    this.Period_=Period_e;
    if(this.Period_.Period_Name==null || this.Period_.Period_Name==undefined)
    {
        this.Period_.Period_From=new Date();
        this.Period_.Period_From=this.New_Date(this.Period_.Period_From);
    }
    else
    this.Period_.Period_From = this.New_Date(new Date(moment(this.Period_.Period_From).format('YYYY-MM-DD')));


        if(this.Period_.Period_Name==null || this.Period_.Period_Name==undefined)
        {
            this.Period_.Period_To=new Date();
            this.Period_.Period_To=this.New_Date(this.Period_.Period_To);
        }
        
        else
        this.Period_.Period_To = this.New_Date(new Date(moment(this.Period_.Period_To).format('YYYY-MM-DD')));

    this.Period_=Object.assign({},Period_e);

 



}


// Load_PeriodPage_Dropdowns()
// {
    
//     this.issLoading = true;
//     this.Period_Service_.Load_PeriodPage_Dropdowns().subscribe(Rows => {
//     if (Rows != null) {
//         debugger
//         this.Course_Data = Rows[0];
//         this.Course_Temp.Course_Id = 0;
//         this.Course_Temp.Course_Name = "All";
//         this.Course_Data.unshift(this.Course_Temp);
//         this.Course_ = this.Course_Data[0];

//         this.Branch_Data = Rows[1];
//         this.Branch_Temp.Agent_Id = 0;
//         this.Branch_Temp.Agent_Name = "All";
//         this.Branch_Data.unshift(this.Branch_Temp);
//         this.Branch_ = this.Branch_Data[0];

//         this.Trainers_Data = Rows[2];
//         this.Trainers_Temp.Users_Id = 0;
//         this.Trainers_Temp.Users_Name = "All";
//         this.Trainers_Data.unshift(this.Trainers_Temp);
//         this.Trainers_ = this.Trainers_Data[0];

      

//         this.issLoading = false;
//     }
// },
//     Rows => {
//         this.issLoading = false;
//     });
// }
}

