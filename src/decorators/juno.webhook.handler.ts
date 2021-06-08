import { JUNO_WEBHOOK_PROVIDER } from './../juno.constants';

export const JunoWebhookHandler = (): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(JUNO_WEBHOOK_PROVIDER, true, target);
  };
};
