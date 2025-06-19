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
        public submittedBy: string, // userId
        public status: TransactionStatus,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
