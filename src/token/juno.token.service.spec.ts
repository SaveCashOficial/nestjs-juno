import { Test, TestingModule } from '@nestjs/testing';
import { JunoTokenService } from './juno.token.service';
import { JunoModule } from '..';
import ambience from '../config/ambience';
import { of } from 'rxjs';

describe('TokenService', () => {
  let service: JunoTokenService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JunoModule.forRootAsync({
          useFactory: async config => Promise.resolve(ambience),
        }),
      ],
    }).compile();

    service = module.get<JunoTokenService>(JunoTokenService);
    // mock token
    service.authorize = () => of({ access_token: '' } as any);
  });

  it('Service has be defined', () => {
    expect(service).toBeDefined();
  });

  it('Service http has be defined', () => {
    expect(service).toBeDefined();
  });

  it('check if the authorizationHash can be defined', async () => {
    expect(service.authorizationHash).toBeDefined();
  });

  it('check if the isAuthorized can be defined', async () => {
    expect(service.isAuthorized).toBeDefined();
  });
  it('check if the isAuthorized to be trutry', async () => {
    service.response = {};
    expect(service.isAuthorized).toBeTruthy();
  });

  it('check if the authorize can be defined', async () => {
    expect(service.authorize).toBeDefined();
  });
  it('check if the credentials method can be called', async () => {
    const credentials = await service.credentials();
    expect(credentials['access_token']).toBeDefined();
  });

  it('check if the authorize method can be called', async () => {
    const authorize = service.authorize();
    expect(authorize).toBeDefined();
  });
});
