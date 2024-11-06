import { Component, OnInit, Input, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of as observableOf, merge } from "rxjs";
import { Student_Service } from "../../../services/Student.service";

import { Student_Data_Service } from "../../../services/Student_Data.service";

import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Student } from "../../../models/Student";
import { Agent } from "../../../models/Agent";
import { Users } from "../../../models/Users";
import { Status } from "../../../models/Status";
// import { Department } from "../../../models/Department";
// import { Department_Status } from "../../../models/Department_Status";
import { Gender } from "../../../models/Gender";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogConfig,
} from "@angular/material";
import { FormControl } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
// import { Remarks } from "../../../models/Remarks";
import { Enquiry_Source } from "../../../models/Enquiry_Source";
// import { Student_FollowUp } from "../../../models/Student_FollowUp";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
	parse: {
		dateInput: "DD/MM/YYYY",
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "DD/MM/YYYY",
		monthYearA11yLabel: "MMMM YYYY",
	},
};

@Component({
	selector: "app-Student_Data",
	templateUrl: "./Student_Data.component.html",
	styleUrls: ["./Student_Data.component.css"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class Student_DataComponent implements OnInit {

	User_Search: Users = new Users();
	Search_User_: Users = new Users();
	To_User_Search: Users = new Users();
	Search_To_User_: Users = new Users();
	Search_Name = "";
	Search_Branch: Agent = new Agent();
	Search_FromDate: Date = new Date();
	Search_ToDate: Date = new Date();
	Look_In_Date: Boolean = true;

	Full_Transfer_Check: Boolean = false;

	More_Search_Options: boolean = true;

	myInnerHeighttemp: number;
	myTotalHeight: number;
	Gender_Data: Gender[];
	Branch_Temp1: Agent = new Agent();
	missedfollowup_count: number = 1;
	followup_count: number = 1;
	Lead_Data: Student[];
	Student_Data_Search: Student[];
	Student_Data: Student[];
	Student_Data_Item: Student = new Student();
	Lead_: Student = new Student();
	Search_Div: boolean = false;
	array: any;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	myInnerHeight: number;
	issLoading: boolean;

	Show_FollowUp: boolean = false;
	main_View: boolean = false;
	Student_Selected_Data: Student[];

	Black: boolean = false;
	Red: boolean = false;
	pagePointer: number = 0;
	pageindex2: number = 0;
	pageindex: number = 0;
	Total_Rows: number = 0;
	isLoading = false;
	Search_By_: any;
	Registered_By_: any;
	year: any;
	month: any;
	day: any;
	date: any;
	Login_User: string = "0";
	Menu_Id: number = 80;

	Select_Student: boolean = false;
	Select_View: boolean = false;
	Student_Id: number = 0;
	Student_: Student = new Student();

	RowCount: number = 0;
	RowCount2: number = 0;
	nextflag: number = -1;
	Page_Length_: number = 10;
	firstnum: number = 0;
	lastnum: number = 1;
	shownext: boolean = false;
	showprev: boolean = false;

	Black_Start: number = 1;
	Black_Stop: number = 0;
	Red_Start: number = 1;
	Red_Stop: number = 0;
	points25: boolean = false;
	Edit_Page_Permission: any;

	Followup_Users_Data: Users[];
	Followup_Branch_User_Data: Users[];
	Followup_Users_: Users = new Users();

	Student_Selection_Data_Temp: Student[];

	Login_Id: number;
	Export_Permission: any;
	Export_View: boolean = false;
	Total_Data: number = 0;
	Permissions: any;
	Login_User_Name: string;
	Is_Registered: any;


	Enquiry_Source_: Enquiry_Source = new Enquiry_Source();
	Enquiry_Source_Data: Enquiry_Source[];
	Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source();
	Enquiry_Source_Search: Enquiry_Source = new Enquiry_Source();

	Branch_: Agent = new Agent();
	Branch_Data: Agent[];
	Branch_Temp: Agent = new Agent();
	Branch_Search: Agent = new Agent();

	Status_: Status = new Status();
	Status_Data: Status[];
	Status_Temp: Status = new Status();
	Status_Search: Status = new Status();


	Users_: Users = new Users();
	Users_Data: Users[];
	Users_Temp: Users = new Users();
	Users_Search: Users = new Users();

	To_Staff_: Users = new Users();
	To_Staff_Data: Users[];
	To_Staff_Temp: Users = new Users();
	To_Staff_Search: Users = new Users();

	FollowUp_Branch_: Agent = new Agent();
	Followup_Branch_Data: Agent[];

	constructor(
		public Student_Service_: Student_Service,
		public Student_Data_Service_: Student_Data_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		this.Login_User = localStorage.getItem("Login_User");
		this.Login_User_Name = localStorage.getItem("uname");
		// this.array = Get_Page_Permission(this.Menu_Id);
		// this.Export_Permission=Get_Page_Permission(38);

		// if (this.array == undefined || this.array == null)
		// {
		//     localStorage.removeItem('token');
		//     this.router.navigateByUrl('/auth/login');
		// }
		// else
		{
			this.Page_Load();
		}
	}
	Page_Load() {
		this.myInnerHeight = window.innerHeight;
		this.myInnerHeight = this.myInnerHeight - 200;
		this.myTotalHeight = this.myInnerHeight;
		this.myTotalHeight = this.myTotalHeight - 40;
		this.myInnerHeighttemp = this.myInnerHeight
		this.Black_Stop = this.Page_Length_;
		this.Red_Stop = this.Page_Length_;
		this.main_View = true;
		this.Search_Student_Report();
		this.Show_FollowUp = false;
		this.Search_By_ = 0;
		this.Registered_By_ = 1;
		this.Is_Registered = 1;
		this.Student_Data_Dropdowns();
		this.Get_Menu_Status(61, this.Login_User);
		this.Get_Menu_Status(61, this.Login_User);
		this.Search_FromDate = this.New_Date(this.Search_FromDate);
		this.Search_ToDate = this.New_Date(this.Search_ToDate);
	}




	Get_Menu_Status(Menu_id, Login_user_id) {
		this.issLoading = false;
		this.Student_Data_Service_.Get_Menu_Status(Menu_id, Login_user_id).subscribe(
			(Rows) => {
				if (Rows[0][0] == undefined) {
					if (Menu_id == 61) {
						localStorage.removeItem("token");
						this.router.navigateByUrl("Home_Page");
					}
				} else if (Rows[0][0].View > 0) {
					if (Menu_id == 65) {
						this.Permissions = Rows[0][0];
						if (this.Permissions == undefined || this.Permissions == null) {
							localStorage.removeItem("token");
							this.router.navigateByUrl("Home_Page");
						}
					}
				}

				if (Menu_id == 38) {
					this.Export_Permission = Rows[0][0];

					if (
						this.Export_Permission != undefined &&
						this.Export_Permission != null
					)
						this.Export_View = this.Export_Permission.View;
					else this.Export_View = true;
				}
			},
			(Rows) => {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
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
		return this.date;
	}
	trackByFn(index, item) {
		return index;
	}
	Edit_Lead(Lead_Id, i) {
		localStorage.setItem("Lead_Id", Lead_Id);

		this.Edit_Page_Permission = Get_Page_Permission(1);
		if (this.Edit_Page_Permission == undefined) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "No permission to view", Type: "2" },
			});
		} else if (this.Edit_Page_Permission.View == true)
			this.router.navigateByUrl("/Leads");
		else {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "No permission to view", Type: "2" },
			});
		}
	}

	Student_View_Click() {
		for (var i = 0; i < this.Student_Data_Search.length; i++) {
			if (this.Select_Student == false)
				this.Student_Data_Search[i].Check_Box_View = true;
			else this.Student_Data_Search[i].Check_Box_View = false;
		}
	}
	New_Followup() {
		var Status = false;
		//debugger 
		for (var m = 0; m < this.Student_Data_Search.length; m++) {
			if (Boolean(this.Student_Data_Search[m].Check_Box_View) == true)
				Status = true;
		}
		if (Status == false) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Student to Transfer", Type: "3" },
			});
			return;
		}
		this.Show_FollowUp = true;
		this.main_View = false;

		// var Full_Transfer_Check_Value = 0;

		// if (this.Full_Transfer_Check == true) Full_Transfer_Check_Value = 1;
		
	}
	Search_Lead_button() {
		this.Black_Start = 1;
		this.Black_Stop = this.Page_Length_;
		this.Red_Start = 1;
		this.Total_Rows = 0;
		this.Red_Stop = this.Page_Length_;
		this.Search_Student_Report();
	}

	Export() {
		this.Student_Service_.exportExcel(
			this.Student_Data_Search,
			"Student_Report"
		);
	}
	
	Focus_It() {
		setTimeout("$('[name=Followup_Status]').focus();", 0);
	}
	

	Search_More_Options() {
		//debugger
		if (this.More_Search_Options == true) 
		{
			this.myInnerHeight=this.myInnerHeighttemp-180;
			this.More_Search_Options = false;
		}
		
		else 
		{
			this.More_Search_Options = true;
			this.myInnerHeight=this.myInnerHeighttemp
		}
		
	}

	Next_Click() {
		if (this.Student_Data_Search.length == this.Page_Length_) {
			this.Black_Start = this.Black_Start + this.Page_Length_;
			this.Black_Stop = this.Black_Stop + this.Page_Length_;
			if (this.missedfollowup_count > 0) {
				this.Red_Start = this.Red_Start + this.missedfollowup_count;
				this.Red_Stop = this.Red_Start + this.Page_Length_;
			}
			this.nextflag = 1;
			if (this.Student_Data_Search.length > 0) {
				this.Search_Student_Report();
			}
		}
	}
	previous_Click() {
		if (this.Black_Start > 1) {
			{
				this.Black_Start = this.Black_Start - this.Page_Length_;
				this.Black_Stop = this.Black_Stop - this.Page_Length_;
			}
			if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
				this.Red_Start = this.Red_Start - this.Page_Length_;
				if (this.Red_Start <= 0) this.Red_Start = 1;
				this.Red_Stop = this.Red_Start + this.Page_Length_;
			}
			this.Total_Rows =
				this.Total_Rows - this.Student_Data_Search.length - this.Page_Length_;
			this.Search_Student_Report();
		}
	}

	
	Close_Click() {
		this.Show_FollowUp = false;
		this.main_View = true;
		this.Select_Student = false;
		this.Select_View = false;
		this.FollowUp_Branch_ = null;
		this.Followup_Users_ = null;
		this.Student_.Next_FollowUp_Date = null;
		this.Student_.Check_Box_View = false;
		this.Select_Student = false;
	}
	




	Student_Data_Dropdowns() {
		this.Student_Data_Service_.Student_Data_Dropdowns().subscribe(
			(Rows) => {

			//debugger
				this.Status_Data = Rows[0].slice();
				this.Status_Temp.Status_Id = 0;
				this.Status_Temp.Status_Name = "All";
				this.Status_Data.unshift(this.Status_Temp);
				this.Status_ = this.Status_Data[0];

				this.Enquiry_Source_Data = Rows[1].slice();
				this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
				this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
				this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
				this.Enquiry_Source_ = this.Enquiry_Source_Data[0];

				this.Branch_Data = Rows[2].slice();
				this.Branch_Temp.Agent_Id = 0;
				this.Branch_Temp.Agent_Name = "All";
				this.Branch_Data.unshift(this.Branch_Temp);
				this.Branch_ = this.Branch_Data[0];

				this.Users_Data = Rows[3].slice();
				this.Users_Temp.Users_Id = 0;
				this.Users_Temp.Users_Name = "All";
				this.Users_Data.unshift(this.Users_Temp);
				this.Users_ = this.Users_Data[0];

				
				this.To_Staff_Data = Rows[3].slice();
				this.To_Staff_Temp.Users_Id = 0;
				this.To_Staff_Temp.Users_Name = "All";
				this.To_Staff_Data.unshift(this.To_Staff_Temp);
				this.To_Staff_ = this.To_Staff_Data[0];

				
			},
			(Rows) => {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}


	Search_Student_Report() {

		//debugger
		var value = 1,enquiry_source_id = 0,User_Id = 0,
			search_name_ = "0",look_In_Date_Value = 0,branch_id = 0,
			To_User_Id = 0,Register_Value = 1,Status_id = 0;

		if (this.Search_By_ != undefined && this.Search_By_ != null)
			if (
				this.Search_By_ != undefined &&
				this.Search_By_ != null &&
				this.Search_By_ != ""
			)
				value = this.Search_By_;

		if (this.Look_In_Date == true) look_In_Date_Value = 1;

		if (
			this.Search_Name != undefined &&
			this.Search_Name != null &&
			this.Search_Name != ""
		)
			search_name_ = this.Search_Name;

		if (this.Users_ != undefined && this.Users_ != null)
			if (
				this.Users_.Users_Id != undefined &&
				this.Users_.Users_Id != null
			)
				User_Id = this.Users_.Users_Id;

		if (this.To_Staff_ != undefined && this.To_Staff_ != null)
			if (
				this.To_Staff_.Users_Id != undefined &&
				this.To_Staff_.Users_Id != null
			)
				To_User_Id = this.To_Staff_.Users_Id;

		

		if (
			this.Enquiry_Source_ != undefined &&
			this.Enquiry_Source_ != null
		)
			if (
				this.Enquiry_Source_.Enquiry_Source_Id != undefined &&
				this.Enquiry_Source_.Enquiry_Source_Id != null
			)
				enquiry_source_id = this.Enquiry_Source_.Enquiry_Source_Id;

		if (this.Branch_ != undefined && this.Branch_ != null)
			if (
				this.Branch_.Agent_Id != undefined &&
				this.Branch_.Agent_Id != null
			)
				branch_id = this.Branch_.Agent_Id;

		if (this.Status_ != undefined && this.Status_ != null)
				if (
					this.Status_.Status_Id != undefined &&
					this.Status_.Status_Id != null
				)
				Status_id = this.Status_.Status_Id;

		if (this.Is_Registered != undefined && this.Is_Registered != null)
			if (
				this.Is_Registered != undefined &&
				this.Is_Registered != null &&
				this.Is_Registered != ""
			)
				Register_Value = this.Is_Registered;

	

		this.issLoading = true;
		//debugger
		this.Student_Data_Service_.Search_Student_Data_Report(
			moment(this.Search_FromDate).format("YYYY-MM-DD"),
			moment(this.Search_ToDate).format("YYYY-MM-DD"),
			value,search_name_,enquiry_source_id,branch_id,
			User_Id,look_In_Date_Value,this.Black_Start,this.Black_Stop,
			this.Login_User,this.Red_Start,this.Red_Stop,
			To_User_Id,Status_id,Register_Value
		).subscribe(
			(Rows) => {
				//debugger
				// log(Rows)
				this.Student_Data_Search = Rows.returnvalue.Leads;
				this.Total_Data = this.Student_Data_Search.length;
				this.missedfollowup_count = 0;
				this.followup_count = 0;

				for (var i = 0; i < this.Student_Data_Search.length; i++) {
					this.Student_Data_Search[i].RowNo = i + 1 + this.Total_Rows;
					if (this.Student_Data_Search[i].tp == 1)
						this.followup_count = this.followup_count + 1;
					if (this.Student_Data_Search[i].tp == 2)
						this.missedfollowup_count = this.missedfollowup_count + 1;
				}

				if (this.Student_Data_Search.length > 0)
					this.Total_Rows = this.Total_Rows + this.Student_Data_Search.length;
				this.issLoading = false;
				if (this.Student_Data_Search.length == 0) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "No Details Found", Type: "3" },
					});
				}
			},
			(Rows) => {
				// log(Rows)
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
				this.issLoading = false;
			}
		);
	}


	Delete_Student() {
		//debugger
		var Status = false;
		for (var m = 0; m < this.Student_Data_Search.length; m++) {
			if (Boolean(this.Student_Data_Search[m].Check_Box_View) == true)
				Status = true;
		}
		if (Status == false) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Students ", Type: "3" },
			});
			return;
		}

		var Student_Deatils = [];
		const dialogRef = this.dialogBox.open(DialogBox_Component, {
			panelClass: "Dialogbox-Class",
			data: {
				Message: "Do you want to delete ?",
				Type: "true",
				Heading: "Confirm",
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			//debugger
			if (result == "Yes") {
				for (var m = 0; m < this.Student_Data_Search.length; m++) {
					if (Boolean(this.Student_Data_Search[m].Check_Box_View) == true) {
						
						Student_Deatils.push({
							Student_Id: this.Student_Data_Search[m].Student_Id,
						});
					}
				}
				this.issLoading = true;
				this.Student_.Delete_Data_Details = Student_Deatils;
				this.Student_Data_Service_.Delete_Student_Report(this.Student_).subscribe(
					(Delete_Status) => {
						//debugger
						this.issLoading = false;
						if (Number(Delete_Status[0][0].Student_Id_J) > 0) {
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Deleted", Type: "false" },
							});
							this.Search_Student_Report();
						}
					},
					(Rows) => {
						this.issLoading = false;

						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
					}
				);
			}
		});
	}


	Save_Student_Report_FollowUp() {
		var Student_Deatils = [];
		//debugger
		var Full_Transfer_Check_Value = 0;

		if (this.Full_Transfer_Check == true) Full_Transfer_Check_Value = 1;

		for (var m = 0; m < this.Student_Data_Search.length; m++) {
			if (Boolean(this.Student_Data_Search[m].Check_Box_View) == true) {
				
				Student_Deatils.push({ Student_Id: this.Student_Data_Search[m].Student_Id });
			}
		}

		if (
			this.FollowUp_Branch_ == null ||
			this.FollowUp_Branch_.Agent_Id == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Branch", Type: "3" },
			});
			return;
		}
		
		if (
			this.Followup_Users_ == null ||
			this.Followup_Users_.Users_Id == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter User", Type: "3" },
			});
			return;
		}

	
		if (Student_Deatils.length == 0) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Please Select Student", Type: "3" },
			});
			return;
		}
	
		{
			this.Student_.Branch = this.FollowUp_Branch_.Agent_Id;
			this.Student_.Branch_Name = this.FollowUp_Branch_.Agent_Name;
			this.Student_.User_Id = this.Followup_Users_.Users_Id;
			this.Student_.User_Name = this.Followup_Users_.Users_Name;
			this.Student_.By_User_Id = parseInt(this.Login_User);
			this.Student_.By_User_Name = this.Login_User_Name;
			this.Student_.Student_Selected_Details = Student_Deatils;

			this.Student_.Full_Transfer_Value = Full_Transfer_Check_Value;


			document.getElementById("Save_Button").hidden = true;
			this.issLoading = true;
//debugger
			this.Student_Data_Service_.Save_Student_Data_FollowUp(
				this.Student_
			).subscribe(
				(Save_status) => {
					//debugger
					this.issLoading = false;

					// log(Save_status[0][0])
					if (Number(Save_status[0][0].Student_Id_) > 0) {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Saved", Type: "false" },
						});

						this.Close_Click();
						this.Search_Student_Report();
						document.getElementById("Save_Button").hidden = false;
					} else {
						this.issLoading = false;
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
						document.getElementById("Save_Button").hidden = false;
					}
				},
				(Rows) => {
					this.issLoading = false;
					document.getElementById("Save_Button").hidden = false;
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Error Occured", Type: "2" },
					});
				}
			);
		}
	}

Search_Branch_User_Typeahead(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;

		if (
			this.FollowUp_Branch_ == null ||
			this.FollowUp_Branch_.Agent_Id == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Branch", Type: "3" },
			});
		} else {
			if (
				this.Followup_Users_Data == undefined ||
				this.Followup_Users_Data.length == 0
			) {
				this.issLoading = true;
				this.Student_Data_Service_.Search_Branch_User_Typeahead(
					this.FollowUp_Branch_.Agent_Id,
					""
				).subscribe(
					(Rows) => {
						if (Rows != null) {
							
							this.Followup_Branch_User_Data = Rows[0];
							
							this.issLoading = false;
						}
					},
					(Rows) => {
						this.issLoading = false;
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
					}
				);
			}
		}
	}
	display_User(User_: Users) {
		if (User_) {
			return User_.Users_Name;
		}
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

	Branch_Change() {
		
		this.Followup_Users_ = null;
		this.Followup_Users_Data = [];
		
	}

}
