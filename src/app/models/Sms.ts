export class Sms
{
    username: string;
    password: string;
    mobile: string;
    message: string;
    sendername: string;
    UC?: string;
    routetype: number;
    tid: string;
    
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}



