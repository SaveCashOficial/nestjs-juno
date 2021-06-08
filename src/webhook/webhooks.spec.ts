import { Test, TestingModule } from '@nestjs/testing';
import { JunoModule, JunoWebhookModule, JunoProvider } from './../';
import {
  JunoWebhookEventDigitalAccountStatusChanged,
  JunoWebhookEventDigitalAccountCreated,
  JunoWebhookEventDocumentStatusChanged,
  JunoWebhookEventTransferStatusChanged,
  JunoWebhookEventP2PTransferStatusChanged,
  JunoWebhookEventChargeStatusChanged,
  JunoWebhookEventChargeReadConfirmation,
  JunoWebhookEventPaymentNotification,
  JunoWebhookHandler,
} from '../decorators';
import ambience from '../config/ambience';
import {
  JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED,
  JUNO_WEBHOOK_EVENT_DOCUMENT_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_TRANSFER_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_P2P_TRANSFER_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_CHARGE_STATUS_CHANGED,
  JUNO_WEBHOOK_EVENT_CHARGE_READ_CONFIRMATION,
  JUNO_WEBHOOK_EVENT_PAYMENT_NOTIFICATION,
} from '../juno.constants';
import JunoWebhookProvider from './juno.webhook.provider';

describe('Juno Webhooks', () => {
  let module: TestingModule;
  let junoProvider: JunoProvider;
  let junoWebhookProvider: JunoWebhookProvider;

  @JunoWebhookHandler()
  class TestProvider {
    public static called = null;

    @JunoWebhookEventDigitalAccountStatusChanged()
    digitalAccountStatusChanged() {
      TestProvider.called = 'digitalAccountStatusChanged';
    }

    @JunoWebhookEventDigitalAccountCreated()
    digitalAccountCreated() {
      TestProvider.called = 'digitalAccountCreated';
    }
    @JunoWebhookEventDocumentStatusChanged()
    documentStatusChanged() {
      TestProvider.called = 'documentStatusChanged';
    }
    @JunoWebhookEventTransferStatusChanged()
    transferStatusChanged() {
      TestProvider.called = 'transferStatusChanged';
    }
    @JunoWebhookEventP2PTransferStatusChanged()
    p2PTransferStatusChanged() {
      TestProvider.called = 'p2PTransferStatusChanged';
    }
    @JunoWebhookEventChargeStatusChanged()
    chargeStatusChanged() {
      TestProvider.called = 'chargeStatusChanged';
    }
    @JunoWebhookEventChargeReadConfirmation()
    chargeReadConfirmation() {
      TestProvider.called = 'chargeReadConfirmation';
    }
    @JunoWebhookEventPaymentNotification()
    paymentNotification() {
      TestProvider.called = 'paymentNotification';
    }
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
      providers: [TestProvider],
    }).compile();

    TestProvider.called = null;

    junoProvider = module.get(JunoProvider);
    junoWebhookProvider = module.get(JunoWebhookProvider);
  });
  it('digitalAccountStatusChanged event hook test', async () => {
    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('digitalAccountStatusChanged');
  });
  it('digitalAccountCreated event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('digitalAccountCreated');
  });
  it('documentStatusChanged event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_DOCUMENT_STATUS_CHANGED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('documentStatusChanged');
  });
  it('transferStatusChanged event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_TRANSFER_STATUS_CHANGED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('transferStatusChanged');
  });

  it('p2PTransferStatusChanged event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_P2P_TRANSFER_STATUS_CHANGED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('p2PTransferStatusChanged');
  });
  it('chargeStatusChanged event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_CHARGE_STATUS_CHANGED,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('chargeStatusChanged');
  });
  it('chargeReadConfirmation event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_CHARGE_READ_CONFIRMATION,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('chargeReadConfirmation');
  });
  it('paymentNotification event hook test', async () => {
    const junoProvider = module.get(JunoProvider);
    const junoWebhookProvider = module.get(JunoWebhookProvider);

    const webhookNotification = await junoProvider.execWebhook({
      eventType: JUNO_WEBHOOK_EVENT_PAYMENT_NOTIFICATION,
    });
    junoWebhookProvider.handle(webhookNotification);
    expect(TestProvider.called).toBe('paymentNotification');
  });
});
