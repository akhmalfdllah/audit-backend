import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import axios from 'axios';

@Injectable()
export class ErpSchedulerService implements OnModuleInit {
    private readonly logger = new Logger(ErpSchedulerService.name);

    private API_URL = process.env.AUDIT_BACKEND_URL || 'http://localhost:3000';
    private API_KEY = process.env.ERP_API_KEY || 'default-api-key';
    private CRON_SCHEDULE = process.env.SEND_INTERVAL_CRON || '* * * * *'; // default tiap 1 menit

    async onModuleInit() {
        this.logger.log('ErpSchedulerService initialized');

        if (process.env.ENABLE_ERP_SCHEDULER === 'true') {
            cron.schedule(this.CRON_SCHEDULE, async () => {
                this.logger.log('Cron job triggered ⏰');
                await this.sendTransaction();
            });

            this.logger.log(`ERP Auto-Sender aktif: jadwal = "${this.CRON_SCHEDULE}"`);
        } else {
            this.logger.warn('ERP Auto-Sender dimatikan 🚫 (ENABLE_ERP_SCHEDULER bukan "true")');
        }
    }

    private generateTransaction() {
        return {
            title: 'Pembayaran Transaksi dari ERP A',
            amount: Math.floor(Math.random() * 100000),
            category: 'Pembelian',
            currency: 'IDR',
            description: 'Simulasi transaksi dari ERP',
        };
    }

    private async sendTransaction() {
        const transaction = this.generateTransaction();

        try {
            const res = await axios.post(
                `${this.API_URL}/transactions/from-erp`,
                transaction,
                {
                    headers: {
                        'x-api-key': this.API_KEY,
                        'Content-Type': 'application/json',
                    },
                },
            );
            this.logger.log(`Transaksi terkirim: ${JSON.stringify(res.data)}`);
        } catch (error) {
            this.logger.error(
                `Gagal mengirim transaksi: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`,
            );
        }
    }
}
