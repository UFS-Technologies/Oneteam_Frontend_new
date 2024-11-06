import {Attendance_Student} from './Attendance_Student'
import {Attendance_Subject} from './Attendance_Subject'
export class Attendance_Master
{
Attendance_Master_Id :number;
Course_Id :number; 
Batch_Id :number; 
Faculty_Id :number;
Duration:number;
Date:Date;
Course_Name :string; 
Batch_Name :string; 
Faculty_Name :string; 
Percentage : number;
Attendance_Student:Attendance_Student[]
Attendance_Subject:Attendance_Subject[];
Absent_Student:Attendance_Student[];
Attendance_Status:boolean;
Attendance_Status_Name:string;
Attendance_clr:number;
Absent_Value:number;
Attendance_Student_Value:number;
Attendance_Subject_Value:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

