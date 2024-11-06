import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { Company } from '../models/Company';
@Injectable({
providedIn: 'root'
})
export class Company_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

// Save_Company(Company_)
// {
// return this.http.post(environment.BasePath +'Employer_Details/Save_Company/',Company_);}

Save_Company(Company_:Company,image: File[]) {
        
  const postData = new FormData();
  postData.append("Company_Id", Company_.Company_Id.toString());
  postData.append("Company_Name", Company_.Company_Name);
  postData.append("Phone", Company_.Phone1);
  postData.append("Email", Company_.Email);
  postData.append("Website", Company_.Website);
  postData.append("Address1", Company_.Address1);
  postData.append("Address2", Company_.Address2);
  postData.append("Address3", Company_.Address3);
  postData.append("Logo", Company_.Logo);
  if (image != undefined) {
      for (const img of image) {
          postData.append("myFile", img);
      }
  }
  return this.http.post(environment.BasePath + 'Company/Save_Company', postData);
}
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
Get_Companydetails()
    {
     return this.http.get(environment.BasePath +'Company/Get_Companydetails/');}     
Search_Employer_Details_Role(Employer_Details_Role_Name): Observable<any> {
    return this.http.get(environment.BasePath + 'Employer_Details/Search_User_Role/' + Employer_Details_Role_Name);
}


Get_Application_Settings() {
    return this.http.get(environment.BasePath + 'Company/Get_Application_Settings/');
    }
    Save_Application_Settings(Application_Settings_) {
        
        return this.http.post(environment.BasePath + 'Company/Save_Application_Settings/', Application_Settings_);
    }

}
