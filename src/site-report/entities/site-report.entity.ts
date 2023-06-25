import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class SiteReport {
  @ObjectIdColumn({name:"_id"})
  // The ID of the URL.
  _id?: ObjectId;

  @Column({ default: 'UNKNOWN' })
  // The current status of the URL.
  status: 'UP' | 'DOWN' | 'UNKNOWN';

  @Column({ default: 1 })
  // A percentage of the URL availability.
  availability: number;

  @Column({ default: 0 })
  // The total number of URL downtimes.
  outages: number;

  @Column({ default: 0 })
  // The total time, as counter, will be converted to seconds in reporting, of the URL downtime.
  // Site interval * downtime = downtime in seconds
  downtime: number;

  @Column({ default: 0 })
  // The total time,  as counter, will be converted to seconds in reporting, of the URL uptime.
  uptime: number;

  @Column({ default: 0 })
  // The average response time for the URL.
  responseTime: number;

  @Column()
  // Timestamped logs of the polling requests.
  history: { at: Date, status: 'UP' | 'DOWN' }[];

  @ObjectIdColumn({name:"userId"})
  // The ID of the user who owns the URL.
  userId: ObjectId;

  @ObjectIdColumn({name:"siteId"})
  // The ID of the URL.
  siteId: ObjectId|string;

  @Column()
  // The timestamp of the URL creation.
  createdAt: number | Date;

  @Column()
  // The timestamp of the URL update.
  updatedAt: number | Date;

  @Column()
  // The timestamp of the URL deletion.
  deletedAt: number | Date;
}
