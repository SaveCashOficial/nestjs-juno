import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InjectJunoProvider, JunoModule, JunoProvider, JUNO_OPTIONS_PROVIDER } from './';
import ambience from './config/ambience';

describe('Juno Module', () => {
  it('Does it instance with options using registry', async () => {
    const module = await Test.createTestingModule({
      imports: [
        JunoModule.forRoot(ambience),
      ],
    }).compile();

    const options = module.get(JUNO_OPTIONS_PROVIDER);
    const provider = module.get<JunoProvider>(JunoProvider);

    expect(options.clientId).toBe(ambience.clientId);
    expect(options.clientSecret).toBe(ambience.clientSecret);
    expect(provider).toBeInstanceOf(JunoProvider);
  });

  it('Does it instance with options using async registry', async () => {
    const module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
    }).compile();

    const options = module.get(JUNO_OPTIONS_PROVIDER);
    const provider = module.get<JunoProvider>(JunoProvider);

    expect(options.clientId).toBe(ambience.clientId);
    expect(options.clientSecret).toBe(ambience.clientSecret);
    expect(provider).toBeInstanceOf(JunoProvider);
  });

  it('JunoProvider is avaliable to providers', async () => {
    class TestProvider {
      constructor(
        @InjectJunoProvider()
        private readonly junoProvider: JunoProvider,
      ) { }

      getProvider(): JunoProvider {
        return this.junoProvider;
      }
    }

    const module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
      providers: [TestProvider],
    }).compile();

    const provider = module.get<TestProvider>(TestProvider);

    expect(provider.getProvider()).toBeInstanceOf(JunoProvider);
  });
  it('JunoModule.forFeature', async () => {
    @Module({
      imports: [JunoModule.forFeature()],
    })
    class TestModule { }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
        TestModule,
      ],
    }).compile();

    const testProvider = module.select(TestModule).get(JunoProvider);

    expect(testProvider).toBeInstanceOf(JunoProvider);
  });
});
