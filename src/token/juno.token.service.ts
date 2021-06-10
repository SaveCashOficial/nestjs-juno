import { Injectable, HttpService, Inject } from '@nestjs/common';
import { JunoOptions } from '..';
import {
  JUNO_OPTIONS_PROVIDER,
  JUNO_WEBHOOK_AUTHORIZATION_SERVER_POST,
} from '../juno.constants';

@Injectable()
export class JunoTokenService {
  response: any;
  constructor(
    public httpService: HttpService,
    @Inject(JUNO_OPTIONS_PROVIDER)
    private options: JunoOptions,
  ) { }
  get authorizationHash() {
    return Buffer.from(
      [this.options.clientId, this.options.clientSecret].join(':'),
    ).toString('base64');
  }
  get isAuthorized() {
    if (this.response == undefined) return false;
    return true;
  }
  async credentials() {
    if (!this.isAuthorized) this.response = await this.authorize().toPromise();
    return this.response;
  }
  authorize() {
    return this.httpService.post(
      [this.options.endpoint, JUNO_WEBHOOK_AUTHORIZATION_SERVER_POST].join(
        '/',
      ),
      `grant_type=${encodeURIComponent('client_credentials')}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + this.authorizationHash,
        },
      },
    );
  }
}
