export class Exam_ResultDetails
{
    Exam_ResultDetails_Id:number;
    Exam_Result_Id:number;
    Student_Id:number;
    Student_Name :String;
    Check_Box:boolean;
    Date:string;
    Maxmium_Mark:number;
    Mark:number;
    Exam_Date:Date;
    User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

