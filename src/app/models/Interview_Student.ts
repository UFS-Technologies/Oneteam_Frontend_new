export class Interview_Student
{
    Interview_Student_Id :number;
    Interview_Master_Id :number;
    Student_Id :number;
    Student_Name :String;
    Check_Box:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

