import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Period_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Period(Period_)
{
return this.http.post(environment.BasePath +'Period/Save_Period/',Period_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Period(Period_Name):Observable<any>
{
var Search_Data={'Period_Name':Period_Name}
 return this.http.get(environment.BasePath +'Period/Search_Period/',{params:Search_Data});}
Delete_Period(Period_Id)
{
 return this.http.get(environment.BasePath +'Period/Delete_Period/'+Period_Id);}
Get_Period(Period_Id)
{
 return this.http.get(environment.BasePath +'Period/Get_Period/'+Period_Id);}
 Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
 }

 

}

