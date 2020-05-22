export class Reimbursement {
    id:number;
    amount:number;
    submitted: Date;
    resolved: Date;
    description: string;
    authorid: number;
    statusid: number;
    typeid: number;

    constructor(id: number, amount:number, submitted: Date, resolved: Date,
        description: string,authorid: number,statusid: number,typeid: number){
            this.id =id;
            this.amount = amount;
            this.submitted = submitted;
            this.resolved = resolved;
            this.description = description;
            this.authorid = authorid;
            this.statusid =statusid;
            this.typeid = typeid;

        }
}