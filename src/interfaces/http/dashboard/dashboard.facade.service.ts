// src/modules/dashboard/dashboard.facade.ts

import { Injectable } from "@nestjs/common"
import { GetDashboardSummaryUseCase } from "src/applications/dashboard/use-cases/get-dashboard-summary.use-case"

@Injectable()
export class DashboardFacade {
    constructor(private getSummary: GetDashboardSummaryUseCase) { }

    getSummaryData() {
        return this.getSummary.execute()
    }
}
