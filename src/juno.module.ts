import { Module, DynamicModule } from '@nestjs/common';
import { JunoOptions, JunoAsyncOptions } from './interfaces';
import JunoCoreModule from './juno.core.module';

@Module({
})
export default class JunoModule {

  public static forRoot(options: JunoOptions): DynamicModule {
    return {
      module: JunoModule,
      imports: [JunoCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: JunoAsyncOptions): DynamicModule {
    return {
      module: JunoModule,
      imports: [JunoCoreModule.forRootAsync(options)],
    };
  }

  public static forFeature(): DynamicModule {
    return {
      module: JunoModule,
      imports: [JunoCoreModule],
    };
  }
}
