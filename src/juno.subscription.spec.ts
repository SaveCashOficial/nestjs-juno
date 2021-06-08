import { TestingModule, Test } from '@nestjs/testing';
import { JunoModule, JunoProvider } from './';
import ambience from './config/ambience';

describe('Juno subscription methods', () => {
  let module: TestingModule;
  let provider: JunoProvider;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
    }).compile();

    provider = module.get(JunoProvider);
  });

  it('Provider check', () => {
    expect(provider).toBeDefined();
  });
});
