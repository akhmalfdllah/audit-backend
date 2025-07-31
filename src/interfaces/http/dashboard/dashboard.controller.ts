// src/modules/dashboard/dashboard.controller.ts

import { Controller, Get, Logger } from "@nestjs/common"
import { DashboardFacade } from "src/interfaces/http/dashboard/dashboard.facade.service"
import { TokenGuard } from "src/shared/decorators/common.decorator";

@TokenGuard(["Admin", "Auditor"])
@Controller("dashboard")
export class DashboardController {
    private readonly logger = new Logger(DashboardController.name)
    constructor(private readonly dashboardFacade: DashboardFacade) { }

    @Get("summary")
    async getSummary() {
        this.logger.log("📊 Memanggil endpoint GET /dashboard/summary")

        const summary = await this.dashboardFacade.getSummaryData()

        this.logger.debug("✅ Ringkasan data:", summary)

        return summary
    }
}