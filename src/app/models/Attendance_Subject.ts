export class Attendance_Subject
{
    Attendance_Subject_Id :number;
    Attendance_Master_Id :number;
    Subject_Id :number;
    Subject_Name :String;
    Checkbox:boolean;
    CheckboxView:number;
    Minimum_Mark : number;
    Color:number;
    Day:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

