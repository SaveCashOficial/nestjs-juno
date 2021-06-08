import { Test, TestingModule } from '@nestjs/testing';
import { JunoWebhookController, JunoModule, JunoWebhookModule } from '..';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { RequestMethod } from '@nestjs/common';
import ambience from '../config/ambience';

describe('JunoWebhookController', () => {
  it('Should instance with default route', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule,
      ],
    }).compile();
    const controller = module.get(JunoWebhookController);

    expect(controller).toBeInstanceOf(JunoWebhookController);
    expect(Reflect.getMetadata(PATH_METADATA, JunoWebhookController)).toBe(
      'juno',
    );
    expect(
      Reflect.getMetadata(
        METHOD_METADATA,
        Object.getOwnPropertyDescriptor(
          JunoWebhookController.prototype,
          'handle',
        ).value,
      ),
    ).toBe(RequestMethod.POST);
    expect(
      Reflect.getMetadata(
        PATH_METADATA,
        Object.getOwnPropertyDescriptor(
          JunoWebhookController.prototype,
          'handle',
        ).value,
      ),
    ).toBe('webhook');
  });

  it('Should instance with forRoot', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        JunoWebhookModule.forRoot({
          root: 'testing',
          handle: 'this',
        }),
      ],
    }).compile();
    const controller = module.get(JunoWebhookController);

    expect(controller).toBeInstanceOf(JunoWebhookController);
    expect(Reflect.getMetadata(PATH_METADATA, JunoWebhookController)).toBe(
      'testing',
    );
    expect(
      Reflect.getMetadata(
        METHOD_METADATA,
        Object.getOwnPropertyDescriptor(
          JunoWebhookController.prototype,
          'handle',
        ).value,
      ),
    ).toBe(RequestMethod.POST);
    expect(
      Reflect.getMetadata(
        PATH_METADATA,
        Object.getOwnPropertyDescriptor(
          JunoWebhookController.prototype,
          'handle',
        ).value,
      ),
    ).toBe('this');
  });
});
