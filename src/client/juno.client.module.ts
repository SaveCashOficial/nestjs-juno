import { Module } from '@nestjs/common';
import { JunoClientService } from './juno-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JunoClientService],
  exports: [JunoClientService],
})
export class JunoClientModule {}
