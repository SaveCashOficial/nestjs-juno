import { IsDefined } from 'class-validator';

export class JunoWebhookDto {
  @IsDefined()
  eventType: string;
}
