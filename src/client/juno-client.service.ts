import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JunoTokenService } from './../token/juno.token.service';

@Injectable()
export class JunoClientService {
  created = false;
  constructor(
    private httpService: HttpService,
    public junoTokenService: JunoTokenService,
  ) { }
  initInterceptor() {
    this.httpService.axiosRef.defaults.withCredentials = true;
    this.httpService.axiosRef.defaults.baseURL = this.junoTokenService.baseUrl;
    this.httpService.axiosRef.interceptors.request.use(request =>
      this.createRequest(request),
    );
  }
  async createRequest(request) {
    if (request.withCredentials == false) {
      delete request.headers.withCredentials;
      return request;
    }
    try {
      const credentials = await this.junoTokenService.credentials();
      request.headers.common.Authorization = [
        credentials.data['token_type'],
        credentials.data['access_token'],
      ].join(' ');
      request.headers.common['X-Api-Version'] = 2;
      request.headers.common[
        'X-Resource-Token'
      ] = this.junoTokenService.privateToken;
    } catch (error) {
      console.log('Erro ao autenticar com a JUNO.');
    }
    return request;
  }
  get http() {
    if (this.created == false) this.initInterceptor();
    return this.httpService;
  }
}
