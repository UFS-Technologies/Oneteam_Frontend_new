import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Employer_Status_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Employer_Status(Status_)
{
return this.http.post(environment.BasePath +'Employer_Status/Save_Employer_Status/',Status_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Employer_Status(Status_Name):Observable<any>
{
var Search_Data={'Status_Name':Status_Name}
 return this.http.get(environment.BasePath +'Employer_Status/Search_Employer_Status/',{params:Search_Data});}
Delete_Employer_Status(Status_Id)
{
 return this.http.get(environment.BasePath +'Employer_Status/Delete_Employer_Status/'+Status_Id);}
Get_Employer_Status(Status_Id)
{
 return this.http.get(environment.BasePath +'Employer_Status/Get_Employer_Status/'+Status_Id);}
 Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
 }




 Save_Vacancy_Source(Job_Opening_)
{
return this.http.post(environment.BasePath +'Employer_Status/Save_Vacancy_Source/',Job_Opening_);}

 Search_Vacancy_Source(Vacancy_Source_Name_):Observable<any>
 {
 var Search_Data={'Vacancy_Source_Name_':Vacancy_Source_Name_}
  return this.http.get(environment.BasePath +'Employer_Status/Search_Vacancy_Source/',{params:Search_Data});}
 Delete_Vacancy_Source(Status_Id)
 {
  return this.http.get(environment.BasePath +'Employer_Status/Delete_Vacancy_Source/'+Status_Id);}
 Get_Vacancy_Source(Status_Id)
 {
  return this.http.get(environment.BasePath +'Employer_Status/Get_Vacancy_Source/'+Status_Id);}

}

