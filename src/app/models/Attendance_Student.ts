export class Attendance_Student
{
    Attendance_Student_Id :number;
    Attendance_Master_Id :number;
    Student_Id :number;
    Student_Name :String;
    Check_Box:boolean;
    Date:Date;
    Absent_Days: number;
    total_no_of_days: number;
    No_of_attendance: number;
    Agreement_Status_Name:string;

    Father_Whatsapp:string;
    
    Entry_Level_Status_Name:string;
    Mid_Level_Status_Name:string;
    Exit_Level_Status_Name:string;
    Project_Status_Name:string;
   Absent_Remark:string;
    
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

