import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import ambience from '../config/ambience';
import {
  JunoModule,
  JunoProvider,
  JunoWebhookHandler,
  JunoWebhookModule,
} from './../';
import JunoWebhookProvider from './juno.webhook.provider';
import { JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED } from '../juno.constants';
import { JunoWebhookEventDigitalAccountStatusChanged } from '../decorators';

describe('JunoWebhookController', () => {
  it('Methods with decorators are being called by hook ', async () => {
    @JunoWebhookHandler()
    class SubscriptionProvider {
      count = 0;
      @JunoWebhookEventDigitalAccountStatusChanged()
      junoWebhookEventDigitalAccountStatusChanged() {
        this.count++;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
      providers: [SubscriptionProvider],
    }).compile();

    const junoProvider = module.get<JunoProvider>(JunoProvider);
    const webhookProvider = module.get<JunoWebhookProvider>(
      JunoWebhookProvider,
    );

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
    });

    webhookProvider.handle(webhookNotification);
    const provider = module.get<SubscriptionProvider>(SubscriptionProvider);

    expect(provider.count).toBe(1);
  });

  it('shoud providers are being injected correctly', async () => {
    @Injectable()
    class UselessProvider {
      called = true;
    }

    @JunoWebhookHandler()
    class SubscriptionProvider {
      constructor(public readonly uselessProvider: UselessProvider) {
        this.uselessProvider = uselessProvider;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
      providers: [UselessProvider, SubscriptionProvider],
    }).compile();

    const junoProvider = module.get<JunoProvider>(JunoProvider);
    const webhookProvider = module.get<JunoWebhookProvider>(
      JunoWebhookProvider,
    );

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
    });

    webhookProvider.handle(webhookNotification);

    const provider = module.get<SubscriptionProvider>(SubscriptionProvider);
    expect(provider.uselessProvider.called).toBeTruthy();
  });
});
