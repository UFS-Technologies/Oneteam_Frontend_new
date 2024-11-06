import {Final_Exam_Details} from './Final_Exam_Details'
export class Final_Exam_Master
{
    Final_Exam_Master_Id:number;
    Student_Id:number;
    User_Id:number;
    Course_Id:number;
    Batch_Id:number;
    Final_Exam_Date:Date;
    Student_Course_Id:number;
    Check_Box:boolean;
    Final_Exam_Details:Final_Exam_Details[]
    Final_Exam_Details_Value:number;
    Course_Name:string;
    Batch_Name:string;
    // Markstatus_Id:number;
    // Markstatus_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

