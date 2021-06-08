import 'reflect-metadata';
import { JUNO_WEBHOOK_METHOD } from '../../juno.constants';

export const JunoWebhookMethodDecorator = (method) => (): MethodDecorator => {
  return (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(
      JUNO_WEBHOOK_METHOD,
      method,
      descriptor.value,
    );
    return descriptor;
  };
};
