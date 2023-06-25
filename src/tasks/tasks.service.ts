import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TaskService {
 private readonly logger = new Logger(TaskService.name);
 private readonly schedulerRegistry: SchedulerRegistry = new SchedulerRegistry();

 async create(name: string, mins: number, callback: () => void) {
  const interval = setInterval(callback, mins * 1000 * 60);
  this.schedulerRegistry.addInterval(name, interval);

  this.logger.log(`job id: ${name} each minute at ${mins} mins!`);
 }

 remove(name: string) {
  const interval = this.schedulerRegistry.getInterval(name);
  clearInterval(interval);
  this.logger.warn(`job ${name} deleted!`);
 }

 update(name: string, mins: number, callback: () => void) {
  this.remove(name);
  this.create(name, mins, callback);
  }

 get() {
  const jobs = this.schedulerRegistry.getIntervals();
  jobs.forEach((value, key, map) => {
   let next;
   try {
    next = value;
   } catch (e) {
    next = 'error: next fire date is in the past!';
   }
   this.logger.log(`job: ${key} -> next: ${next}`);
  });
 }
}
