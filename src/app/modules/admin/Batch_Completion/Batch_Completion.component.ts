import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Course } from '../../../models/Course';
import { FormControl } from '@angular/forms';
import { Batch } from '../../../models/Batch';import { Agent } from 'app/models/Agent';
import { Student_Data_Service } from 'app/services/Student_Data.service';
;
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-Batch_Completion',
    templateUrl: './Batch_Completion.component.html',
    styleUrls: ['./Batch_Completion.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
    })
export class Batch_CompletionComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Batch_Completion_Edit:boolean;
    Batch_Completion_Save:boolean;
    Batch_Completion_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;

    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();
    Users_Data_Filter: Users[]  

    Search_Team_Member_=new FormControl();
    Search_Team_Member_Temp:any

    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];


    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;
    Faculty_Data_Filter: Users[];


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Batch_Completion_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    Mark_As_Complete_Data:any;
    
    Batch_Completion_Data:any;

    Edit_Page_Permission: any;

    FollowUp_Branch_: Agent = new Agent();
	Followup_Branch_Data: Agent[];

    login_user_name: string;
    Trainer:number;


    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[]    
constructor(public Student_Service_:Student_Service,
    public Student_Data_Service_:Student_Data_Service,
     private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.login_user_name = (localStorage.getItem("uname"));
    this.Permissions = Get_Page_Permission(80);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Batch_Completion_Edit=this.Permissions.Edit;
    this.Batch_Completion_Save=this.Permissions.Save;
    this.Batch_Completion_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Trainer =this.Login_User;
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 280;
    this.Search_Batch_Completion();
    this.Search_Batch_Typeahead_Report_New( );

    this.Faculty_Temp.Users_Id = this.Login_User;
    this.Faculty_Temp.Users_Name = this.login_user_name;
    this.Faculty_ = Object.assign(this.Faculty_Temp);
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Batch_Completion_Data,'Batch Completion Report')
       
}
Get_Lead_Load_Data()
{
this.issLoading = true;
this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => 
{
   
    if (Rows != undefined)
    {
        
        this.issLoading = false;
        // this.Department_Data = Rows.returnvalue.Department;
         this.Users_Data = Rows.returnvalue.Users;
         this.Enquiry_Status_Data = Rows.returnvalue.Status;
        
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];

        this.Enquiry_Status_Temp.Status_Id = 0;
        this.Enquiry_Status_Temp.Status_Name = "All";
        this.Enquiry_Status_Data.unshift(Object.assign({},this.Enquiry_Status_Temp));
        this.Enquiry_Status_Search = this.Enquiry_Status_Data[0];

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Load_Enquiry_Source()
{
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
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
Edit_Lead(Student_Id, i) {

    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    this.Edit_Page_Permission = Get_Page_Permission(80);
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
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
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
Search_Batch_Completion()
{

    debugger
    var  Enquiry_Source_Id = 0,look_In_Date_Value=0,Team_Member_Selection="";
    var User_Id=0,status =0,Course_Id=0;
    var Faculty_Id =0,Batch_Id = 0,FollowUp_Branch_Id=0;

    if (this.Is_Date == true)
    look_In_Date_Value = 1;

    if (this.Enquiry_Source_ != undefined && this.Enquiry_Source_ != null)
    if (this.Enquiry_Source_.Enquiry_Source_Id != undefined && this.Enquiry_Source_.Enquiry_Source_Id != null)
    Enquiry_Source_Id = this.Enquiry_Source_.Enquiry_Source_Id;
    if (this.User_Search != undefined && this.User_Search!=null)
    if (this.User_Search.Users_Id != undefined && this.User_Search.Users_Id != null)
    User_Id = this.User_Search.Users_Id;
    if (this.Enquiry_Status_Search != undefined && this.Enquiry_Status_Search!=null)
    if (this.Enquiry_Status_Search.Status_Id != undefined && this.Enquiry_Status_Search.Status_Id != null)
        status = this.Enquiry_Status_Search.Status_Id;

    if (this.Course_ != undefined && this.Course_ != null)
    if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    Course_Id = this.Course_.Course_Id; 
    
    

    if (this.Batch_ != undefined && this.Batch_ != null)
    if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
    Batch_Id = this.Batch_.Batch_Id;

    if (this.Faculty_ != undefined && this.Faculty_ != null)
    if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
    Faculty_Id = this.Faculty_.Users_Id;
                

    if (this.FollowUp_Branch_ != undefined && this.FollowUp_Branch_ != null)
    if (this.FollowUp_Branch_.Agent_Id != undefined && this.FollowUp_Branch_.Agent_Id != null)
    FollowUp_Branch_Id = this.FollowUp_Branch_.Agent_Id;
                


    this.Search_Team_Member_Temp=this.Search_Team_Member_;
    if (this.Search_Team_Member_.value !=undefined)
    {
        for (var i=0;i<this.Search_Team_Member_.value.length;i++)
        {
            Team_Member_Selection=Team_Member_Selection + this.Search_Team_Member_.value[i].Users_Id.toString() +",";
        }
        if(Team_Member_Selection.length>0)
        Team_Member_Selection=Team_Member_Selection.substring(0,Team_Member_Selection.length-1)
    
        
    }



    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Batch_Completion(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Batch_Id,Faculty_Id,Course_Id,this.Login_User,FollowUp_Branch_Id).subscribe(Rows =>{
debugger
    this.Batch_Completion_Data = Rows[0];
debugger
    // for (var i=0;i<this.Batch_Completion_Data.length;i++)
    // {
    //     if(this.Batch_Completion_Data[i].conversion_count<=25)
    //     {
    //         this.Batch_Completion_Data[i].convesion_color=1
    //     }
        
    // }

    // for (var i=0;i<this.Batch_Completion_Data.length;i++)
    // {
    //     if(this.Batch_Completion_Data[i].conversion_count>=25 && this.Batch_Completion_Data[i].conversion_count<=45)
    //     {
    //         this.Batch_Completion_Data[i].convesion_color=2
    //     }
        
    // }

    // for (var i=0;i<this.Batch_Completion_Data.length;i++)
    // {
    //     if(this.Batch_Completion_Data[i].conversion_count>=46)
    //     {
    //         this.Batch_Completion_Data[i].convesion_color=3
    //     }
        
    // }




    this.Total_Entries = this.Batch_Completion_Data.length;
    this.issLoading = false;
    if(this.Batch_Completion_Data.length==0)
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
    }
    );
}


Search_Team_Member_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Users_Data == undefined || this.Users_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Team_Member_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Users_Data = Rows[0];
        this.issLoading = false;

        this.Users_Data_Filter=[];

        for (var i=0;i<this.Users_Data.length;i++)
        {
            if(this.Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Users_Data_Filter.push(this.Users_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Users_Data_Filter=[];
        for (var i=0;i<this.Users_Data.length;i++)
        {
            if(this.Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Users_Data_Filter.push(this.Users_Data[i])
        }
    }
}

display_Team_Member(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}

Search_Batch_Typeahead(event: any)
{     debugger
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Batch_Typeahead_Report('',this.Login_User).subscribe(Rows => {
            debugger
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
    });
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
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
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


Mark_As_Complete(Batch_Id_,Status_)
{
    
    this.issLoading = true;
    this.Student_Service_.Mark_As_Complete(this.Login_User,Batch_Id_,Number(Status_)).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Mark_As_Complete_Data = Rows[0];
           
           if(this.Mark_As_Complete_Data[0].Batch_Id_>0 && this.Mark_As_Complete_Data[0].Batch_Complete_Status_>=0 && this.Mark_As_Complete_Data[0].Batch_Complete_Status_!=null)
           {
               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Updated',Type:"false"}});
           this.Search_Batch_Completion();
            }
           else
           {        
               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'You Cannot Update',Type:"2"}});
           }
           
            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

Search_Branch_Typeahead(event: any) {
	//debugger
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
						//debugger
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
   

    this.Search_Batch_Typeahead_Report_New()

}

Search_Batch_Typeahead_Report_New()
{
    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Batch_Typeahead_Report_New('',this.Login_User,this.Trainer).subscribe(Rows => {
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


}

