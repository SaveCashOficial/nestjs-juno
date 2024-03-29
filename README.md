
<h1 align="center">Nestjs Juno</h1>

![Logo](https://github.com/SaveCashOficial/nestjs-juno/blob/81bf8014365e03fe9f91e6465192f0e76337a35c/logo.png)

## Install

```bash
$ npm install nestjs-juno --save
```

## Como usar

### Uso Basico

```typescript
import { Module } from '@nestjs/common';
import { JunoModule } from 'nestjs-juno';

@Module({
  imports: [
    JunoModule.forRoot({
        endpoint: '',
        clientId: '',
        clientSecret: '',
        privateToken: '',
    }),
  ],
})
export default class AppModule {}
```

### Em um subModule
```typescript
import { Module } from '@nestjs/common';
import { JunoModule } from 'nestjs-juno';

@Module({
  imports: [
    JunoModule.forFeature(),
  ],
})
export default class SubModule {}
```

### Usando com o load das configuracoes de forma async

```typescript
import { Module } from '@nestjs/common';
import { JunoModule } from 'nestjs-juno';
import { ConfigModule, ConfigService } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load('root/to/config/*/**.{ts,js}'),
    JunoModule.forRootAsync({
      useFactory: async (config: ConfigService) => config.get('juno'),
      inject: [ConfigService],
    }),
  ],
})
export default class AppModule {}

//config/juno.ts
export default {
        endpoint: process.env.JUNO_ENDPOINT,
        clientId: process.env.JUNO_CLIENT_ID,
        clientSecret: process.env.JUNO_CLIENT_SECRET,
        privateToken: process.env.JUNO_PRIVATE_TOKEN,
};
```

## JunoProvider

Como injetar em outra classse o JunoProvider

#### 
```typescript
@Injectable()
class TestService {
    constructor(
        @InjectJunoProvider()
        private readonly junoProvider: JunoProvider,
    ) {}
}
```


@InjectJunoProvider()
        private readonly junoProvider: JunoProvider,

## JunoClient

É o cliente responsável por fazer as requisições para a juno, você não precisa se preocupar com a autenticação.

#### 
```typescript
@Injectable()
class TestService {
    constructor(public junoClientService: JunoClientService) {}
    requestExample() {
        return this.junoClientService.http.get('restantedourl');
    }
}
```

## Webhooks

Você pode utilizar seus webhooks, que serão por default apontados para ```juno/webhook```.

```typescript
@JunoWebhookHandler()
    class SubscriptionProvider {
      count = 0;
      @JunoWebhookEventDigitalAccountStatusChanged()
      junoWebhookEventDigitalAccountStatusChanged() {
        this.count++;
      }
    }

```

### Eventos implementados no Webhook

Nome | Tag Juno | NestJS decorator
--- | --- | ---
JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_STATUS_CHANGED | DIGITAL_ACCOUNT_STATUS_CHANGED | JunoWebhookEventDigitalAccountStatusChanged
JUNO_WEBHOOK_EVENT_DIGITAL_ACCOUNT_CREATED | DIGITAL_ACCOUNT_CREATED | JunoWebhookEventDigitalAccountCreated
JUNO_WEBHOOK_EVENT_DOCUMENT_STATUS_CHANGED | DOCUMENT_STATUS_CHANGED | JunoWebhookEventDocumentStatusChanged
JUNO_WEBHOOK_EVENT_TRANSFER_STATUS_CHANGED | TRANSFER_STATUS_CHANGED | JunoWebhookEventTransferStatusChanged
JUNO_WEBHOOK_EVENT_P2P_TRANSFER_STATUS_CHANGED | P2P_TRANSFER_STATUS_CHANGED | JunoWebhookEventP2PTransferStatusChanged
JUNO_WEBHOOK_EVENT_CHARGE_STATUS_CHANGED | CHARGE_STATUS_CHANGED | JunoWebhookEventChargeStatusChanged
JUNO_WEBHOOK_EVENT_CHARGE_READ_CONFIRMATION | CHARGE_READ_CONFIRMATION | JunoWebhookEventChargeReadConfirmation
JUNO_WEBHOOK_EVENT_PAYMENT_NOTIFICATION | PAYMENT_NOTIFICATION | JunoWebhookEventPaymentNotification
