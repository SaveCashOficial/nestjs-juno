import { Module } from '@nestjs/common';
import { JunoTokenService } from './juno.token.service';

@Module({
  providers: [JunoTokenService],
  exports: [JunoTokenService],
})
export class JunoTokenModule {}
