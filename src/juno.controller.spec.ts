import { Test, TestingModule } from '@nestjs/testing';
import { JunoModule, JunoWebhookController, JunoWebhookModule } from './';
import ambience from './config/ambience';
import JunoProvider from './juno.provider';
import JunoWebhookProvider from './webhook/juno.webhook.provider';

class SubscriptionProvider {
}

describe('JunoWebhookController', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
      providers: [SubscriptionProvider],
    }).compile();
  });

  it('Webhook controller must instance', () => {
    const controller = module.get<JunoWebhookController>(JunoWebhookController);
    expect(controller).toBeInstanceOf(JunoWebhookController);
  });

  it('webhookmodule should instance subscription provider', () => {
    const provider = module.get<SubscriptionProvider>(SubscriptionProvider);
    expect(provider).toBeInstanceOf(SubscriptionProvider);
  });

  it('wehook controller instances', () => {
    const junoWebhookController: JunoWebhookController = module.get<JunoWebhookController>(
      JunoWebhookController,
    );

    expect(junoWebhookController.juno).toBeInstanceOf(JunoProvider);
  });
});
