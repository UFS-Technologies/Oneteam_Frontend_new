import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Employer_Details_Servive {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

Save_Employer_Details(Employer_Details_)
{
return this.http.post(environment.BasePath +'Employer_Details/Save_Employer_Details/',Employer_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Employer_Details(Company_Name):Observable<any>
{
 var Search_Data = { 'Company_Name': Company_Name }
  return this.http.get(environment.BasePath + 'Employer_Details/Search_Employer_Details/', { params: Search_Data });
}
Get_Employer_Details_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'Employer_Details/Get_Employer_Details_Load_Data/');
}
Delete_Employer_Details(Employer_Details_Id_)
{
 return this.http.get(environment.BasePath +'Employer_Details/Delete_Employer_Details/'+Employer_Details_Id_);}
 Get_Employer_Details_Edit(Company_Name)
{
 return this.http.get(environment.BasePath +'Employer_Details/Get_Users_Edit/'+Company_Name);
}
Search_Employer_Details_Role(Employer_Details_Role_Name): Observable<any> {
    return this.http.get(environment.BasePath + 'Employer_Details/Search_User_Role/' + Employer_Details_Role_Name);
}



Save_Job_Opening(Job_Opening_)
{
return this.http.post(environment.BasePath +'Employer_Details/Save_Job_Opening/',Job_Opening_);}

Save_Job_Opening_Followup(Job_Opening_Followup_)
{
return this.http.post(environment.BasePath +'Employer_Details/Save_Job_Opening_Followup/',Job_Opening_Followup_);}




Search_Job_Opening(Is_Date_,Fromdate_, Todate_,Job_id_,Company_id_,Employee_Status_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_
  ): Observable<any> {
    debugger
      var Search_Data = {
          Is_Date_: Is_Date_,
          Fromdate_: Fromdate_,
          Todate_: Todate_,
          Job_id_: Job_id_,
          Company_id_: Company_id_,
          Employee_Status_Id_:Employee_Status_Id_,
          Pointer_Start_:Pointer_Start_,
          Pointer_Stop_:Pointer_Stop_,
          Page_Length_:Page_Length_
      };
      return this.http.get(
          environment.BasePath + "Employer_Details/Search_Job_Opening/",
          { params: Search_Data }
      );
  }
  
  Get_Job_Opening_Followup_History(Job_Opening_Id_)
  {
   return this.http.get(environment.BasePath +'Employer_Details/Get_Job_Opening_Followup_History/'+Job_Opening_Id_);
  }

   
  Job_Post_Exist_Check(Job_Opening_Id_)
  {
   return this.http.get(environment.BasePath +'Employer_Details/Job_Post_Exist_Check/'+Job_Opening_Id_);
  }
  Delete_Job_Opening(Job_Opening_Id_)
  {
   return this.http.get(environment.BasePath +'Employer_Details/Delete_Job_Opening/'+Job_Opening_Id_);
  }


  // Job_Opening_Pending_Followups_Report(User_Id, Login_User): Observable<any> {
	// 	return this.http.get(
	// 		environment.BasePath +
	// 			"Employer_Details/Job_Opening_Pending_Followups_Report/" +
	// 			User_Id +
	// 			"/" +
	// 			Login_User
	// 	);
	// }
	Job_Opening_Pending_Followups_Summary(User_Id, Login_User_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Employer_Details/Job_Opening_Pending_Followups_Summary/" +
				User_Id +
				"/" +
				Login_User_
		);
	}


  
  Job_Opening_Pending_Followups_Report(Is_Date_,Fromdate_, Todate_,Job_id_,Team_Member_Selection_,Employee_Status_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_
  ): Observable<any> {
    debugger
      var Search_Data = {
          Is_Date_: Is_Date_,
          Fromdate_: Fromdate_,
          Todate_: Todate_,
          Job_id_: Job_id_,
          Team_Member_Selection_: Team_Member_Selection_,
          Employee_Status_Id_:Employee_Status_Id_,
          Pointer_Start_:Pointer_Start_,
          Pointer_Stop_:Pointer_Stop_,
          Page_Length_:Page_Length_
      };
      return this.http.get(
          environment.BasePath + "Employer_Details/Job_Opening_Pending_Followups_Report/",
          { params: Search_Data }
      );
  }

}

