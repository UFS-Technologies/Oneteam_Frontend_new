import { Component, OnInit, Input, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.js";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { AnimationKeyframesSequenceMetadata } from "@angular/animations";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

@Injectable({
	providedIn: "root",
})
export class Student_Service {
	constructor(private http: HttpClient) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
		};
	}
	AnimationKeyframesSequenceMetadata;
	// Save_Student(Student_)
	// {
	// return this.http.post(environment.BasePath +'Student/Save_Student/',Student_);
	// }
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}
	fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

	fileExtension = ".xlsx";
	public exportExcel(jsonData: any[], fileName: string): void {
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
		const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer: any = XLSX.write(wb, {
			bookType: "xlsx",
			type: "array",
		});
		this.saveExcelFile(excelBuffer, fileName);
	}
	private saveExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: this.fileType });
		FileSaver.saveAs(data, fileName + this.fileExtension);
	}
	Save_Student(Main_Array, ImageFile_Photo: File[],ImageFile_Photo1: File[],ImageFile_Photo2:File[],Document_File_Array1:any[] ) {
		const postData = new FormData();
debugger
		if (Main_Array.Student != null) {
			postData.append("Student_Id_Student", Main_Array.Student.Student_Id);
			postData.append("Student_Name", Main_Array.Student.Student_Name);
			postData.append("Address1", Main_Array.Student.Address1);
			postData.append("Address2", Main_Array.Student.Address2);
			postData.append("Address3", Main_Array.Student.Address3);
			postData.append("Address4", Main_Array.Student.Address4);
			postData.append("Pincode", Main_Array.Student.Pincode);
			postData.append("Phone", Main_Array.Student.Phone);
			postData.append("Mobile", Main_Array.Student.Mobile);
			postData.append("Whatsapp", Main_Array.Student.Whatsapp);
			postData.append("DOB", Main_Array.Student.DOB);
			postData.append("Gender", Main_Array.Student.Gender);
			postData.append("Email", Main_Array.Student.Email);
			postData.append(
				"Alternative_Email",
				Main_Array.Student.Alternative_Email
			);
			postData.append("Passport_No", Main_Array.Student.Passport_No);
			postData.append("Passport_Expiry", Main_Array.Student.Passport_Expiry);
			postData.append("User_Name", Main_Array.Student.User_Name);
			postData.append("Password", Main_Array.Student.Password);
			postData.append("Photo", Main_Array.Student.Photo);
			postData.append("User_Id", Main_Array.Student.User_Id);
			postData.append("Registration_No", Main_Array.Student.Registration_No);
			postData.append("Role_No", Main_Array.Student.Role_No);
			postData.append("Resume", Main_Array.Student.Resume);
			postData.append("Enquiry_Source", Main_Array.Student.Enquiry_Source);
			postData.append("Enquiry_Source_Name", Main_Array.Student.Enquiry_Source_Name);
			postData.append("State_Id", Main_Array.Student.State_Id);
			postData.append("District_Id", Main_Array.Student.District_Id);
			postData.append("Course_Id", Main_Array.Student.Course_Id);
			postData.append("Qualification_Id", Main_Array.Student.Qualification_Id);
			postData.append("District_Name", Main_Array.Student.District_Name);
			postData.append("Course_Name", Main_Array.Student.Course_Name);
			postData.append(
				"Qualification_Name",
				Main_Array.Student.Qualification_Name
			);
			postData.append("College_Name", Main_Array.Student.College_Name);
			//debugger
			postData.append("Year_Of_Pass_Id", Main_Array.Student.Year_Of_Pass_Id);
			postData.append("Year_Of_Passing", Main_Array.Student.Year_Of_Passing);
			postData.append("Id_Proof_Id", Main_Array.Student.Id_Proof_Id);
			postData.append("Id_Proof_Name", Main_Array.Student.Id_Proof_Name);
			postData.append("Id_Proof_No", Main_Array.Student.Id_Proof_No);
			postData.append("Id_Proof_File", Main_Array.Student.Id_Proof_File);
			postData.append("Id_Proof_FileName", Main_Array.Student.Id_Proof_FileName);

			postData.append("Parent_spouse_name", Main_Array.Student.Parent_spouse_name);
			postData.append("Parent_spouse_contact_no", Main_Array.Student.Parent_spouse_contact_no);
			postData.append("Parent_spouse_idcard", Main_Array.Student.Parent_spouse_idcard);
			postData.append("Offline_class_preference", Main_Array.Student.Offline_class_preference);

			// postData.append("Resume_Status_Id", Main_Array.Student.Resume_Status_Id);
			// postData.append("Resume_Status_Name", Main_Array.Student.Resume_Status_Name);

		}

		if (Main_Array.Followup != null) {
			postData.append(
				"Student_Followup_Id",
				Main_Array.Followup.Student_Followup_Id
			);
			postData.append("Student_Id", Main_Array.Followup.Student_Id);
			postData.append("Entry_Date", Main_Array.Followup.Entry_Date);
			postData.append(
				"Next_FollowUp_Date",
				Main_Array.Followup.Next_FollowUp_Date
			);
			postData.append(
				"FollowUp_Difference",
				Main_Array.Followup.FollowUp_Difference
			);
			postData.append("Status", Main_Array.Followup.Status);
			postData.append("By_User_Id", Main_Array.Followup.By_User_Id);
			postData.append("To_User_Id", Main_Array.Followup.To_User_Id);
			postData.append("Remark", Main_Array.Followup.Remark);
			postData.append("Remark_Id", Main_Array.Followup.Remark_Id);
			postData.append("FollowUp_Type", Main_Array.Followup.FollowUp_Type);
			postData.append("FollowUP_Time", Main_Array.Followup.FollowUP_Time);
			postData.append(
				"Actual_FollowUp_Date",
				Main_Array.Followup.Actual_FollowUp_Date
			);
			postData.append("FollowUp", Main_Array.Followup.FollowUp);
			postData.append("Status_Name", Main_Array.Followup.Status_Name);
			postData.append("To_User_Name", Main_Array.Followup.To_User_Name);
			postData.append("By_User_Name", Main_Array.Followup.By_User_Name);
		}
		var i = 0;
		if (ImageFile_Photo != undefined) {
			for (const img of ImageFile_Photo) {
				postData.append("myFile", img);
				postData.append("ImageFile_Photo", i.toString());
				i = i + 1;
			}
		}
debugger
		if (ImageFile_Photo1 != undefined) {

            for (const img of ImageFile_Photo1) {
                postData.append("myFile", img);
                postData.append("ImageFile_Photo1", i.toString());
                i = i + 1;
            }
        }

		if (ImageFile_Photo2 != undefined) {
			for (const img of ImageFile_Photo2) {
				postData.append("myFile", img);
				postData.append("ImageFile_Photo2", i.toString());
				i = i + 1;
			}
		}


		postData.append("Document_File_Array1", i.toString());
		if (Document_File_Array1 != undefined) {
			var j = 0;
			for (const img of Document_File_Array1) {
			if (Document_File_Array1[j].New_Entry == 1) {
				postData.append("myFile", img);
			}
			j++;
			i = i + 1;
			}
		}
		
		return this.http.post(
			environment.BasePath + "Student/Save_Student",
			postData
		);
	}


Upload_Resume(
	Student_,
	ResumeImageFilename: File[],
	Document_File_Array:any[] 
  ) {
	const postData = new FormData();
	//debugger
	  postData.append("Student_Id", Student_.Student_Id);
	  postData.append("Resume", Student_.Resume); 
	var i = 0;    
	//debugger
  
	if (ResumeImageFilename != undefined) {
		for (const img of ResumeImageFilename) {
		  postData.append("myFile", img);
		  postData.append("ResumeImageFilename", i.toString());
		  i = i + 1;
		}
	  }
	postData.append("Document_File_Array", i.toString());
	if (Document_File_Array != undefined) {
	  var j = 0;
	  for (const img of Document_File_Array) {
		if (Document_File_Array[j].New_Entry == 1) {
		  postData.append("myFile", img);
		}
		j++;
		i = i + 1;
	  }
	}
	return this.http.post(environment.BasePath + "Student/Upload_Resume", postData);
  }


	Search_Student(
		Search_FromDate,
		Search_ToDate,
		Search_Name,
		By_User_,
		Status_Id_,
		Look_In_Date,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount_,
		RowCount2_,
		Register_Value,
		Qualification_Id,
		Course_Id
	): Observable<any> {
		debugger
		var Search_Data = {
			From_Date_: Search_FromDate,
			To_Date_: Search_ToDate,
			SearchbyName_: Search_Name,
			By_User_: By_User_,
			Status_Id_: Status_Id_,
			Is_Date_Check_: Look_In_Date,
			Page_Index1_: Page_Index1_,
			Page_Index2_: Page_Index2_,
			Login_User_Id_: Login_User_Id_,
			RowCount: RowCount_,
			RowCount2: RowCount2_,
			Register_Value: Register_Value,
			Qualification_Id: Qualification_Id,
			Course_Id: Course_Id,
		};
		return this.http.get(environment.BasePath + "Student/Search_Student/", {
			params: Search_Data,
		});
	}
	Delete_Student(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Delete_Student/" + Student_Id
		);
	}
	Get_Student(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Student/" + Student_Id
		);
	}


	Search_Batch_Report(
        Is_Date_,
        From_Date_,
        To_Date_,
        Batch_,
        Faculty_,
        User_Id_,Branch_Id_
    ): Observable<any> {
        var Search_Data = {
            Is_Date_: Is_Date_,
            From_Date_: From_Date_,
            To_Date_: To_Date_,
            Batch_: Batch_,
            Faculty_: Faculty_,
            User_Id_: User_Id_,
			Branch_Id_:Branch_Id_,
        };
        return this.http.get(
            environment.BasePath + "Student/Search_Batch_Report/",
            { params: Search_Data }
        );
    }

	Search_Status_Typeahead(Status_Name, Group_Id): Observable<any> {
		var Search_Data = { Status_Name: Status_Name, Group_Id: Group_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Status_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Users_Typeahead(Users_Name): Observable<any> {
		var Search_Data = { Users_Name: Users_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Users_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Faculty_Typeahead(Users_Name,Role_Type): Observable<any> {
		var Search_Data = { Users_Name: Users_Name,Role_Type:Role_Type };
		return this.http.get(
			environment.BasePath + "Student/Search_Faculty_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Typeahead_Loadfaculty(Users_Name): Observable<any> {
		var Search_Data = { Users_Name: Users_Name};
		return this.http.get(
			environment.BasePath + "Student/Search_Typeahead_Loadfaculty/",
			{ params: Search_Data }
		);
	}
	Load_Year_of_Pass(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Year_of_Pass/");
	}

	Load_Gender(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Gender/");
	}

	Load_Id_Proof(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Id_Proof/");
	}

	Load_Attendance_Status(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Attendance_Status/"
		);
	}

	Load_Enquiry_Source(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Enquiry_Source/");
	}

	Load_Resume_Status(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Resume_Status/");
	}
	Load_State(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_State/");
	}
	Load_Qualification(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Qualification/");
	}
	Search_State_District_Typeahead(District_Name, State_Id): Observable<any> {
		var Search_Data = { District_Name: District_Name, State_Id: State_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_State_District_Typeahead/",
			{ params: Search_Data }
		);
	}
	Load_Student_Search_Dropdowns(Group_Id) {
		return this.http.get(
			environment.BasePath + "Student/Load_Student_Search_Dropdowns/" + Group_Id
		);
	}
	Get_Last_Followup(Users_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Last_Followup/" + Users_Id
		);
	}
	Get_FollowUp_Details(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_FollowUp_Details/" + Student_Id
		);
	}
	Followup_History(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_FollowUp_History/" + Student_Id
		);
	}
	Register_Student(Student_Id, User_Id,Student_Name,Course_Name) {
		//debugger
		return this.http.get(
			environment.BasePath +
				"Student/Register_Student/" +
				Student_Id +
				"/" +
				User_Id +
				"/" +
				Student_Name+
				"/" +
				Course_Name
		);
	}
	Remove_Registration(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Remove_Registration/" + Student_Id
		);
	}
	Send_Sms(Mobile_, Sms) {
		return this.http.get(
			environment.BasePath + "Student/Send_Sms/" + Mobile_ + "/" + Sms
		);
	}

	Send_course_Email(Mobile_, Email_, Sms, Student_Name, Course_Name) {
		return this.http.get(
			environment.BasePath +
				"Student/Send_course_Email/" +
				Mobile_ +
				"/" +
				Email_ +
				"/" +
				Sms +
				"/" +
				Student_Name +
				"/" +
				Course_Name
		);
	}

	Send_Receipt_Sms_Email(
		Mobile_,
		Email_,
		Sms,
		Student_Name,
		Amount_,
		Date_,
		Total_Amount_,
		Instalment_Date_,
		BalanceAmount_
	) {
		//debugger
		return this.http.get(
			environment.BasePath +
				"Student/Send_Receipt_Sms_Email/" +
				Mobile_ +
				"/" +
				Email_ +
				"/" +
				Sms +
				"/" +
				Student_Name +
				"/" +
				Amount_ +
				"/" +
				Date_ +
				"/" +
				Total_Amount_ +
				"/" +
				Instalment_Date_ +
				"/" +
				BalanceAmount_
		);
	}
	Send_Sms_Email(Mobile_, Email_, Sms,Student_Name,User_Mobile,Login_User_Name) {
		//debugger
		return this.http.get(
			environment.BasePath +
				"Student/Send_Sms_Email/" +
				Mobile_ +"/" +Email_ +"/" +Sms +"/" +Student_Name +"/" +User_Mobile+"/" +Login_User_Name
		);
	}

	// Send_Sms_Email(Mobile_, Email_,Sms,Student_Name,Login_User_Name,User_Mobile): Observable<any> {
	// 	//debugger
	// 	var Search_Data = { Mobile_: Mobile_, Email_: Email_, Sms: Sms , Student_Name: Student_Name,Login_User_Name: Login_User_Name,User_Mobile: User_Mobile};
	// 	return this.http.get(
	// 		environment.BasePath + "Student/Send_Sms_Email/",
	// 		{ params: Search_Data }
	// 	);
	// }

	
	Search_Course_Typeahead(Course_Name): Observable<any> {
		var Search_Data = { Course_Name: Course_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Course_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Company_Typeahead(Company_Name): Observable<any> {
		var Search_Data = { Company_Name: Company_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Company_Typeahead/",
			{ params: Search_Data }
		);
	}


	Search_Team_Member_Typeahead(Users_Name): Observable<any> {
		var Search_Data = { Users_Name: Users_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Team_Member_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_District_Typeahead(District_Name): Observable<any> {
		var Search_Data = { District_Name: District_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_District_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead(Batch_Name): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead_Report(Batch_Name,Login_User): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name,Login_User:Login_User };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_Report/",
			{ params: Search_Data }
		);
	}
	Search_Batch_Typeahead_Report_New(Batch_Name,Login_User,Trainer): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name,Login_User:Login_User,Trainer:Trainer };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_Report_New/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead_Report_New1(Batch_Name,Login_User,Trainer): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name,Login_User:Login_User,Trainer:Trainer };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_Report_New1/",
			{ params: Search_Data }
		);
	}



	Search_Batch_Typeahead_1(Batch_Name, Course_Id): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name, Course_Id: Course_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_1/",
			{ params: Search_Data }
		);
	}


	Search_Batch_Typeahead_Attendance(Batch_Name, Course_Id,Login_User): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name, Course_Id: Course_Id,Login_User: Login_User };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_Attendance/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead_Attendance1(Batch_Name, Course_Id,Login_User): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name, Course_Id: Course_Id,Login_User: Login_User };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_Attendance1/",
			{ params: Search_Data }
		);
	}



	Search_Batch_Typeahead_2(Batch_Name, Course_Id): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name, Course_Id: Course_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_2/",
			{ params: Search_Data }
		);
	}

	Get_Course_Student(Course_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Course_Student/" + Course_Id
		);
	}
	Get_Student_Course(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Student_Course/" + Student_Id
		);
	}
	Get_Student_Course_Click(Student_Id, Course_Id, Fees_Type_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_Course_Click/" +
				Student_Id +
				"/" +
				Course_Id +
				"/" +
				Fees_Type_Id
		);
	}
	Save_Student_Course(Student_Course_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Student_Course/",
			Student_Course_
		);
	}
	Search_Subject_Course_Typeahead(Subject_Name, Course_Id): Observable<any> {
		var Search_Data = { Subject_Name: Subject_Name, Course_Id: Course_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Subject_Course_Typeahead/",
			{ params: Search_Data }
		);
	}

	Get_Installment_Details(Installment_Type_Id, Course_Id,Student_Course_Id,Student_Id): Observable<any> {
		var Search_Data = {
			Installment_Type_Id: Installment_Type_Id,
			Course_Id: Course_Id,
			Student_Course_Id:Student_Course_Id,
			Student_Id:Student_Id,
		};
		return this.http.get(
			environment.BasePath + "Student/Get_Installment_Details/",
			{ params: Search_Data }
		);
	}

	Load_Exam_Status() {
		return this.http.get(environment.BasePath + "Student/Load_Exam_Status/");
	}
	Save_Mark_List_Master(Mark_List_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Mark_List_Master/",
			Mark_List_Master_
		);
	}
	Get_Student_Mark_List(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Student_Mark_List/" + Student_Id
		);
	}
	Load_Mode(): Observable<any> {
		return this.http.get(environment.BasePath + "Agent/Load_Mode/");
	}


	Load_Laptopdetails(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Laptopdetails/");
	}


	Load_Installment_Type(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Installment_Type/"
		);
	}
	Accounts_Typeahead(
		Account_Group_Id_,
		Client_Accounts_Name_
	): Observable<any> {
		var Search_Data = {
			Account_Group_Id_: Account_Group_Id_,
			Client_Accounts_Name_: Client_Accounts_Name_,
		};
		return this.http.get(environment.BasePath + "Agent/Accounts_Typeahead/", {
			params: Search_Data,
		});
	}
	// Save_Student_Receipt_Voucher(Receipt_Voucher_) {
	// 	return this.http.post(
	// 		environment.BasePath + "Student/Save_Student_Receipt_Voucher/",
	// 		Receipt_Voucher_
	// 	);
	// }
	Get_Student_Receipt_History(Student_Id_, Course_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_Receipt_History/" +
				Student_Id_ +
				"/" +
				Course_Id_
		);
	}

	Get_Attendance_Details(Student_Id_, Course_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Attendance_Details/" +
				Student_Id_ +
				"/" +
				Course_Id_
		);
	}

	Get_Student_Receipt_Image(Receipt_Voucher_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_Receipt_Image/" +
				Receipt_Voucher_Id 
		);
	}


	Delete_Receipt_Voucher(Receipt_Voucher_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Delete_Student_Receipt_Voucher/" +
				Receipt_Voucher_Id
		);
	}

	Save_Attendance(Attendance_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Attendance/",
			Attendance_Master_
		);
	}
	Search_Attendance(Course_, Batch_, Faculty_): Observable<any> {
		var Search_Data = { Course_: Course_, Batch_: Batch_, Faculty_: Faculty_ };
		return this.http.get(environment.BasePath + "Student/Search_Attendance/", {
			params: Search_Data,
		});
	}
	Search_Attendance_Report(
		From_Date_,
		To_Date_,
		Faculty_Id_,
		Course_,
		Batch_,
		Attendance_Status_Id,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Faculty_Id_: Faculty_Id_,
			Course_: Course_,
			Batch_: Batch_,
			Attendance_Status_Id: Attendance_Status_Id,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Attendance_Report/",
			{ params: Search_Data }
		);
	}



	Search_Fees_Outstanding_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Batch_,
		Search_Name,
		User_Id_,
		teammember_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Batch_: Batch_,
			SearchbyName_: Search_Name,
			User_Id_: User_Id_,
			teammember_:teammember_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Outstanding_Report/",
			{ params: Search_Data }
		);
	}
	Search_Fees_Collection_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Login_User_,
		Mode_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Login_User_: Login_User_,
			Mode_: Mode_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Collection_Report/",
			{ params: Search_Data }
		);
	}
	Search_Admission_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Login_User_Id_,
		Course_Id_,
		Enquiry_Source_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Login_User_Id_: Login_User_Id_,
			Course_Id_:Course_Id_,
			Enquiry_Source_Id_:Enquiry_Source_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Admission_Report/",
			{ params: Search_Data }
		);
	}
	Search_Lead_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Enquiry_Source_,
		Login_User_,
		User_Id_,
		status_,
		Course_Id_,Register_Value_,Branch_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Enquiry_Source_: Enquiry_Source_,
			Login_User_: Login_User_,
			User_Id_: User_Id_,
			status_: status_,
			Course_Id_: Course_Id_,
			Register_Value_:Register_Value_,
			Branch_Id_:Branch_Id_
		};
		return this.http.get(environment.BasePath + "Student/Search_Lead_Report/", {
			params: Search_Data,
		});
	}
	Search_Followup_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Enquiry_Source_,
		Login_User_,
		User_Id_,
		status_,
		Course_Id_,Register_Value_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Enquiry_Source_: Enquiry_Source_,
			Login_User_: Login_User_,
			User_Id_: User_Id_,
			status_: status_,
			Course_Id_: Course_Id_,
			Register_Value_:Register_Value_
		};
		return this.http.get(environment.BasePath + "Student/Search_Followup_Report/", {
			params: Search_Data,
		});
	}
	Search_Conversion_Report(
		Is_Date_,
		To_Date_,
		Login_User_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			To_Date_: To_Date_,
			Login_User_: Login_User_,
			User_Id_: User_Id_,

		};
		return this.http.get(environment.BasePath + "Student/Search_Conversion_Report/", {
			params: Search_Data,
		});
	}

	Search_Conversion_Report_loginuser(
		Is_Date_,
		To_Date_,
		Login_User_,
	
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			To_Date_: To_Date_,
			Login_User_: Login_User_,
			
		};
		return this.http.get(environment.BasePath + "Student/Search_Conversion_Report_loginuser/", {
			params: Search_Data,
		});
	}


	Save_Transaction(Transaction_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Transaction/",
			Transaction_Master_
		);
	}
	Search_Transaction(Course_, Portion_Covered_): Observable<any> {
		var Search_Data = { Course_: Course_, Portion_Covered_: Portion_Covered_ };
		return this.http.get(environment.BasePath + "Student/Search_Transaction/", {
			params: Search_Data,
		});
	}
	Save_Interview(Interview_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Interview/",
			Interview_Master_
		);
	}
	Search_Interview(Is_Date_, From_Date_, To_Date_, Course_): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Search_Interview/", {
			params: Search_Data,
		});
	}
	Save_Placed(Placed_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Placed/",
			Placed_Master_
		);
	}
	Search_Placed(Is_Date_, From_Date_, To_Date_, Course_): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Search_Placed/", {
			params: Search_Data,
		});
	}
	Search_Placed_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Report/",
			{ params: Search_Data }
		);
	}
	Search_Interview_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Report/",
			{ params: Search_Data }
		);
	}
	Search_Transaction_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Report/",
			{ params: Search_Data }
		);
	}
	Get_Dashboard_Count(Login_User_Id_): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Get_Dashboard_Count/" + Login_User_Id_
		);
	}
	Search_Registration_Report(
		Search_FromDate,
		Search_ToDate,
		value,
		Search_Name,
		Status_Id,
		User_Id,
		Look_In_Date,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount_,
		RowCount2_,
		Course_Id_,
		Enquiry_Source_Id_
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Search_Registration_Report/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				value +
				"/" +
				Search_Name +
				"/" +
				Status_Id +
				"/" +
				User_Id +
				"/" +
				Look_In_Date +
				"/" +
				Page_Index1_ +
				"/" +
				Page_Index2_ +
				"/" +
				Login_User_Id_ +
				"/" +
				RowCount_ +
				"/" +
				RowCount2_ +
				"/" +
				Course_Id_ +
				"/" +
				Enquiry_Source_Id_
		);
	}
	Search_Attendance_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Batch_,
		Faculty_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Batch_: Batch_,
			Faculty_: Faculty_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Attendance_Student/",
			{ params: Search_Data }
		);
	}
	Get_Attendance(
		Attendance_Master_Id_,
		Course_,
		Batch_,
		Faculty_Id_
	): Observable<any> {
		var Search_Data = {
			Attendance_Master_Id_: Attendance_Master_Id_,
			Course_: Course_,
			Batch_: Batch_,
			Faculty_: Faculty_Id_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Attendance/", {
			params: Search_Data,
		});
	}

	Search_Transaction_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_,
		Employer_Details_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
			Employer_Details_Id_: Employer_Details_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Student/",
			{ params: Search_Data }
		);
	}
	Get_Transaction(Transaction_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Transaction_Master_Id_: Transaction_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Transaction/", {
			params: Search_Data,
		});
	}
	Search_Interview_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_,
		Employer_Details_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
			Employer_Details_Id_: Employer_Details_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Student/",
			{ params: Search_Data }
		);
	}
	Get_Interview(Interview_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Interview_Master_Id_: Interview_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Interview/", {
			params: Search_Data,
		});
	}
	Search_Placed_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Student/",
			{ params: Search_Data }
		);
	}
	Get_Placed(Placed_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Placed_Master_Id_: Placed_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Placed/", {
			params: Search_Data,
		});
	}
	Load_Employer_Details(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Employer_Details/"
		);
	}
	Pending_FollowUp(User_Id, Login_User): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Pending_FollowUp/" +
				User_Id +
				"/" +
				Login_User
		);
	}
	FollowUp_Summary(User_Id, Login_User_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/FollowUp_Summary/" +
				User_Id +
				"/" +
				Login_User_
		);
	}


	


	
	Get_Lead_Load_Data(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Get_Lead_Load_Data1/");
	}

	// Get_Menu_Status(Menu_Id_, Login_User_) {
	// 	return this.http.get(
	// 		environment.BasePath +
	// 			"Student/Get_Menu_Status/" +
	// 			Menu_Id_ +
	// 			"/" +
	// 			Login_User_
	// 	);
	// }

	Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
 }
	Get_Lead_Load_Data_ByUser(Login_User): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Get_Lead_Load_Data_ByUser/" + Login_User
		);
	}
	Get_Course_Details_Student_Check(Student_Id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Course_Details_Student_Check/" +
				Student_Id_
		);
	}
	Search_Fees_Due_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Batch_,
		Search_Name,
		User_Id_,
		teammember_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Batch_: Batch_,
			SearchbyName_: Search_Name,
			User_Id_: User_Id_,
			teammember_:teammember_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Due_Report/",
			{ params: Search_Data }
		);
	}


	Search_DropOut_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		ToStaff_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			ToStaff_: ToStaff_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_DropOut_Report/",
			{ params: Search_Data }
		);
	}


	Load_Interview_Student(Transaction_Master_id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Load_Interview_Student/" +
				Transaction_Master_id_
		);
	}
	Load_Placement_Student(Interview_Master_Id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Load_Placement_Student/" +
				Interview_Master_Id_
		);
	}
	Get_Load_Dropdowns_Data(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Get_Load_Dropdowns_Data/"
		);
	}

	
	Search_Transaction_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Search_Interview_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Search_Placed_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Save_Student_Report_FollowUp(Student_Followup_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Student_Report_FollowUp/",
			Student_Followup_
		);
	}
	Get_Agentdetails_print(User_Id_) {
		return this.http.get(
			environment.BasePath + "Agent/Get_Agentdetails_print/" + User_Id_
		);
	}

	Get_Companydetails() {
		return this.http.get(environment.BasePath + "Company/Get_Companydetails/");
	}

	// Activate_Application(Application_details_Id, Student_Id): Observable<any> {
	// 	var Search_Data = {
	// 		Application_details_Id_: Application_details_Id,
	// 		Student_Id_: Student_Id,
	// 	};
	// 	return this.http.get(
	// 		environment.BasePath + "Student/Activate_Application/",
	// 		{ params: Search_Data }
	// 	);
	// }

	Enable_Student_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Enable_Student_Status/" +
				Student_Id_
		);
	}

	Disable_Student_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Disable_Student_Status/" +
				Student_Id_
		);
	}

	Activate_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Activate_Status/" +
				Student_Id_
		);
	}

	Deactivate_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Deactivate_Status/" +
				Student_Id_
		);
	}



	Moveto_Blacklist_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Moveto_Blacklist_Status/" +
				Student_Id_
		);
	}

	Remove_Blacklist_Status(Student_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Remove_Blacklist_Status/" +
				Student_Id_
		);
	}


//     Update_Resume_Status(Resume_Status_Id_,Resume_Status_Name_,Student_Id_): Observable<any> 
// {   //debugger
//     var Search_Data = {'Resume_Status_Id_': Resume_Status_Id_, 'Resume_Status_Name_': Resume_Status_Name_,'Student_Id_': Student_Id_
//     }
//     return this.http.get(environment.BasePath + 'Student/Update_Resume_Status/', { params: Search_Data });
// }


Update_Resume_Status(Resume_Status_Change_) {
	debugger
    return this.http.post(
        environment.BasePath + "Job_Posting/Update_Resume_Status/",
        Resume_Status_Change_
    );
}


// Register_Whatsapp(Register_Whatsapp_)
//     {
// 		const headers = new HttpHeaders({'Api-Key': '0ea03cd8-169f-4f50-8254-94f50dbcfdaa','Content-Type': 'application/json' })
//         debugger
//     return this.http.post( 'https://api.telinfy.net/gaca/whatsapp/templates/message',Register_Whatsapp_,{
// 		headers});
// 	}



Register_Whatsapp(Register_Whatsapp_)
{

	debugger
return this.http.post(environment.BasePath +'Student/Register_Whatsapp/',Register_Whatsapp_);
}

Save_Student_Whatsapp(Save_Whatsapp_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Student_Whatsapp/',Save_Whatsapp_);
}

// api_brochure_course_whatsapp(Save_Whatsapp_)
// {
// 	debugger 
// return this.http.post(environment.BasePath +'Student/api_brochure_course_whatsapp/',Save_Whatsapp_);
// }


api_brochure_python_arjun_jan2025(Save_Whatsapp_)
{
	debugger 
return this.http.post(environment.BasePath +'Student/api_brochure_python_arjun_jan2025/',Save_Whatsapp_);
}

api_dm_brochure_arjun_jan2025(Save_Whatsapp_)
{
	debugger 
return this.http.post(environment.BasePath +'Student/api_dm_brochure_arjun_jan2025/',Save_Whatsapp_);
}

api_brochure_mernstack_arjun_jan2025(Save_Whatsapp_)
{
	debugger 
return this.http.post(environment.BasePath +'Student/api_brochure_mernstack_arjun_jan2025/',Save_Whatsapp_);
}

api_brochure_softwaretesting_arjun_jan2025(Save_Whatsapp_)
{
	debugger 
return this.http.post(environment.BasePath +'Student/api_brochure_softwaretesting_arjun_jan2025/',Save_Whatsapp_);
}


Get_ToStaff_Mobile(userid) {
debugger
return this.http.get(environment.BasePath + "Student/Get_ToStaff_Mobile/" + userid);
}


Save_Python_Course_Whatsapp(Python_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Save_Python_Course_Whatsapp/',Python_Whatsapp_);
}

Save_Dm_Course_Whatsapp(Dm_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Save_Dm_Course_Whatsapp/',Dm_Whatsapp_);
}
Save_Test_Course_Whatsapp(Testing_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Save_Test_Course_Whatsapp/',Testing_Whatsapp_);
}


Python_Fees_Whatsapp(Python_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Python_Fees_Whatsapp/',Python_Whatsapp_);
}

Dm_Fees_Whatsapp(Dm_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Dm_Fees_Whatsapp/',Dm_Whatsapp_);
}
Testing_Fees_Whatsapp(Testing_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Testing_Fees_Whatsapp/',Testing_Whatsapp_);
}

Fees_Payment_Whatsapp(Fees_Whatsapp_)
{
return this.http.post(environment.BasePath +'Student/Fees_Payment_Whatsapp/',Fees_Whatsapp_);
}




Send_Resume_Notification(Phone,Sms) {
	debugger
	return this.http.get(
		environment.BasePath +
			"Student/Send_Resume_Notification/" +
			Phone +"/" +Sms 
	);
}



// Send_Resume_Upload_Notification(Student_Name_) {
// 	debugger
// 	return this.http.get(
// 		environment.BasePath +
// 			"Student/Send_Resume_Upload_Notification/" +
// 			Student_Name_ 
// 	);
// }


Save_Student_Receipt_Voucher(Receipt_Voucher_,ReceiptImageFile_Photo1: File[],Document_File_Array2:any[] ) {
	const postData = new FormData();
debugger
	if (Receipt_Voucher_ != null) {
			postData.append("Receipt_Voucher_Id", Receipt_Voucher_.Receipt_Voucher_Id);
			postData.append("Date",Receipt_Voucher_.Date);
			postData.append("From_Account_Id", Receipt_Voucher_.From_Account_Id);
			postData.append("Amount", Receipt_Voucher_.Amount);
			postData.append("Payment_Mode", Receipt_Voucher_.Payment_Mode);
			postData.append("User_Id", Receipt_Voucher_.User_Id);
			postData.append("Payment_Status", Receipt_Voucher_.Payment_Status);
			postData.append("To_Account_Id", Receipt_Voucher_.To_Account_Id);
			postData.append("To_Account_Name", Receipt_Voucher_.To_Account_Name);
			postData.append("Description", Receipt_Voucher_.Description);
			postData.append("Student_Fees_Installment_Details_Id", Receipt_Voucher_.Student_Fees_Installment_Details_Id);
			postData.append("Student_Course_Id", Receipt_Voucher_.Student_Course_Id);
			postData.append("Fees_Type_Id", Receipt_Voucher_.Fees_Type_Id);
			postData.append("Tax_Percentage", Receipt_Voucher_.Tax_Percentage);
			postData.append("Course_Id", Receipt_Voucher_.Course_Id);
			postData.append("Receipt_Image_File", Receipt_Voucher_.Receipt_Image_File);
			postData.append("Receipt_Image_File_Name", Receipt_Voucher_.Receipt_Image_File_Name);

			// postData.append("Voucher_No", Receipt_Voucher_.Voucher_No);
			// postData.append("Bill_No", Receipt_Voucher_.Bill_No);
			// postData.append("Sales_Master_Id", Receipt_Voucher_.Sales_Master_Id);
			// postData.append("Address1", Receipt_Voucher_.Address1);
			// postData.append("FromAccount_Name", Receipt_Voucher_.FromAccount_Name);
			// postData.append("User_Name", Receipt_Voucher_.User_Name);
			// postData.append("ToAccount_Name", Receipt_Voucher_.ToAccount_Name);
			// postData.append("Center_Code", Receipt_Voucher_.Center_Code);
			// postData.append("Tax", Receipt_Voucher_.Tax);
			// postData.append("Search_Date", Receipt_Voucher_.Search_Date);
			// postData.append("Company_Name", Receipt_Voucher_.Company_Name);
			// postData.append("Address2", Receipt_Voucher_.Address2);
			// postData.append("Address3", Receipt_Voucher_.Address3);
			// postData.append("PinCode", Receipt_Voucher_.PinCode);
			// postData.append("GSTNo", Receipt_Voucher_.GSTNo);
			
		

	}

	var i = 0;
	if (ReceiptImageFile_Photo1 != undefined) {
		for (const img of ReceiptImageFile_Photo1) {
			postData.append("myFile", img);
			postData.append("ReceiptImageFile_Photo1", i.toString());
			i = i + 1;
		}
	}
debugger
	postData.append("Document_File_Array2", i.toString());
	if (Document_File_Array2 != undefined) {
		var j = 0;
		for (const img of Document_File_Array2) {
		if (Document_File_Array2[j].New_Entry == 1) {
			postData.append("myFile", img);
		}
		j++;
		i = i + 1;
		}
	}
	
	return this.http.post(
		environment.BasePath + "Student/Save_Student_Receipt_Voucher",
		postData
	);
}


Search_Active_Batch_Report(
	
	Is_Date_,
	From_Date_,
	To_Date_,
	Batch_,
	Faculty_,
	Course_,
	User_Id_,
	FollowUp_Branch_Id_
): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Batch_: Batch_,
		Faculty_: Faculty_,
		Course_:Course_,
		User_Id_: User_Id_,
		FollowUp_Branch_Id_:FollowUp_Branch_Id_
	};
	debugger
	return this.http.get(
		environment.BasePath + "Student/Search_Active_Batch_Report/",
		{ params: Search_Data }
	);
}



Search_Syllabus_Coverage(
	
	Is_Date_,
	From_Date_,
	To_Date_,
	Batch_,
	Faculty_,
	Course_,
	User_Id_,
	FollowUp_Branch_Id
): Observable<any> {
	debugger
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Batch_: Batch_,
		Faculty_: Faculty_,
		Course_:Course_,
		User_Id_: User_Id_,
		FollowUp_Branch_Id: FollowUp_Branch_Id,
	};
	debugger
	return this.http.get(
		environment.BasePath + "Student/Search_Syllabus_Coverage/",
		{ params: Search_Data }
	);
}


Search_Batch_Completion(
	
	Is_Date_,
	From_Date_,
	To_Date_,
	Batch_,
	Faculty_,
	Course_,
	User_Id_,
	FollowUp_Branch_Id
): Observable<any> {
	debugger
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Batch_: Batch_,
		Faculty_: Faculty_,
		Course_:Course_,
		User_Id_: User_Id_,
		FollowUp_Branch_Id: FollowUp_Branch_Id,
	};
	debugger
	return this.http.get(
		environment.BasePath + "Student/Search_Batch_Completion/",
		{ params: Search_Data }
	);
}


Reset_Notification_Count(User_Id_) {
	
	return this.http.get(
		environment.BasePath + "Student/Reset_Notification_Count/" + User_Id_
	);
}
Get_All_Notification(date_, userid_, login_user_) {
	var Search_Data = {
		Date_: date_,
		User_Id_: userid_,
		login_Id_: login_user_,
	};
	return this.http.get(
		environment.BasePath + "Student/Get_All_Notification/",
		{ params: Search_Data }
	);
}

Get_Individual_Notification( Student_Id_, Notification_Id_,Login_user_Id_) {
	var Search_Data = {
		Student_Id_: Student_Id_,
		Notification_Id_: Notification_Id_,
		Login_user_Id_: Login_user_Id_,
	};
	return this.http.get(
		environment.BasePath + "Student/Get_Individual_Notification/",
		{ params: Search_Data }
	);
}


Notification_Read_Status(Notification_Count_,User_Id_): Observable<any> {
	return this.http.get(environment.BasePath + "Student/Notification_Read_Status/"+Notification_Count_+'/'+User_Id_);
}
update_Read_Status(login_user_, Notification_Id_) {
	var Search_Data = {
		login_Id_: login_user_,
		Notification_Id_: Notification_Id_,
	};
	return this.http.get(environment.BasePath + "Student/update_Read_Status/", {
		params: Search_Data,
	});
}

Get_Login_User_Type(Login_User) {
	return this.http.get(
		environment.BasePath + "Student/Get_Login_User_Type/" + Login_User
	);
}


Search_Batch_End_Warning(Login_User) {
	return this.http.get(
		environment.BasePath + "Student/Search_Batch_End_Warning/" + Login_User
	);
}

Mark_As_Complete(Login_User,Batch_Id_,Status_) {
	return this.http.get(
		environment.BasePath + "Student/Mark_As_Complete/" + Login_User+'/'+Batch_Id_+'/'+Status_
	);
}

Change_Status(Login_User,Complaint_Id_,Status_) {
	return this.http.get(
		environment.BasePath + "Student/Change_Status/" + Login_User+'/'+Complaint_Id_+'/'+Status_
	);
}


Save_Self_Placed(Self_Placement_)
{
return this.http.post(environment.BasePath +'Student/Save_Self_Placed/',Self_Placement_);}


Get_Self_Placement(Student_Id_) {
	return this.http.get(
		environment.BasePath + "Student/Get_Self_Placement/" + Student_Id_
	);
}


Delete_Self_Placement(Self_Placement_Id) {
	return this.http.get(
		environment.BasePath +
			"Student/Delete_Self_Placement/" +
			Self_Placement_Id
	);
}


Search_Employer_Status_Typeahead(Employer_Status_Name): Observable<any> {
	var Search_Data = { Employer_Status_Name: Employer_Status_Name};
	return this.http.get(
		environment.BasePath + "Student/Search_Employer_Status_Typeahead/",
		{ params: Search_Data }
	);
}


Search_Agreement_Details(Is_Date_, From_Date_, To_Date_, Course_,Batch_Id_,student_name_,Faculty_Id_): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Course_: Course_,
		Batch_Id_: Batch_Id_,
		student_name_: student_name_,
		Faculty_Id_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Search_Agreement_Details/", {
		params: Search_Data,
	});
}






Save_Agreement_Details(Agreement_Details_Master_,ImageFile_Photo1: File[],Document_File_Array:any[] ) {
	const postData = new FormData();
debugger
	if (Agreement_Details_Master_ != null) {
			postData.append("Student_Id", Agreement_Details_Master_.Student_Id);
			postData.append("Student_Course_Id",Agreement_Details_Master_.Student_Course_Id);
			postData.append("Agreement_File", Agreement_Details_Master_.Agreement_File);
			postData.append("Agreement_File_Name", Agreement_Details_Master_.Agreement_File_Name);
		

	}

	var i = 0;
	if (ImageFile_Photo1 != undefined) {
		for (const img of ImageFile_Photo1) {
			postData.append("myFile", img);
			postData.append("ImageFile_Photo1", i.toString());
			i = i + 1;
		}
	}
debugger
	postData.append("Document_File_Array", i.toString());
	if (Document_File_Array != undefined) {
		var j = 0;
		for (const img of Document_File_Array) {
		if (Document_File_Array[j].New_Entry == 1) {
			postData.append("myFile", img);
		}
		j++;
		i = i + 1;
		}
	}
	
	return this.http.post(
		environment.BasePath + "Student/Save_Agreement_Details",
		postData
	);
}


Search_ExamResult_Final(Course_, Batch_, Faculty_): Observable<any> {
	var Search_Data = { Course_: Course_, Batch_: Batch_, Faculty_: Faculty_ };
	return this.http.get(environment.BasePath + "Student/Search_ExamResult_Final/", {
		params: Search_Data,
	});
}


Search_LevelScore_Details_Student(Course_, Batch_, Faculty_,Name_): Observable<any> {
	var Search_Data = { Course_: Course_, Batch_: Batch_, Faculty_: Faculty_,Name_:Name_ };
	return this.http.get(environment.BasePath + "Student/Search_LevelScore_Details_Student/", {
		params: Search_Data,
	});
}

Save_Exam_Result_Final(Final_Exam_Master_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Exam_Result_Final/",
		Final_Exam_Master_
	);
}


Save_Level_Score_Student(Level_Score_Master_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Level_Score_Student/",
		Level_Score_Master_
	);
}

Search_Examdetails_Final(
	Is_Date_,
	From_Date_,
	To_Date_,
	Course_,
	Batch_,
	Faculty_
): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_,
	};
	return this.http.get(
		environment.BasePath + "Student/Search_Examdetails_Final/",
		{ params: Search_Data }
	);
}

Search_LevelScore_Master_Student(
	Is_Date_,
	From_Date_,
	To_Date_,
	Course_,
	Batch_,
	Faculty_
): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_,
	};
	return this.http.get(
		environment.BasePath + "Student/Search_LevelScore_Master_Student/",
		{ params: Search_Data }
	);
}

Get_ExamresultdetailsFinal(
	Final_Exam_Master_Id_,
	Course_,
	Batch_,
	Faculty_Id_
): Observable<any> {
	var Search_Data = {
		Final_Exam_Master_Id_: Final_Exam_Master_Id_,
		Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Get_ExamresultdetailsFinal/", {
		params: Search_Data,
	});
}


Get_LevelScore_Student_Details(
	Level_Score_Master_Id_,
	Course_,
	Batch_,
	Faculty_Id_
): Observable<any> {
	var Search_Data = {
		Level_Score_Master_Id_: Level_Score_Master_Id_,
		Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Get_LevelScore_Student_Details/", {
		params: Search_Data,
	});
}

Delete_ExamResultFinal(Final_Exam_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_ExamResultFinal/'+Final_Exam_Master_Id);}


 Delete_LevelScore_Student(Level_Score_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_LevelScore_Student/'+Level_Score_Master_Id);}




 Load_Exam(): Observable<any> {
	return this.http.get(
		environment.BasePath + "Student/Load_Exam/"
	);
}
Load_ExamType(): Observable<any> {
	return this.http.get(
		environment.BasePath + "Student/Load_ExamType/"
	);
}

Load_Markstatus(): Observable<any> {
	return this.http.get(environment.BasePath + "Student/Load_Markstatus/");
}


Save_Exam_Creation(Exam_Creation_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Exam_Creation/',Exam_Creation_);}

Search_Exam_Creation(Exam_Creation_Name):Observable<any>
{
var Search_Data={'Exam_Creation_Name':Exam_Creation_Name}
 return this.http.get(environment.BasePath +'Student/Search_Exam_Creation/',{params:Search_Data});}
Delete_Exam_Creation(Exam_Creation_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Exam_Creation/'+Exam_Creation_Id);}
Get_Exam_Creation(Exam_Creation_Id)
{
 return this.http.get(environment.BasePath +'Student/Get_Exam_Creation/'+Exam_Creation_Id);}

 Search_Level_Details_Status(Is_Date_, From_Date_, To_Date_, Course_,Batch_Id_,student_name_,Faculty_Id_,Login_User_): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Course_: Course_,
		Batch_Id_: Batch_Id_,
		student_name_: student_name_,
		Faculty_Id_: Faculty_Id_,
		Login_User_:Login_User_
	};
	return this.http.get(environment.BasePath + "Student/Search_Level_Details_Status/", {
		params: Search_Data,
	});
}

Save_Entry_Level_Details(Level_Details_Status_Master_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Entry_Level_Details/',Level_Details_Status_Master_);}

Save_Mid_Level_Details(Level_Details_Status_Master_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Mid_Level_Details/',Level_Details_Status_Master_);}

Save_Exit_Level_Details(Level_Details_Status_Master_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Exit_Level_Details/',Level_Details_Status_Master_);}

Save_Project_Details(Level_Details_Status_Master_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Project_Details/',Level_Details_Status_Master_);}

Search_Score_Card_Report(Is_Date_, From_Date_, To_Date_, Course_,Batch_Id_,student_name_,Faculty_Id_): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Course_: Course_,
		Batch_Id_: Batch_Id_,
		student_name_: student_name_,
		Faculty_Id_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Search_Score_Card_Report/", {
		params: Search_Data,
	});
}

Search_Batch_Attendance(
	From_Date_,
	To_Date_,
	Faculty_Id_,
	Course_,
	Batch_,
	Attendance_Status_Id,
	User_Id_,Is_Date_,Branch_Id_
): Observable<any> {
	var Search_Data = {
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Faculty_Id_: Faculty_Id_,
		Course_: Course_,
		Batch_: Batch_,
		Attendance_Status_Id: Attendance_Status_Id,
		User_Id_: User_Id_,
		Is_Date_: Is_Date_,
		Branch_Id_:Branch_Id_,
	};
	return this.http.get(
		environment.BasePath + "Student/Search_Batch_Attendance/",
		{ params: Search_Data }
	);
}


Load_Batch_Attendance_Details(
	Student_Id_,
	Batch_Id_,
	Course_Id_,
	Attendance_Status_
): Observable<any> {
	debugger
	var Search_Data = {
		Student_Id_: Student_Id_,
		Batch_Id_: Batch_Id_,
		Course_Id_: Course_Id_,
		Attendance_Status_: Attendance_Status_,
		
	};
	return this.http.get(
		environment.BasePath + "Student/Load_Batch_Attendance_Details/",
		{ params: Search_Data }
	);
}

Update_Batch_Completion_Status(login_user_) {
	var Search_Data = {
		login_user_: login_user_,
	};
	return this.http.get(environment.BasePath + "Student/Update_Batch_Completion_Status/", {
		params: Search_Data,
	});
}

// getOTP(Phone_) {
// 	return this.http.get(
// 		environment.BasePath + "Public_Data/Get_OTP/" + Phone_
// 	);
// }

}
