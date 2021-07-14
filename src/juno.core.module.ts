import { DynamicModule, Global, Module, Provider, HttpModule } from '@nestjs/common';
import { JunoAsyncOptions, JunoOptions } from './interfaces';
import { JUNO_OPTIONS_PROVIDER } from './juno.constants';
import JunoProvider from './juno.provider';
import { JunoTokenModule } from './token/juno.token.module';
import { JunoClientModule } from './client/juno.client.module';

@Global()
@Module({
  imports: [
    HttpModule,
    JunoTokenModule,
    JunoClientModule,
  ],
  exports: [
    HttpModule,
    JunoTokenModule,
    JunoClientModule,
  ]
})
export default class JunoCoreModule {

  private static provider = {
    provide: JunoProvider,
    useFactory: (options: JunoOptions) => new JunoProvider(options),
    inject: [JUNO_OPTIONS_PROVIDER],
  };

  public static forRoot(options: JunoOptions): DynamicModule {
    return {
      module: JunoCoreModule,
      providers: [
        {
          provide: JUNO_OPTIONS_PROVIDER,
          useValue: options,
        },
        this.provider,
      ],
      exports: [
        JunoProvider,
        JUNO_OPTIONS_PROVIDER,
      ],
    };
  }

  public static forRootAsync(options: JunoAsyncOptions): DynamicModule {
    return {
      module: JunoCoreModule,
      providers: [
        this.createOptionsProvider(options),
        this.provider,
      ],
      exports: [
        JunoProvider,
        JUNO_OPTIONS_PROVIDER
      ],
    };
  }

  private static createOptionsProvider(options: JunoAsyncOptions): Provider {
    return {
      provide: JUNO_OPTIONS_PROVIDER,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
