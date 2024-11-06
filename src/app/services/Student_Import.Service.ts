import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Student_Import_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Student_Import(From_Date,To_Date,look_In_Date_Value):Observable<any>
{
 return this.http.get(environment.BasePath +'Student/Search_Student_Import/'+From_Date+'/'+To_Date + '/'+look_In_Date_Value);}


  Save_Student_Import(Student_Details)
{   
return this.http.post(environment.BasePath +'Student/Save_Student_Import/',Student_Details);
}
Delete_Student_Import(Student_Import_Id)
{
 return this.http.get(environment.BasePath +'Student_Import/Delete_Student_Import/'+Student_Import_Id);}

 Get_Student_Import(Import_Master_Id):Observable<any>
 {
  return this.http.get(environment.BasePath +'Course/Get_Student_Import/'+Import_Master_Id);
 }
}


