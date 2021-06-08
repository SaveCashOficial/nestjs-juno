import { Inject, Injectable, HttpException } from '@nestjs/common';
import { JunoOptions } from './interfaces';
import { JUNO_OPTIONS_PROVIDER } from './juno.constants';

@Injectable()
export default class JunoProvider {

  protected options: JunoOptions;

  constructor(@Inject(JUNO_OPTIONS_PROVIDER) options: JunoOptions) {
    this.options = options;
  }
  async execWebhook(payload: any): Promise<any> {
    if (payload.eventType == undefined) {
      throw new HttpException('Failed', 500);
    }
    return await Promise.resolve(payload);
  }

}