import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent_Service } from '../../../services/Agent.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Agent } from '../../../models/Agent';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Status } from '../../../models/Status';
import { Mode } from '../../../models/Mode';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import { Category } from '../../../models/Category';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
export const MY_FORMATS = {
parse: {
dateInput: 'DD/MM/YYYY',
},
display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};
const moment = _rollupMoment || _moment;

@Component({
selector: 'app-Agent',
templateUrl: './Agent.component.html',
styleUrls: ['./Agent.component.css']
})
export class AgentComponent implements OnInit 
{
    Agent_Data:Agent[]
    Agent_:Agent= new Agent();
    Agent_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Agent_Edit:boolean;
    Agent_Save:boolean;
    Agent_Delete:boolean;
    myInnerHeight: number;
    Approval_Status: Status = new Status();
    Category_Id: Category = new Category();
    Photo: Agent = new Agent();
    Agent_Id_Edit:number;

    Status_Data: Status[]
    Status_Temp:Status= new Status();

    // Category_Data: Category[]
    Category_Temp:Category= new Category();

    Category_Data:Category[]
    Category_Type_:Category= new Category();
    Category_Type_Temp:Category= new Category();

    Registration_Visiblility:boolean=true;
    Remove_Registration_Visibility:boolean=true;

    Registration_Permissions: any;
    Remove_Registration_Permissions: any;

    Login_User:string="0";
    tab_view:boolean=true;

    profile_View:boolean=true;
    Receipt_View:boolean=false;
    Receipt_Click_Status:boolean
    year: any;
    month: any;
    day: any;
    date: any;
    Search_FromDate:Date=new Date();

    Search_ToDate:Date=new Date();
    ImageFile: any;
    file: File;
    Agentfile:string;
    AgentReceipt_View:boolean=false;
    Receipt_History_View:boolean=false;

    Mode:Mode=new Mode();
    Mode_Temp:Mode=new Mode();
    Mode_Data:Mode[]

    Receipt_Voucher_:Receipt_Voucher=new Receipt_Voucher;
    Receipt_Voucher_Data:Receipt_Voucher[]

    Client_Accounts_:Client_Accounts=new Client_Accounts;
    Client_Accounts_Temp:Client_Accounts=new Client_Accounts;
    Client_Accounts_Data:Client_Accounts[]

    Receipt_Voucher_Index:number=-1;
    Fees_Tab_Permission: any;
    Fees_Tab_View: boolean = false;
    Fees_Tab_Edit: boolean = false;
    Registration: boolean = false;
    myTotalHeight:number;
constructor(public Agent_Service_:Agent_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Permissions = Get_Page_Permission(23);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Agent_Edit=this.Permissions.Edit;
    this.Agent_Save=this.Permissions.Save;
    this.Agent_Delete=this.Permissions.Delete;
    this.Page_Load()
    if (this.Fees_Tab_Permission != undefined && this.Fees_Tab_Permission != null)
    {
    this.Fees_Tab_Edit=this.Fees_Tab_Permission.Edit;
    this.Fees_Tab_View=this.Fees_Tab_Permission.View
    }
    }
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Agent();
    this.tab_view = true;
    this.profile_View = false;
    this.AgentReceipt_View=false;
    this.Receipt_History_View=false;
    this.Load_Agent_Dropdowns();
    this.Load_Mode();
    this.Search_Agent();
    this.Clr_Receipt_Voucher();
    this.Entry_View=false;
    this.Remove_Registration_Visibility=false;
    this.Registration_Visiblility=false
    this.Get_Menu_Status(24,this.Login_User)
    this.Get_Menu_Status(25,this.Login_User)
    this.Get_Menu_Status(26,this.Login_User)

    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 300;

}
Get_Menu_Status(Menu_id, Login_user_id)
{
    this.issLoading = true;
    this.Agent_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {  
    if(Menu_id==23)
    if (Rows[0][0]==undefined)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }  

    var a=Rows[0]

    if (Rows[0][0]!=undefined)
    if (Rows[0][0].View >0)
    {

    if(Menu_id==23)
    {
    this.Permissions=Rows[0][0];
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }
    this.Agent_Edit=this.Permissions.Edit;
    this.Agent_Save=this.Permissions.Save;
    this.Agent_Delete=this.Permissions.Delete;
    }
    else if(Menu_id==25)
    {
    this.Remove_Registration_Permissions=Rows[0][0];
    if(this.Remove_Registration_Permissions.View==true)
    this.Remove_Registration_Visibility=true;
    }
    else if(Menu_id==24)
    {
    this.Registration_Permissions=Rows[0][0];
    if(this.Registration_Permissions.View==true)
    this.Registration_Visiblility=true;
    } 
    else if(Menu_id==26)
    {
    this.Fees_Tab_Permission=Rows[0][0];
    if(this.Fees_Tab_Permission.View==true)
    this.Fees_Tab_View=true;
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
    this.profile_View=true;
    this.AgentReceipt_View=false;
    this.Receipt_History_View=false;
    // this.Receipt_View=true;
    this.Registration_Visiblility=true;
    this.Clr_Agent();
    this.Clr_Receipt_Voucher();
}
Close_Click()
{
    this.Entry_View = false;
    this.Search_Agent();
    this.Clr_Agent();
    this.Clr_Receipt_Voucher();
}
trackByFn(index, item) 
{
return index;
}
Clr_Agent()
{
    this.Agent_Id_Edit=0;
    this.Agent_.Agent_Id=0;
    this.Agent_.Agent_Name="";
    this.Agent_.Address1="";
    this.Agent_.Address2="";
    this.Agent_.Address3="";
    this.Agent_.Address4="";
    this.Agent_.Pincode="";
    this.Agent_.Phone="";
    this.Agent_.Mobile="";
    this.Agent_.Whatsapp="";
    this.Agent_.Gender=0;
    this.Agent_.Email="";
    this.Agent_.Center_Code="";
    this.Agent_.Center_Name="";
    this.Agent_.Agent_Fees=0;
    this.Agent_.Alternative_Email="";
    this.Agent_.Comm_Address1="";
    this.Agent_.Comm_Address2="";
    this.Agent_.Comm_Address3="";
    this.Agent_.Comm_Address4="";
    this.Agent_.Comm_Mobile="";
    this.Agent_.Comm_Pincode="";
    this.Agent_.User_Name="";
    this.Agent_.Password="";
    this.Agent_.Photo="";
    this.Agent_.GSTIN="";
    this.Agent_.Category_Id=0;
    this.Agent_.Commission=0;
    this.Agent_.User_Id=0;
    this.Category_Type_=null;

    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false
}
Category_Click()
{
    this.Agent_.Commission=this.Category_Type_.Commision_Percentage
}
Load_Agent_Dropdowns()
    {
    this.Agent_Service_.Load_Agent_Dropdowns().subscribe(Rows => {    
    if (Rows != null) {

    this.Category_Data= Rows.Category;        
    this.Category_Type_Temp.Category_Id = 0;
    this.Category_Type_Temp.Category_Name = "Select";
    this.Category_Data.unshift(this.Category_Type_Temp);
    // this.Category_Type_Search=this.Category_Type_Data[0];
    this.Category_Type_=this.Category_Data[0];
    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Load_Category_Commission(Category_Id_)
{
    if(this.Category_Data==undefined || this.Category_Data.length==0)
    {
    this.issLoading = true;
    this.Agent_Service_.Load_Category_Commission(Category_Id_).subscribe(Rows => {
    if (Rows != null) {
    // this.Category_Data = Rows[0];
    this.Agent_.Commission = Rows[0];
    this.issLoading = false;
    }

    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
}
Search_Agent()
{ 
    this.issLoading=true;
    this.Agent_Service_.Search_Agent(this.Agent_Name_Search).subscribe(Rows => {
 
    this.Agent_Data=Rows[0];
    this.Total_Entries=this.Agent_Data.length;
    if(this.Agent_Data.length==0)
    
    {
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_Agent(Agent_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
  
    this.issLoading=true;

    this.Agent_Service_.Delete_Agent(Agent_Id).subscribe(Delete_status => {

        

        Delete_status = Delete_status[0];
         Delete_status = Delete_status[0].DeleteStatus_;
        // Delete_status = Delete_status[0].DeleteStatus_.data[0];
    if(Delete_status=1){
    this.Agent_Data.splice(index, 1);
    this.Clr_Agent();
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
File_Change(event)
{
    this.file = event.target.files[0]; 
    this.ImageFile = this.file;
    this.Agentfile=this.file.name;
    this.Agent_.Photo =this.ImageFile.name;
}
Save_Agent()
{
    if(this.Agent_.Agent_Name=="" ||this.Agent_.Agent_Name==null || this.Agent_.Agent_Name==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Branch', Type: "3" }});
    return;
    }
    if(this.Agent_.Mobile=="" ||this.Agent_.Mobile==null || this.Agent_.Mobile==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Mobile', Type: "3" }});
    return;
    }
    if(this.Agent_.Photo == null || this.Agent_.Photo == undefined)
    {
        this.Agent_.Photo = "";
        this.ImageFile = [];
    } 
    this.issLoading=true;
    //this.Agent_.Approval_Status= this.Approval_Status.Status_Id;
    this.Agent_.Category_Id= 1;
    // this.Agent_.Photo= this.Photo.Photo;
    
this.Agent_Service_.Save_Agent(this.Agent_).subscribe(Save_status => {

    Save_status=Save_status[0];
    if(Number(Save_status[0].Agent_Id_)>0)
    {
    this.issLoading=false; 
    this.Agent_.Agent_Id=Save_status[0].Agent_Id_
    this.Agent_.Photo=this.Photo.Photo
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Clr_Agent();
    this.Close_Click();
    }
    else{
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}
Edit_Agent(Agent_e:Agent,index)
{
    this.tab_view=true;
    this.profile_View=true;
    this.AgentReceipt_View=false;
    this.Receipt_History_View=false;
    this.Entry_View=true;
    this.Agent_=Agent_e;
    this.Agent_Id_Edit=Agent_e.Agent_Id;
    this.Agent_=Object.assign({},Agent_e);

    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false
    // for(var i=0;i<this.Category_Data.length;i++)
    // {
    //     if(this.Category_Data[i].Category_Id==this.Agent_.Category_Id)
    //     {
    //         this.Category_Data=this.Category_Data[i];
    //     }
    // }
    this.Registration=this.Agent_.Is_Registered;
    if(this.Agent_.Is_Registered==true)
    {
    if(this.Remove_Registration_Permissions!=undefined && this.Remove_Registration_Permissions!=null)

    if(this.Remove_Registration_Permissions.View==true)
    this.Remove_Registration_Visibility=true;
    }
    else
    {
    if(this.Registration_Permissions!=undefined &&this.Registration_Permissions!=null)
    if(this.Registration_Permissions.View==true)
    this.Registration_Visiblility=true;
    }
    for(var i=0;i<this.Category_Data.length;i++)
    {
    if(this.Category_Data[i].Category_Id==this.Agent_.Category_Id)
    {
    this.Category_Type_=this.Category_Data[i];
    }
    }
}
Tab_Click(Current_tab)
{
    
    this.profile_View=false;
    this.AgentReceipt_View=false;
    if(Current_tab==1)
    this.profile_View=true;
    else if(Current_tab==2)
    {
    this.AgentReceipt_View=true;

    if(this.Receipt_Click_Status==false)
    {
    this.Receipt_Click_Status=true
    // this.Load_Receipt_tab();
    }
    this.Clr_Receipt_Voucher();
    }
}
Save_Agent_Registration()
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Register ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading = true;
    this.Agent_Service_.Save_Agent_Registration(this.Agent_.Agent_Id).subscribe(Save_status => {
    if(Number(Save_status[0][0].Agent_Id_)>0)
    {
    // this.Remove_Registration_Visibility=false
    // this.Registration_Visiblility=false
    // if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
    //     if(this.Remove_Registration_Permissions.View==true)
    //          this.Remove_Registration_Visibility=true;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registered',Type:"false"}});
    // this.Search_Agent();
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false

    if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
    if(this.Remove_Registration_Permissions.View==true)
    this.Remove_Registration_Visibility=true;
    }
    else{  
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

Remove_Registration()
{

    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Remove Registration ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Agent_Service_.Remove_Registration(this.Agent_.Agent_Id).subscribe(update_status => {


    if(update_status[0][0].Agent_Id_>0)
    {

    // this.Student_Message_Data.splice(this.EditIndex, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registration Removed',Type: "false"}});
    // this.Search_Agent();
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false

    if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
    if(this.Registration_Permissions.View==true)
    this.Registration_Visiblility=true;

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
Load_Mode()
    {
        this.Agent_Service_.Load_Mode().subscribe(Rows =>
    {
    this.Mode_Data= Rows[0];        
    this.Mode_Temp.Mode_Id = 0;
    this.Mode_Temp.Mode_Name = "Select";
    this.Mode_Data.unshift(this.Mode_Temp);
    this.Mode=this.Mode_Data[0]; 
    },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
Accounts_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Client_Accounts_Data == undefined || this.Client_Accounts_Data.length==0)
    {
        this.issLoading = true;
        this.Agent_Service_.Accounts_Typeahead('4,5,11',Value).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Client_Accounts_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Accounts(Client_Accounts_: Client_Accounts)
{     
    if (Client_Accounts_) { return Client_Accounts_.Client_Accounts_Name; }
}
Clr_Receipt_Voucher()
{
   this.Receipt_Voucher_.Receipt_Voucher_Id=0;
   this.Receipt_Voucher_.Date=new Date();
   this.Receipt_Voucher_.Date=this.New_Date(this.Receipt_Voucher_.Date);
   this.Receipt_Voucher_.Voucher_No=null;
   this.Receipt_Voucher_.From_Account_Id=0;
   this.Receipt_Voucher_.Amount=null;
   this.Receipt_Voucher_.To_Account_Id=0;
   this.Receipt_Voucher_.Payment_Mode=0;
   this.Receipt_Voucher_.User_Id=0;
   this.Receipt_Voucher_.Description="";
   this.Receipt_Voucher_.Address1="";
   this.Client_Accounts_=null;
   if(this.Mode_Data!=null && this.Mode_Data != undefined)
   this.Mode=this.Mode_Data[0];
   this.Receipt_Voucher_.Payment_Status=0;
}
// Add_Receipt()
// {
//     if (this.Mode.Mode_Id == null || this.Mode.Mode_Id == undefined || this.Mode.Mode_Id == 0 || this.Mode == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode ', Type: "3" } });
//         return
//     }
//     else if (this.Receipt_Voucher_.Amount == undefined || this.Receipt_Voucher_.Amount == null || this.Receipt_Voucher_.Amount == 0)
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Amount',Type:"3"}});
//         return
//     }
//     else if (this.Client_Accounts_ == undefined || this.Client_Accounts_ == null || this.Client_Accounts_.Client_Accounts_Id == 0 || this.Client_Accounts_.Client_Accounts_Id == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account ', Type: "3" } });
//         return
//     }

//     if (this.Receipt_Voucher_Data == undefined)
//         this.Receipt_Voucher_Data = [];
//     this.Receipt_Voucher_.Payment_Mode = this.Mode.Mode_Id
//     this.Receipt_Voucher_.Payment_Status = 0
//     this.Receipt_Voucher_.To_Account_Id = this.Client_Accounts_.Client_Accounts_Id
//     if (this.Receipt_Voucher_Index >= 0) {
//         this.Receipt_Voucher_Data[this.Receipt_Voucher_Index] = Object.assign({}, this.Receipt_Voucher_)// this.Sales_Details_;
//         }
//         else {
//         this.Receipt_Voucher_Data.push(Object.assign({}, this.Receipt_Voucher_));
//         }
//     this.Receipt_Voucher_Index=-1;
//     this.Clr_Receipt_Voucher();
// }
Save_Receipt_Voucher()
{
    if (this.Client_Accounts_ == undefined || this.Client_Accounts_ == null || this.Client_Accounts_.Client_Accounts_Id == undefined || this.Client_Accounts_.Client_Accounts_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account', Type: "3" } });
        }
        else if(this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==null||this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }       
        else if (this.Mode == null || this.Mode == undefined || this.Mode.Mode_Id == undefined || this.Mode.Mode_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode', Type: "3" } });
        }
else
{
        this.Receipt_Voucher_.User_Id=Number(this.Login_User);
        this.Receipt_Voucher_.From_Account_Id=this.Agent_Id_Edit;
        this.Receipt_Voucher_.Payment_Status=0;
        this.Receipt_Voucher_.To_Account_Id=this.Client_Accounts_.Client_Accounts_Id;
        this.Receipt_Voucher_.Payment_Mode=this.Mode.Mode_Id;
        
        this.Receipt_Voucher_.Date=this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format('YYYY-MM-DD')));
this.issLoading=true;
this.Agent_Service_.Save_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
    
Save_status=Save_status[0];
if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Clr_Receipt_Voucher();
this.Receipt_History_View=false;
//  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
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
Followup_History()
{
    if(this.Receipt_History_View==false)
    {
        this.Receipt_History_View = true;
        this.issLoading = true;

        this.Agent_Service_.Get_Receipt_History(this.Agent_Id_Edit).subscribe(Rows =>
             {                               
            this.issLoading = false;
                this.Receipt_Voucher_Data = Rows[0];

        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
    }
   
    else
    this.Receipt_History_View=false

}
Edit_Receipt_Voucher(Receipt_Voucher_e:Receipt_Voucher,index)
{
this.Receipt_Voucher_=Receipt_Voucher_e;

this.Receipt_Voucher_=Object.assign({},Receipt_Voucher_e);

this.Client_Accounts_Temp.Client_Accounts_Id=Receipt_Voucher_e.To_Account_Id;
this.Client_Accounts_Temp.Client_Accounts_Name=Receipt_Voucher_e.ToAccount_Name;
this.Client_Accounts_=this.Client_Accounts_Temp;
 
 
for (var i = 0; i < this.Mode_Data.length; i++) {
    if (Receipt_Voucher_e.Payment_Mode == this.Mode_Data[i].Mode_Id)
    this.Mode = this.Mode_Data[i];
}
}
Delete_Receipt_Voucher(Receipt_Voucher_Id,index)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Agent_Service_.Delete_Receipt_Voucher(Receipt_Voucher_Id).subscribe(Delete_status => {
         
    if(Delete_status[0][0].Receipt_Voucher_Id_>0){
        this.Receipt_History_View=false;
    this.Receipt_Voucher_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    
    }
    else
    {
    //this.Receipt_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
    }
 });
}
}
