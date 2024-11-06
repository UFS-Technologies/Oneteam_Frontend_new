import { MarkStatus } from "./MarkStatus";
export class Final_Exam_Details
{
    Final_Exam_Details_Id:number;
    Final_Exam_Master_Id :number;
    Student_Id:number;
    User_Id:number;
    Reading:number;
    Speaking:number;
    Listening:number;
    Writing :number;
    Grammer :number;
    TotalMark:number;
    Markstatus_Id :number;
    Markstatus_Name:string;
    Exam_Date:Date;
    Check_Box:boolean;
    Student_Course_Id:number;
    MarkStatus_Type_:MarkStatus;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

