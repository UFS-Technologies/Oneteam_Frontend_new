import {Exam_ResultDetails} from './Exam_ResultDetails'
export class Exam_Result
{
    Exam_Result_Id:number;
    Student_Id:number;
    Exam_Id:number;
    Exam_Type_Id:number;
    Course_Id:number;
    Mark:number;
    Maxmium_Mark:number;
    User_Id:number;
    Exam_Date:Date;
    Student_Course_Id:number;
    Batch_Id:number;
    Description:string;
    Check_Box:boolean;
    Exam_ResultDetails:Exam_ResultDetails[]
    Exam_Result_Details_Value:number;
    Course_Name:string;
    Batch_Name:string;
    Exam_Date1:Date;
    Exam_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

