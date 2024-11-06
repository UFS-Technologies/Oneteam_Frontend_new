import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State_Service } from '../../../services/State.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { State } from '../../../models/State';
import { State_District } from '../../../models/State_District';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-State',
    templateUrl: './State.component.html',
    styleUrls: ['./State.component.css']
})
export class StateComponent implements OnInit {
    State_Name_Search:string;
    Entry_View:boolean=true;
    District_View:boolean=true;
    State_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    State_Edit:boolean;
    State_Save:boolean;
    State_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;

    State_Data:State[]
    State_:State= new State();

    State_District_Data:State_District[]
    State_District_:State_District= new State_District();
    Login_User:string="0";
array:any;
constructor(public State_Service_:State_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(49);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.State_Edit=this.Permissions.Edit;
    // this.State_Save=this.Permissions.Save;
    // this.State_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(49,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_State();
    this.Search_State();
    this.Entry_View=false;
    this.State_View=true;
    this.District_View=true;
    
 this.myInnerHeight = (window.innerHeight);
 this.myTotalHeight=this.myInnerHeight
 this.myTotalHeight=this.myTotalHeight-250;
 this.myInnerHeight = this.myInnerHeight - 250;
}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.State_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==49)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==49)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.State_Edit= this.array.Edit;
                this.State_Save= this.array.Save;
                this.State_Delete= this.array.Delete;
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
    this.State_View=false;
    this.District_View=true;
    this.Clr_State();
}
Close_Click()
{
    this.Search_State();
    this.Clr_State();
    this.clr_District();
    this.State_District_Data=[];
    this.Entry_View = false;
    this.State_View=true;
    this.District_View=true;
}
trackByFn(index, item) 
{
return index;
}

Clr_State()
{
    this.State_.State_Id=0;
    this.State_.State_Name="";
}
Search_State()
{
    this.Total_Entries = 0;
    this.issLoading=true;
    this.State_Service_.Search_State(this.State_Name_Search).subscribe(Rows => {
    this.State_Data=Rows[0];
    this.Total_Entries=this.State_Data.length;
    if(this.State_Data.length==0)
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
Delete_State(State_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.State_Service_.Delete_State(State_Id).subscribe(Delete_status => {
        
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_;
        if(Delete_status==1)
        {
        this.State_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        this.Search_State();
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
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
Save_State()
{
    if(this.State_.State_Name===undefined || this.State_.State_Name==null || this.State_.State_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter State ',Type: "3" }});
    return  
    }
     this.issLoading=true;
    this.State_Service_.Save_State(this.State_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].State_Id_)>0)
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
Edit_State(State_e:State,index)
{
    this.Entry_View=true;
    this.State_View=false;
    this.District_View=true;
    this.State_=State_e;
    this.State_=Object.assign({},State_e);
}
clr_District()
{
    this.State_District_.State_District_Id=0;
    this.State_District_.State_Id=0;
    this.State_District_.District_Name='';
}
Save_State_District()
{
    if(this.State_District_.District_Name===undefined || this.State_District_.District_Name==null || this.State_District_.District_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter District ',Type: "3" }});
    return  
    }
     this.issLoading=true;
    
    this.State_District_.State_Id=this.State_.State_Id;
    this.State_Service_.Save_State_District(this.State_District_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].State_District_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.clr_District();
    this.Get_State_District(this.State_.State_Id)
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
Edit_State_District(State_e:State,index)
{
    this.Entry_View=true;
    this.State_View=true;
    this.District_View=false;
    this.State_=State_e;
    this.State_=Object.assign({},State_e);
    this.Get_State_District(this.State_.State_Id)
}
Get_State_District(State_Id)
{
    this.issLoading=true;
    this.State_Service_.Get_State_District(State_Id).subscribe(Rows =>
        {       
                                    
       this.issLoading = false;
           this.State_District_Data = Rows[0];
   },
       Rows => {
           this.issLoading = false;
           const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
       });
}
Edit_District(State_District_e:State_District,index)
{
    this.State_District_=State_District_e;
    this.State_District_=Object.assign({},State_District_e);
}
Delete_State_District(State_District_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.State_Service_.Delete_State_District(State_District_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.State_District_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_State();
    }
    else
    {
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
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
}

