import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Course_Service {
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
Save_Course(Course_)
{
    return this.http.post(environment.BasePath +'Course/Save_Course/',Course_);
}
Search_Course(Course_Name,Course_Type_Id):Observable<any>
{
    var Search_Data={'Course_Name':Course_Name,'Course_Type_Id':Course_Type_Id}
    return this.http.get(environment.BasePath +'Course/Search_Course/',{params:Search_Data});
}
Search_Part_Typeahead(Part_Name_):Observable<any>
{
    var Search_Data = { 'Part_Name_': Part_Name_}
    return this.http.get(environment.BasePath +'Course/Search_Part_Typeahead/',{params:Search_Data});
}
Search_Subject_Typeahead(Subject_Name_):Observable<any>
{
    var Search_Data = { 'Subject_Name_': Subject_Name_}
    return this.http.get(environment.BasePath +'Course/Search_Subject_Typeahead/',{params:Search_Data});
}
Delete_Course(Course_Id)
{
    return this.http.get(environment.BasePath +'Course/Delete_Course/'+Course_Id);
}
Load_Course_DropDowns()
{
    return this.http.get(environment.BasePath +'Course/Load_Course_DropDowns/');
}
Get_Course(Course_Id)
{
    return this.http.get(environment.BasePath +'Course/Get_Course/'+Course_Id);
}
Load_Fees_Type(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Course/Load_Fees_Type/');
}
}

