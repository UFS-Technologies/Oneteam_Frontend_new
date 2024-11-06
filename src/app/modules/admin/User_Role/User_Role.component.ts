import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Role_Service } from '../../../services/User_Role.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Role } from '../../../models/User_Role';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-User_Role',
    templateUrl: './User_Role.component.html',
    styleUrls: ['./User_Role.component.css']
})
export class User_RoleComponent implements OnInit {
    User_Role_Data:User_Role[]
    User_Role_:User_Role= new User_Role();
    User_Role_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    User_Role_Edit:boolean;
    User_Role_Save:boolean;
    User_Role_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;
    Login_User:string="0";
array:any;
constructor(public User_Role_Service_:User_Role_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(8);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.User_Role_Edit=this.Permissions.Edit;
    // this.User_Role_Save=this.Permissions.Save;
    // this.User_Role_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(8,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_User_Role();
    this.Search_User_Role();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 350;

}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.User_Role_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==8)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==8)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.User_Role_Edit= this.array.Edit;
                this.User_Role_Save= this.array.Save;
                this.User_Role_Delete= this.array.Delete;
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
    this.Clr_User_Role();
}
Close_Click()
{
    this.Search_User_Role();
    this.Clr_User_Role();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_User_Role()
{
    this.User_Role_.User_Role_Id=0;
    this.User_Role_.User_Role_Name="";
}
Search_User_Role()
{
    this.issLoading=true;
    this.User_Role_Service_.Search_User_Role(this.User_Role_Name_Search).subscribe(Rows => {
    this.User_Role_Data=Rows[0];
    this.Total_Entries=this.User_Role_Data.length;
    if(this.User_Role_Data.length==0)
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
Delete_User_Role(User_Role_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.User_Role_Service_.Delete_User_Role(User_Role_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.User_Role_Data.splice(index, 1);
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
Save_User_Role()
{
    if(this.User_Role_.User_Role_Name===undefined || this.User_Role_.User_Role_Name==null || this.User_Role_.User_Role_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter User Role ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.User_Role_Service_.Save_User_Role(this.User_Role_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].User_Role_Id_)>0)
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
Edit_User_Role(User_Role_e:User_Role,index)
{
    this.Entry_View=true;
    this.User_Role_=User_Role_e;
    this.User_Role_=Object.assign({},User_Role_e);
}
}

