import {
  Controller,
  HttpException,
  Logger,
  Req,
  RequestMethod,
  Body,
} from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import JunoWebhookProvider from './juno.webhook.provider';
import { JunoProvider } from './../';
import { JunoWebhookDto } from './../dto/juno.webhook.dto';

@Controller()
export default class JunoWebhookController {
  constructor(
    readonly juno: JunoProvider,
    private readonly webhookProvider: JunoWebhookProvider,
  ) {}

  public static forRoot(root: string = 'juno', handle: string = 'webhook') {
    Reflect.defineMetadata(PATH_METADATA, root, JunoWebhookController);
    Reflect.defineMetadata(
      METHOD_METADATA,
      RequestMethod.POST,
      Object.getOwnPropertyDescriptor(JunoWebhookController.prototype, 'handle')
        .value,
    );
    Reflect.defineMetadata(
      PATH_METADATA,
      handle,
      Object.getOwnPropertyDescriptor(JunoWebhookController.prototype, 'handle')
        .value,
    );
    return JunoWebhookController;
  }

  async handle(@Body() body: JunoWebhookDto) {
    let webhook: any;
    try {
      webhook = await this.juno.execWebhook(body);
      return await this.webhookProvider.handle(webhook);
    } catch (e) {
      Logger.warn('Failed to process webhook', this.constructor.name);
      throw new HttpException('Failed', 500);
    }
  }
}
