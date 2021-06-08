import { Injectable, Provider, Logger, HttpException } from '@nestjs/common';
import {} from './../interfaces';
import {
  JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED,
  JUNO_WEBHOOK_EVENT_DOCUMENT_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_TRANSFER_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_P2P_TRANSFER_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_CHARGE_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_CHARGE_READ_CONFIRMATION,
  JUNO_WEBHOOK_EVENT_PAYMENT_NOTIFICATION,
} from './../juno.constants';

@Injectable()
export default class JunoWebhookProvider {
  private providers: { [k: string]: Provider } = {};
  private methods: any = {
    [JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED]: [],
    [JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED]: [],
    [JUNO_WEBHOOK_EVENT_DOCUMENT_STATUS_CHANGED]: [],
    [JUNO_WEBHOOK_EVENT_TRANSFER_STATUS_CHANGED]: [],
    [JUNO_WEBHOOK_EVENT_P2P_TRANSFER_STATUS_CHANGED]: [],
    [JUNO_WEBHOOK_EVENT_CHARGE_STATUS_CHANGED]: [],
    [JUNO_WEBHOOK_EVENT_CHARGE_READ_CONFIRMATION]: [],
    [JUNO_WEBHOOK_EVENT_PAYMENT_NOTIFICATION]: [],
  };

  async handle(webhook: any) {
    if (Object.keys(this.methods).includes(webhook.eventType)) {
      let waiter = this.methods[webhook.eventType].map(
        async (methodProto: any) => {
          try {
            return await this.providers[methodProto.provider][
              methodProto.method
            ](webhook);
          } catch (e) {
            Logger.error(
              `There was an error calling ${methodProto.method} from ${methodProto.provider}`,
              e.stack,
              'JunoWebhookProvider',
            );
            throw HttpException;
          }
        },
      );
      return;
    }
  }

  addProvider(provider: Provider) {
    this.providers[provider.constructor.name] = provider;
    Logger.log(
      `Added provider [${provider.constructor.name}]`,
      'JunoWebhookProvider',
    );
  }

  addMethod(hook: string, method: string, provider: string) {
    this.methods[hook] = [
      ...this.methods[hook],
      {
        provider,
        method,
      },
    ];
    Logger.log(`Added method [${method}]`, 'JunoWebhookProvider');
  }
}
