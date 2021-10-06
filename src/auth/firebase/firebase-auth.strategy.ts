import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';

const firebase_params = {
  type: "service_account",
  projectId: "nestjsauth-122e6",
  privateKeyId: "dd7659ce99f4c9efe30a740561d8a1b75d9c585d",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHCClZLKQpJmSE\nBIsruYxYzpgNn8fk+c+1fDCEbDdxOIq1BWlPq4IAmtIE87ZU18DHg4YADXFq7dk2\nROpNs3kqKqLRNy1tdC+oH0MBaj8dcJgZjf+jga7cbV3Y6CKhlEAjkXN0Bbu7+8Vx\n5bogv2YR9W+FwwB/r8qRQ+4b/DDcTx3xzuGsm6kuG08gvWttMv7diSsWiUwY5PmU\nVQ99y80wU+6SbpYc4IE8dgwxJw81k5Xd5LS6wNQ3dhQbKdsDdKMKToowwFidfOwF\n/RBZdoypReKGSvcupheJ/dh8PZpcCSbie6hWLI6mZDXIhIIEpXLjdMZ5pxU2LYVK\nCR/RdFG9AgMBAAECggEALi1rVHx6QO7eqs+YD4a+9HrIRf7whKReB9wesJaf/WWS\nLwIopxqicKv69rmpr8EYAeI2xIvZ6OZyuzfdibYOclVOjc5ovIiUpwPLysgBCT5O\nl709lsy3in5YZAMlx8nK4MW2HPDYl/qH2o9jcgYeMyP34je2Ram+TJpPZBBMsMxE\nFpJD3umc6yLRCtx56zEOZugrGerJf2qqfR5eMNqmZwX/B1AISU20/MaKVgz3Rxwm\nFDId8I0cLwssGXMsrBBKoJvXTRraRPMBaF3GTtQEXXBT8M29GgF52RawtCteLDQS\nJd3d3xHBHAWBeaOYOXA3C7LRLKrZJNnykvMKphTfUQKBgQD6Y2ZJbEIKCzJvA+pa\nxxHpqBOvFKL/hgbDyzk4CLPpAeyiWgT7ZyJ+Bzlro3ykFCtRUmu74WHyUWxAabpw\navc+XNUV96Mg0vktU+X9zPA0B3mQTM4OT3LtOSDoSOFxvN16xtBAaTbV+uqk/yNG\nZGBQbXBtPNR5rJjjBvKfG0obzQKBgQDLfhrnluJ6burXn8XKA3/fsOsSuGGxl5vf\nXDBUlLoozZV7psLANhkXitLZ7g+dquTIFLkPs5fnKVtED4dUjY4leL93C0mRHGXD\nCqVchp5CSFf68Wm3xwAnX2V1dlRPuQxPDP4FlxNovkmYRr7xGYNu8PmHeXmcIs5e\n9fI/ljR9sQKBgHwoJ8NGpCR40uRLi7zBs3cqOcB6Oiz8V4Rk1BWd8yAaLS1/97J1\nvJvDl0xxf8+YlLY5aWR7aOcQSt5RzvoJgFnzDFJdPg17r8UzMfs80OrrvfK4swBT\nkwhgaJnl8axFW4mS5hbaVS+bwRhZzzMLeNrIuZPhMva2iAUjH9GXZZMNAoGBALT+\nZgnEr448Z47/4hmLQUqB/qP48ZPXCGIDik1At8+hA6smqSPzOiAxbtc9ohAXt0Or\nAutPTvXhV/bSZQk0mtEDdDD7DiUOgAiZyHjil5LW68IcxW4bhyx98i0m4VjDe4o4\nQRxRwoawcZ8Klby2d6vOk/MGfb79Slc2JJCgFfIRAoGBAOEPzkSPfMwTLE0b4q8R\nvCikgzrjsgA6rooThkzLOEiSzcbWWFOUjditcJWgMToimgnmCiwOHYvXmDBK1+ni\n64osejoVjs+eocYgtc6c0Lw+jAyVPKlo+DxE2Bz4U2ZmArTT1X06YMGW2TfLEj7q\n8jlIeoFIvvmBMQlaBKuFeLH0\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-9fl94@nestjsauth-122e6.iam.gserviceaccount.com",
  clientId: "102214155481395625299",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientC509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9fl94%40nestjsauth-122e6.iam.gserviceaccount.com",
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      // databaseURL: '',
    });
  }

  async validate(token: string) {
    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);

        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    return firebaseUser;
  }
}
