import { Module } from '@nestjs/common';
import { JunoTokenService } from './juno.token.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JunoTokenService],
  exports: [JunoTokenService],
})
export class JunoTokenModule {}
