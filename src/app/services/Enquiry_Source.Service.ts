import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Enquiry_Source_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Enquiry_Source(Enquiry_Source_)
{
return this.http.post(environment.BasePath +'Enquiry_Source/Save_Enquiry_Source/',Enquiry_Source_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Enquiry_Source(Enquiry_Source_Name):Observable<any>
{
var Search_Data={'Enquiry_Source_Name':Enquiry_Source_Name}
 return this.http.get(environment.BasePath +'Enquiry_Source/Search_Enquiry_Source/',{params:Search_Data});}
Delete_Enquiry_Source(Enquiry_Source_Id)
{
 return this.http.get(environment.BasePath +'Enquiry_Source/Delete_Enquiry_Source/'+Enquiry_Source_Id);}
Get_Enquiry_Source(Enquiry_Source_Id)
{
 return this.http.get(environment.BasePath +'Enquiry_Source/Get_Enquiry_Source/'+Enquiry_Source_Id);}
}

