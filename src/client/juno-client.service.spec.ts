import { Test } from '@nestjs/testing';
import { JunoModule } from '..';
import ambience from '../config/ambience';
import { JunoClientService } from './juno-client.service';
import { of } from 'rxjs';
import { JunoTokenService } from '../token/juno.token.service';

describe('JunoClientService', () => {
  let service: JunoClientService;
  let serviceMock: JunoTokenService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
    }).compile();
    serviceMock = module.get<JunoTokenService>(JunoTokenService);
    // mock token
    serviceMock.authorize = () => of({ access_token: '' } as any);
    service = module.get<JunoClientService>(JunoClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('mock authorization', async () => {
    expect((await serviceMock.credentials())['access_token']).toBe('');
  });
  it('initInterceptor', () => {
    expect(service.initInterceptor).toBeDefined();
  });

  it('createRequest', async () => {
    expect(service.createRequest({ headers: { common: {} } })).toBeDefined();
  });
  it('http', () => {
    expect(service.http).toBeDefined();
  });
});
