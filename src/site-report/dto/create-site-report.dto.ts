import { ObjectId } from 'typeorm';

export class CreateSiteReportDto {
 status?: 'UP' | 'DOWN' | 'UNKNOWN'; //The current status of the URL.

 availability?: number; // A percentage of the URL availability.

 downtime?: number; // The total time, in seconds, of the URL downtime.

 outages?: number; //The total number of URL downtimes.

 uptime?: number; //The total time, in seconds, of the URL uptime.

 responseTime?: number; //The average response time for the URL.

 history?: {at: Date, status: "DOWN"|"UP"}[];

 userId: ObjectId; //The ID of the user who owns the URL.

 siteId: ObjectId; //The ID of the URL.
}
