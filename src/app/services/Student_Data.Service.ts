import { Component, OnInit, Input, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class Student_Data_Service {
    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    } AnimationKeyframesSequenceMetadata
   
Student_Data_Dropdowns(): Observable<any> {
    return this.http.get(environment.BasePath + "Student_Data/Student_Data_Dropdowns/");
}


Search_Student_Data_Report(
    Search_FromDate,
    Search_ToDate,
    value,
    Search_Name,
    enquiry_source_id,
    Branch_Id,
    User_Id,
    Look_In_Date,
    Page_Index1_,
    Page_Index2_,
    Login_User_Id_,
    RowCount_,
    RowCount2_,
    To_User_,
    Status_Id_,
    Register_Value
): Observable<any> {
    return this.http.get(
        environment.BasePath +
            "Student_Data/Search_Student_Data_Report/" +
            Search_FromDate +
            "/" +
            Search_ToDate +
            "/" +
            value +
            "/" +
            Search_Name +
            "/" +
            enquiry_source_id +
            "/" +
            Branch_Id +
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
            To_User_ +
            "/" +
            Status_Id_ +
            "/" +
            Register_Value
    );
}



Delete_Student_Report(Student_) {
    return this.http.post(
        environment.BasePath + "Student_Data/Delete_Student_Report/",
        Student_
    );
}

Save_Student_Data_FollowUp(Student_Details) {

    //debugger
    return this.http.post(
        environment.BasePath + "Student_Data/Save_Student_Data_FollowUp/",
        Student_Details
    );
}

Get_Menu_Status(Menu_Id_,Login_User_)
{
       return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}

Search_Branch_User_Typeahead(Branch_Id, User_Details_Name_): Observable<any> {
    return this.http.get(
        environment.BasePath +
            "Student_Data/Search_Branch_User_Typeahead/" +
            Branch_Id +
            "/" +
            User_Details_Name_
    );
}

Search_Branch_Typeahead(Branch_Name): Observable<any> {
    return this.http.get(
        environment.BasePath + "Student_Data/Search_Branch_Typeahead/" + Branch_Name
    );
}

}

