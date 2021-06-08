import { Module, HttpModule } from '@nestjs/common';
import { JunoTokenService } from './juno.token.service';

@Module({
  imports: [HttpModule],
  providers: [JunoTokenService],
  exports: [JunoTokenService],
})
export class JunoTokenModule {}
