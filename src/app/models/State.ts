export class State
{
State_Id:number;
State_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

