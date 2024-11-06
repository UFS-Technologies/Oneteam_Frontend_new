import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recruitment_Drives_Service } from '../../../services/Recruitment_Drives.Service ';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Recruitment_Drives } from '../../../models/Recruitment_Drives';
import { Course } from '../../../models/Course';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Specialization } from '../../../models/Specialization';
import { Qualification } from '../../../models/Qualification';
import { Experience } from '../../../models/Experience';
import { Functionl_Area } from '../../../models/Functionl_Area';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Employer_Details } from 'app/models/Employer_Details';
import { Gender } from "../../../models/Gender";
import { Student_Service } from 'app/services/Student.service';
import { environment } from '../../../../environments/environment.prod';
import { Agent } from 'app/models/Agent';
import { Student_Data_Service } from 'app/services/Student_Data.service';
import { Event_Status } from 'app/models/Event_Status';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Recruitment_Drives',
templateUrl: './Recruitment_Drives.component.html',
styleUrls: ['./Recruitment_Drives.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Recruitment_DrivesComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Recruitment_Drives_Edit:boolean;
    Recruitment_Drives_Save:boolean;
    Recruitment_Drives_Delete:boolean;
    myInnerHeight: number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Recruitment_Drives_Id: number = 0;
    Recruitment_Drives_Data: Recruitment_Drives[]
    Recruitment_Drives_: Recruitment_Drives = new Recruitment_Drives();
 

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Recruitment_Drives_EditIndex: number = -1;


	Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    nextflag: number;
   
    FollowUp_Branch_: Agent = new Agent();
    Search_FollowUp_Branch_: Agent = new Agent();
    FollowUp_Branch_Temp: Agent = new Agent();
	Followup_Branch_Data: Agent[];
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    
   Event_Status_:Event_Status = new Event_Status();
   Event_Status_Temp:Event_Status = new Event_Status();
   Event_Status_Data:Event_Status[];


constructor(public Recruitment_Drives_Service_:Recruitment_Drives_Service,public Student_Service_: Student_Service,public Student_Data_Service_:Student_Data_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));

    this.Permissions = Get_Page_Permission(92);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Recruitment_Drives_Edit=this.Permissions.Edit;
    this.Recruitment_Drives_Save=this.Permissions.Save;
    this.Recruitment_Drives_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    this.Entry_View = false
    this.profile_View = true  

    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 220;

    this.Pointer_Start_ = 1;
	this.Pointer_Stop_ = this.Page_Length_;

    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_);

    this.Clr_Recruitment_Drives();
    this.Load_Dropdowns()
    this.Search_Recruitment_Drives();

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




File_Change_Photo(event: Event) 
{    
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Logo = file;
    this.Logo= this.ImageFile_Logo[0].name;
}
Download_Recruitment_Drives_File(File_Name)
{
    var File_Name_Temp;
    if(File_Name=='Photo')
    var bs=environment.FilePath
    var s=bs+File_Name_Temp;            
    window.open(s,'_blank');
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
Create_New()
{
    this.Entry_View = true;
    this.profile_View = true;
    this.Recruitment_Drives_Id = 0
    this.Clr_Recruitment_Drives();
}
Close_Click()
{
    this.Entry_View = false;
    this.profile_View = false;
    this.Recruitment_Drives_EditIndex = -1;
    this.Recruitment_Drives_Id = 0
    this.Clr_Recruitment_Drives();
    this.Search_Recruitment_Drives();
}
Clr_Recruitment_Drives()
{
    this.Recruitment_Drives_.Recruitment_Drives_Id=0;
    this.Recruitment_Drives_.Event_Name='';
    this.Recruitment_Drives_.Date = new Date();
    this.Recruitment_Drives_.Date = this.New_Date(this.Recruitment_Drives_.Date);
    // this.Recruitment_Drives_.Reporting_Time = this.setNewTime(this.Recruitment_Drives_.Date, 15, 30, 0); // Set time to 3:30 PM
    this.Recruitment_Drives_.Reporting_Time= "";
    this.Recruitment_Drives_.Venue='';
    this.Recruitment_Drives_.Organized_Branch_Id=0;
    this.Recruitment_Drives_.Organized_Branch_Name='';
    this.Recruitment_Drives_.Eligibility_Criteria = '';
    this.Recruitment_Drives_.Additional_Information='';
    this.Recruitment_Drives_.Number_of_Registrations='';
    this.Recruitment_Drives_.Unique_Link='';
    this.Recruitment_Drives_.User_Id=0;
    this.FollowUp_Branch_=null;
    if(this.Event_Status_Data!=null && this.Event_Status_Data != undefined)
    this.Event_Status_=this.Event_Status_Data[1];
    
}

setNewTime(date: Date, hours: number, minutes: number, seconds: number): Date {
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }




Search_Recruitment_Drives()
{
    var   look_In_Date_Value=0,Branch_Id_=0;
     if (this.Is_Date == true)
    look_In_Date_Value = 1;

    
    if (this.Search_FollowUp_Branch_ != undefined && this.Search_FollowUp_Branch_ != null)
    if (this.Search_FollowUp_Branch_.Agent_Id != undefined && this.Search_FollowUp_Branch_.Agent_Id != null)
    Branch_Id_ = this.Search_FollowUp_Branch_.Agent_Id;  

   

    this.issLoading = true;
    debugger
    this.Recruitment_Drives_Service_.Search_Recruitment_Drives(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Branch_Id_,
        this.Pointer_Start_,
        this.Pointer_Stop_,
        this.Page_Length_).subscribe(Rows =>{
            debugger
    this.Recruitment_Drives_Data = Rows.returnvalue.Recruitment_Drives;
    this.Total_Entries = this.Recruitment_Drives_Data.length;
    this.issLoading = false;
    if(this.Recruitment_Drives_Data.length==0)
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
Delete_Recruitment_Drives(Recruitment_Drives_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Recruitment_Drives_Service_.Delete_Recruitment_Drives(Recruitment_Drives_Id).subscribe(Delete_status => {
        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data;
    if(Delete_status==1)
    {
    this.Recruitment_Drives_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_Recruitment_Drives();
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




Save_Recruitment_Drives()
{

    if (this.Recruitment_Drives_.Event_Name == undefined || this.Recruitment_Drives_.Event_Name == null || this.Recruitment_Drives_.Event_Name == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Name Of the Event', Type: "3" } });
        return;
    }

    else if (this.Recruitment_Drives_.Date == undefined || this.Recruitment_Drives_.Date == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Event Date', Type: "3" } });
        return;
    }

    else if (this.Recruitment_Drives_.Reporting_Time == undefined || this.Recruitment_Drives_.Reporting_Time == null||this.Recruitment_Drives_.Reporting_Time == ""  ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Reporting Time', Type: "3" } });
        return;
    }

    else if (this.Recruitment_Drives_.Venue == undefined || this.Recruitment_Drives_.Venue == null || this.Recruitment_Drives_.Venue == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Venue', Type: "3" } });
        return;
    }
   
   else if (this.FollowUp_Branch_ == undefined || this.FollowUp_Branch_ == null || this.FollowUp_Branch_.Agent_Id == undefined || this.FollowUp_Branch_.Agent_Id==0||this.FollowUp_Branch_.Agent_Id==null) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Organized Branch', Type: "3" } });
        return;
    } 
    

    this.Recruitment_Drives_.Date = this.New_Date(new Date(moment(this.Recruitment_Drives_.Date).format("YYYY-MM-DD")) );
    this.Recruitment_Drives_.User_Id=this.Login_User;
    this.Recruitment_Drives_.Organized_Branch_Id=this.FollowUp_Branch_.Agent_Id;
    this.Recruitment_Drives_.Organized_Branch_Name=this.FollowUp_Branch_.Agent_Name;
    this.Recruitment_Drives_.Event_Status_Id=this.Event_Status_.Event_Status_Id;
    this.Recruitment_Drives_.Event_Status_Name=this.Event_Status_.Event_Status_Name;
    
   

    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true; this.Recruitment_Drives_Service_.Save_Recruitment_Drives(this.Recruitment_Drives_).subscribe(Save_status => {
       
        if(Number(Save_status[0].Recruitment_Drives_Id_)>0)
        { 
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
           this.Save_Call_Status = false;
            this.Close_Click()
        }
        else 
        {  
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
             this.Save_Call_Status = false;
        }
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            this.Save_Call_Status = false;
    });
}
Edit_Recruitment_Drives(Recruitment_Drives_e:any,index)
{
     this.Clr_Recruitment_Drives();
    this.Recruitment_Drives_EditIndex = index
    this.Recruitment_Drives_Id = Recruitment_Drives_e.Recruitment_Drives_Id;
    this.Entry_View=true;
    this.profile_View=true;
    this.Recruitment_Drives_= Object.assign({},Recruitment_Drives_e);

    this.FollowUp_Branch_Temp.Agent_Id = this.Recruitment_Drives_.Organized_Branch_Id;
    this.FollowUp_Branch_Temp.Agent_Name = this.Recruitment_Drives_.Organized_Branch_Name;
    this.FollowUp_Branch_ = Object.assign(this.FollowUp_Branch_Temp);

    this.Recruitment_Drives_.Date = this.New_Date(new Date(moment(this.Recruitment_Drives_.Date1).format('YYYY-MM-DD')));

    for (var i = 0; i < this.Event_Status_Data.length; i++)
    {
    if (this.Recruitment_Drives_.Event_Status_Id == this.Event_Status_Data[i].Event_Status_Id)
    this.Event_Status_=this.Event_Status_Data[i];
    }
    
}


Next_Click() {
    if (this.Recruitment_Drives_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Recruitment_Drives_Data.length > 0) {
            this.Search_Recruitment_Drives();
        }
    }
}

previous_Click() {
    if (this.Pointer_Start_ > 1) {
        this.Pointer_Start_ = this.Pointer_Start_ - this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ - this.Page_Length_;
        this.Search_Recruitment_Drives();
    }
}



Search_Branch_Typeahead(event: any) {

		var Value = "";
		if (this.Followup_Branch_Data == undefined) this.Followup_Branch_Data = [];
		if (this.Followup_Branch_Data.length == 0) {
			if (event.target.value == "") Value = undefined;
			else Value = event.target.value;

			if (
				this.Followup_Branch_Data == undefined ||
				this.Followup_Branch_Data.length == 0
			) {
				this.issLoading = true;
				this.Student_Data_Service_.Search_Branch_Typeahead("").subscribe(
					(Rows) => {
						
						if (Rows != null) {
							this.Followup_Branch_Data = Rows[0];
							this.issLoading = false;
						}
					},
					(Rows) => {
						this.issLoading = false;
						}
				);
			}
		}
	}
	display_Branch(Branch_: Agent) {
		if (Branch_) {
			return Branch_.Agent_Name;
		}
	}

    Load_Dropdowns() {

        this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
        (Rows) => {
        this.Event_Status_Data = Rows[9];
        this.Event_Status_Temp.Event_Status_Id = 0;
        this.Event_Status_Temp.Event_Status_Name = "Select";
        this.Event_Status_Data.unshift(this.Event_Status_Temp);
        this.Event_Status_ = this.Event_Status_Data[1];
        
        },
        (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Error Occured", Type: "2" },
        });
        }
        );
        }

}

