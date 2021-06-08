import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import JunoWebhookController from './juno.webhook.controller';
import JunoWebhookProvider from './juno.webhook.provider';
import JunoModule from './../juno.module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { METADATA as NEST_METADATA_CONSTANTS } from '@nestjs/common/constants';
import {
  JUNO_WEBHOOK_PROVIDER,
  JUNO_WEBHOOK_METHOD,
} from './../juno.constants';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { Injectable, DynamicModule } from '@nestjs/common/interfaces';

@Module({
  imports: [JunoModule],
  providers: [JunoWebhookProvider],
  controllers: [JunoWebhookController.forRoot('juno', 'webhook')],
})
export default class JunoWebhookModule implements OnModuleInit {
  started = false;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly modulesContainer: ModulesContainer,
    private readonly junoWebhookProvider: JunoWebhookProvider,
  ) {
    this.onModuleInit();
  }

  onModuleInit() {
    if (this.started == true) {
      return;
    }
    this.started = true;
    [...this.modulesContainer.values()].forEach(({ metatype }) => {
      const metadata =
        Reflect.getMetadata(NEST_METADATA_CONSTANTS.PROVIDERS, metatype) || [];
      const providers = [
        ...metadata.filter(metatype => typeof metatype === 'function'),
      ];
      providers.map(provider => {
        if (Reflect.getOwnMetadata(JUNO_WEBHOOK_PROVIDER, provider)) {
          const realProvider = this.moduleRef.get(provider, { strict: false });

          this.junoWebhookProvider.addProvider(realProvider);

          const metadataScanner = new MetadataScanner();

          metadataScanner.scanFromPrototype<Injectable, any>(
            null,
            provider['prototype'],
            method => {
              const descriptor = Reflect.getOwnPropertyDescriptor(
                provider['prototype'],
                method,
              );

              const hook = Reflect.getMetadata(
                JUNO_WEBHOOK_METHOD,
                descriptor.value,
              );

              if (hook) {
                this.junoWebhookProvider.addMethod(
                  hook,
                  method,
                  realProvider.constructor.name,
                );
              }
            },
          );
        }
      });
    });
  }

  public static forRoot(webhookOptions: any): DynamicModule {
    return {
      module: JunoWebhookModule,
      imports: [JunoModule],
      providers: [JunoWebhookProvider],
      controllers: [
        JunoWebhookController.forRoot(
          webhookOptions.root,
          webhookOptions.handle,
        ),
      ],
    };
  }
}
