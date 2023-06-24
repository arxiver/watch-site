import { Test, TestingModule } from '@nestjs/testing';
import { BootloaderService } from './bootloader.service';

describe('BootloaderService', () => {
  let service: BootloaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BootloaderService],
    }).compile();

    service = module.get<BootloaderService>(BootloaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
