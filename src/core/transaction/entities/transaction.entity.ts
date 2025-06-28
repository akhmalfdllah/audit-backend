export enum TransactionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export class Transaction {
    constructor(
        public id: string | null,
        public title: string,
        public amount: number,
        public category: string,
        public description: string | null,
        public status: TransactionStatus,
        public submittedBy: string, // userId
        public approvedBy: string | null,
        public createdAt: Date | null,
        public updatedAt: Date | null
    ) { }
}
