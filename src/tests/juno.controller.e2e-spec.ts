import {
  INestApplication,
  Body,
  BadGatewayException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import ambience from '../config/ambience';
import {
  JunoModule,
  JunoWebhookHandler,
  JunoWebhookModule,
  JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
} from './..';
import {
  JunoWebhookEventDigitalAccountStatusChanged,
  JunoWebhookEventDigitalAccountCreated,
} from './../decorators';
import { JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED } from './../juno.constants';

describe('JunoWebhookController', () => {
  let app: INestApplication;
  let module: TestingModule;
  @JunoWebhookHandler()
  class TestExecutionProvider {
    count = 0;
    @JunoWebhookEventDigitalAccountStatusChanged()
    async junoWebhookEventDigitalAccountStatusChanged() {
      console.info('BBB');
      this.count++;
      return {};
    }
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
      providers: [TestExecutionProvider],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/juno/webhook (POST) JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED', async () => {
    return await request(app.getHttpServer())
      .post('/juno/webhook')
      .set('Content-Type', 'application/json')
      .send({
        eventType: JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED,
      })
      .expect(201);
  });
  it('/juno/webhook (POST) JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED', async () => {
    return await request(app.getHttpServer())
      .post('/juno/webhook')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(500);
  });
  it('expected test', async () => {
    const provider = module.get<TestExecutionProvider>(TestExecutionProvider);
    expect(provider.count).toBe(1);
  });
  afterAll(async () => {
    await app.close();
  });
});
