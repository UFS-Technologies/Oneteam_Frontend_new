export class Transaction_Student
{
    Transaction_Student_Id :number;
    Transaction_Master_Id :number;
    Student_Id :number;
    Student_Name :String;
    Transaction_Type :number;
    Check_Box:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

