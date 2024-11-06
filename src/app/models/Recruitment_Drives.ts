import { Time } from "@angular/common";

export class Recruitment_Drives
{
    Recruitment_Drives_Id :number;
    Event_Name :string; 
    Date :Date; 
    Date1:Date; 
    Reporting_Time :string; 
    Venue :string; 
    Organized_Branch_Id :number; 
    Organized_Branch_Name :string;  
    Eligibility_Criteria :string;  
    Additional_Information :string;  
    Number_of_Registrations :string; 
    Unique_Link :string; 
    User_Id :number;
    Event_Status_Id :number; 
    Event_Status_Name :string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

