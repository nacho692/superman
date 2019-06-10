import {
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("68076431524-jm2vr8hf2t6t1g7k3ef84kt309l37gbm.apps.googleusercontent.com")
  }
]);


export function provideConfig() {
  return config;
}