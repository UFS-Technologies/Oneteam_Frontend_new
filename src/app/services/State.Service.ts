import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class State_Service {
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
Save_State(State_)
{
return this.http.post(environment.BasePath +'State/Save_State/',State_);
}
Save_State_District(State_District_)
{
return this.http.post(environment.BasePath +'State/Save_State_District/',State_District_);
}
Search_State(State_Name):Observable<any>
{
var Search_Data={'State_Name':State_Name}
 return this.http.get(environment.BasePath +'State/Search_State/',{params:Search_Data});}
Delete_State(State_Id)
{
 return this.http.get(environment.BasePath +'State/Delete_State/'+State_Id);
}
 Get_State_District(State_Id)
{
 return this.http.get(environment.BasePath +'State/Get_State_District/'+State_Id);
}
Delete_State_District(State_District_Id)
{
 return this.http.get(environment.BasePath +'State/Delete_State_District/'+State_District_Id);
}
Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
 }
}

