import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardController } from "src/interfaces/http/dashboard/dashboard.controller";
import { DashboardFacade } from "src/interfaces/http/dashboard/dashboard.facade.service";
import { GetDashboardSummaryUseCase } from "src/applications/dashboard/use-cases/get-dashboard-summary.use-case";
import { TransactionORM } from "src/infrastructure/database/typeorm/entities/transaction.orm-entity";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
import { TransactionRepositoryImpl } from "src/infrastructure/database/repositories/transaction.repository.impl";
import { UserRepositoryImpl } from "src/infrastructure/database/repositories/user.repository.impl";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionORM, UserORM]),
    ],
    controllers: [DashboardController],
    providers: [
        DashboardFacade,
        GetDashboardSummaryUseCase,
        {
            provide: "TransactionRepository",
            useClass: TransactionRepositoryImpl,
        },
        {
            provide: "UserRepository",
            useClass: UserRepositoryImpl,
        },
    ],
})
export class DashboardModule { }
