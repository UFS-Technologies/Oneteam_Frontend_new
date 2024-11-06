import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student_Service } from "../../../services/Student.service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Users } from "../../../models/Users";
import { Mode } from "../../../models/Mode";
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
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
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
	selector: "app-Fees_Collection_Report",
	templateUrl: "./Fees_Collection_Report.component.html",
	styleUrls: ["./Fees_Collection_Report.component.css"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class Fees_Collection_ReportComponent implements OnInit {
	EditIndex: number;
	Total_Entries: number = 0;
	Total_Amount: number = 0;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	issLoading: boolean;
	Permissions: any;
	Fees_Collection_Report_Edit: boolean;
	Fees_Collection_Report_Save: boolean;
	Fees_Collection_Report_Delete: boolean;
	myInnerHeight: number;
	myTotalHeight: number;
	Export_Permission: any;
	Export_View: boolean = false;
	Edit_Page_Permission: any;
	Mode: Mode = new Mode();
	Mode_Temp: Mode = new Mode();
	Mode_Data: Mode[];
	year: any;
	month: any;
	day: any;
	date: any;
	Entry_View: boolean = true;
	profile_View: boolean = true;

	Is_Date: boolean = true;

	Login_User: number = 0;
	Fees_Collection_Report_EditIndex: number = -1;

	FromDate_: Date = new Date();
	ToDate_: Date = new Date();

	User_Data: Users[];
	User_Data_Filter: Users[];
	User_: Users = new Users();
	User_Temp: Users = new Users();
	datediff: number;

	Fees_Collection_Report_Data: any;
	constructor(
		public Student_Service_: Student_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
		

	) {}
	ngOnInit() {
		this.Login_User = Number(localStorage.getItem("Login_User"));
		this.Permissions = Get_Page_Permission(36);
		this.Export_Permission = Get_Page_Permission(50);
		if (this.Permissions == undefined || this.Permissions == null) {
			localStorage.removeItem("token");
			this.router.navigateByUrl("/auth/login");
		} else {
			this.Fees_Collection_Report_Edit = this.Permissions.Edit;
			this.Fees_Collection_Report_Save = this.Permissions.Save;
			this.Fees_Collection_Report_Delete = this.Permissions.Delete;
			this.Page_Load();
			if (this.Export_Permission != undefined && this.Export_Permission != null)
				this.Export_View = this.Export_Permission.Edit;
		}
	}
	Page_Load() {
		// this.myInnerHeight = (window.innerHeight);
		// this.myInnerHeight = this.myInnerHeight - 200;
		this.Entry_View = false;
		this.FromDate_ = this.New_Date(this.FromDate_);
		this.ToDate_ = this.New_Date(this.ToDate_);
		this.myInnerHeight = window.innerHeight;
		this.myTotalHeight = this.myInnerHeight - 200;
		this.myTotalHeight = this.myTotalHeight - 40;
		this.myInnerHeight = this.myInnerHeight - 220;
		this.Load_Dropdowns();
		this.Search_Fees_Collection_Report();
	}

	Export() {
		this.Student_Service_.exportExcel(
			this.Fees_Collection_Report_Data,
			"Fees Collection Report"
		);
	}
	Load_Dropdowns() {
		this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
			(Rows) => {
				this.Mode_Data = Rows[6];
				this.Mode_Temp.Mode_Id = 0;
				this.Mode_Temp.Mode_Name = "Select";
				this.Mode_Data.unshift(this.Mode_Temp);
				this.Mode = this.Mode_Data[0];
			},
			(Rows) => {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}
	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	}
	isDesktopMenu() {
		if ($(window).width() < 991) {
			return false;
		}
		return true;
	}
	trackByFn(index, item) {
		return index;
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

	Edit_Fees_Collection(Student_Id, i) {
		localStorage.setItem("Student_Id", Student_Id);
		console.log(Student_Id);
		this.Edit_Page_Permission = Get_Page_Permission(14);
		if (this.Edit_Page_Permission == undefined) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "No permission to view", Type: "2" },
			});
		} else if (this.Edit_Page_Permission.View == true)
			// this.router.navigateByUrl('/Stu');
			// window.open('/Student')
			this.goToLink();
		else {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "No permission to view", Type: "2" },
			});
		}
	}

	goToLink() {
		return;
		const url = this.router.serializeUrl(
			this.router.createUrlTree(["/Student"])
		);
		// window.open('/Student');
		window.open(url, "_blank");
	}

	Search_User_Typeahead(event: any) {
		var Value = "";
		if (event.target.value == "") Value = "";
		else Value = event.target.value;
		if (this.User_Data == undefined || this.User_Data.length == 0) {
			this.issLoading = true;
			this.Student_Service_.Search_Users_Typeahead("").subscribe(
				(Rows) => {
					if (Rows != null) {
						this.User_Data = Rows[0];
						this.issLoading = false;

						this.User_Data_Filter = [];

						for (var i = 0; i < this.User_Data.length; i++) {
							if (this.User_Data[i].Users_Name.toLowerCase().includes(Value))
								this.User_Data_Filter.push(this.User_Data[i]);
						}
					}
				},
				(Rows) => {
					this.issLoading = false;
				}
			);
		} else {
			this.User_Data_Filter = [];
			for (var i = 0; i < this.User_Data.length; i++) {
				if (this.User_Data[i].Users_Name.toLowerCase().includes(Value))
					this.User_Data_Filter.push(this.User_Data[i]);
			}
		}
	}
	display_Faculty(Users_: Users) {
		if (Users_) {
			return Users_.Users_Name;
		}
	}
	Search_Fees_Collection_Report() {
		var look_In_Date_Value = 0;
		var User_Id = 0,
			Mode_Id = 0;
		this.Total_Amount = 0;




	

		// if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
		// search_name_ = this.Search_Name;
		if (this.Is_Date == true) look_In_Date_Value = 1;

		if (this.User_ != undefined && this.User_ != null)
			if (this.User_.Users_Id != undefined && this.User_.Users_Id != null)
				User_Id = this.User_.Users_Id;

		if (this.Mode != undefined && this.Mode != null)
			if (this.Mode.Mode_Id != undefined && this.Mode.Mode_Id != null)
				Mode_Id = this.Mode.Mode_Id;
		debugger;
		this.issLoading = true;
		this.Student_Service_.Search_Fees_Collection_Report(
			look_In_Date_Value,
			moment(this.FromDate_).format("YYYY-MM-DD"),
			moment(this.ToDate_).format("YYYY-MM-DD"),
			User_Id,
			this.Login_User,
			Mode_Id
		).subscribe(
			(Rows) => {
				debugger
				this.Fees_Collection_Report_Data = Rows[0];
				//debugger
				for(var i=0;i<this.Fees_Collection_Report_Data.length;i++)
				{
					this.Total_Amount =
						Number(this.Total_Amount) + Number(this.Fees_Collection_Report_Data[i].Amount);
				// if (this.Fees_Collection_Report_Data.length>0){
				// 	 var date1 = new Date(this.Fees_Collection_Report_Data[i].receipt_date); 
				// 	 var date2 = new Date(this.Fees_Collection_Report_Data[i].entrydate); 
				// 	// var date1  = this.New_Date(new Date(moment(this.Fees_Collection_Report_Data[i].receipt_date).format("YYYY-MM-DD")));
				// 	// var date2  = this.New_Date(new Date(moment(this.Fees_Collection_Report_Data[i].entrydate).format("YYYY-MM-DD")));

				// //debugger
				// 	var Time = date2.getTime() - date1.getTime(); 
				// 	var Days = Time / (1000 * 3600 * 24); 
                //     var ldate=  Math.round(Days)
					
				
					

				// }

			// 	if(ldate==0)
			// 	{
			// 		 this.datediff = 1
			// 	}
			// else 
			// {
			// 	 this.datediff = 2
			// }
			// //debugger
			//  this.Fees_Collection_Report_Data[i].Date_Difference= this.datediff; 
		}

				var fees_amount = Rows[0];
//debugger
				
				this.Total_Entries = this.Fees_Collection_Report_Data.length;


			




				// for (var i = 0; i < fees_amount.length; i++) {
				// 	this.Total_Amount =
				// 		Number(this.Total_Amount) + Number(fees_amount[i].Amount);
				// }
				this.issLoading = false;
				if (this.Fees_Collection_Report_Data.length == 0) {
					this.issLoading = false;
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "No Details Found", Type: "3" },
					});
				}
				this.issLoading = false;
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
