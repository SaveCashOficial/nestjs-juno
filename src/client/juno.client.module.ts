import { Module, HttpModule } from '@nestjs/common';
import { JunoClientService } from './juno-client.service';

@Module({
  imports: [HttpModule],
  providers: [JunoClientService],
})
export class JunoClientModule {}
