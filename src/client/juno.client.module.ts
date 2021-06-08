import { Module } from '@nestjs/common';
import { JunoClientService } from './juno-client.service';

@Module({
  providers: [JunoClientService],
})
export class JunoClientModule {}
