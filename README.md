
<h1 align="center">Nestjs Juno</h1>

<p align="center">
  Desenvolvido por:
    <img src="https://dev.juno.com.br/juno.2.0.png"/ style="width: 200px"> <img style="width: 200px" src="https://savecash.com.br/saveCashTeam/images/logo-color.svg"/>  

</p>

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