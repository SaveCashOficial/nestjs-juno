import { TestingModule, Test } from '@nestjs/testing';
import { JunoModule, JunoProvider } from '../src';
import ambience from './config/ambience';
import { JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED } from './juno.constants';

describe('JunoProvider', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
    }).compile();
  });

  it('WebhookProvider shoud return JunoWebhookNotificationInterface with sample payload', async () => {
    const junoProvider = module.get<JunoProvider>(JunoProvider);

    const result = await junoProvider.execWebhook(
      {
        eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
      }
    );
    expect(result).toBeDefined();
  });
});
