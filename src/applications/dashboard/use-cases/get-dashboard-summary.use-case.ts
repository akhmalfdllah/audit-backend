// src/modules/dashboard/use-cases/get-dashboard-summary.use-case.ts

import { Injectable, Inject } from "@nestjs/common"
import { TransactionRepository } from "src/core/transaction/repositories/transaction.repository"
import { UserRepository } from "src/core/user/repositories/user.repository"
import { TransactionStatus } from "src/core/transaction/entities/transaction.entity"


@Injectable()
export class GetDashboardSummaryUseCase {
    constructor(
        @Inject("TransactionRepository")
        private readonly transactionRepo: TransactionRepository,

        @Inject("UserRepository")
        private readonly userRepo: UserRepository,
    ) { }

    async execute() {
        const [total, approved, rejected, activeUsers, inactiveUsers] = await Promise.all([
            this.transactionRepo.countAll(),
            this.transactionRepo.countByStatus(TransactionStatus.APPROVED),
            this.transactionRepo.countByStatus(TransactionStatus.REJECTED),
            this.userRepo.countActiveUsers(),
            this.userRepo.countInactiveUsers(),
        ])

        return {
            totalTransactions: total,
            approvedTransactions: approved,
            rejectedTransactions: rejected,
            activeUsers,
            inactiveUsers,
        }
    }
}
