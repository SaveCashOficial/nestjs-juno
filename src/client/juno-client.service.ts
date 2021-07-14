import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JunoTokenService } from './../token/juno.token.service';

@Injectable()
export class JunoClientService {
  created = false;
  constructor(
    private httpService: HttpService,
    public junoTokenService: JunoTokenService,
  ) {}
  initInterceptor() {
    this.httpService.axiosRef.interceptors.request.use(this.createRequest);
  }
  async createRequest(request) {
    const credentials = await this.junoTokenService.credentials();
    request.headers.common.Authorization =
      'Basic ' + credentials['access_token'];
    return request;
  }
  get http() {
    if (this.created == false) this.initInterceptor();
    return this.httpService;
  }
}
