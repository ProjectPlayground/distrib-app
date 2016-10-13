import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var Auth0: any;
declare var Auth0Lock: any;

export class Auth0Vars {
  static AUTH0_CLIENT_ID = "mtQanzM5F1P2NXQLFptakp6MsDRYAhpP";
  static AUTH0_DOMAIN = "distrib.auth0.com";
}

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({ clientID: Auth0Vars.AUTH0_CLIENT_ID, domain: Auth0Vars.AUTH0_DOMAIN });
  lock = new Auth0Lock(Auth0Vars.AUTH0_CLIENT_ID, Auth0Vars.AUTH0_DOMAIN, {
    redirect: false,
    autoclose: true,
    avatar: null,
    closable: false,
    rememberLastLogin: false,
    theme: {
      logo: "https://dl.dropboxusercontent.com/s/wd0og2bqy7z7uuk/Picture1.png?dl=0",
      primaryColor: "green"
    },
    socialButtonStyle: 'small',
    languageDictionary: {
      title: "Welcome to the future!"
    },
    auth: {
      redirect: false,
      params: {
        scope: 'openid email offline_access',
      },
      // responseType: "token",
      sso: true
    }
  });

  local: Storage;
  refreshSubscription: any;
  user: any;
  zoneImpl: NgZone;

  constructor (
    public events: Events,
  	private authHttp: AuthHttp, 
  	zone: NgZone,
    local: Storage
	) {
    this.zoneImpl = zone;
    this.local = local;
    this.lock.show();

    // if(window.localStorage.getItem('profile'))
    // this.user = window.localStorage.getItem('profile');

    // Check if there is a profile saved in local storage
    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.lock.on('authenticated', authResult => {
      // window.localStorage.setItem('id_token', authResult.idToken);
      this.local.set('id_token', authResult.idToken);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }
        this.authHttp.get('https://server-distrib.rhcloud.com/api/users/me')
        .map(res => res.json())
        .subscribe(
          data => {
            profile.user_metadata = profile.user_metadata || {};
            profile = Object.assign(profile, data)
            // window.localStorage.setItem('profile', JSON.stringify(profile));
            this.local.set('profile', JSON.stringify(profile));
            this.user = profile;
          },
          error => alert(error)
         );
      });
      this.lock.hide();
      this.events.publish('user:login');
      // window.localStorage.setItem('refresh_token', authResult.refreshToken);
      this.local.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
    });
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.hide();
    this.lock.show();
  }

  public logout() {
    this.events.publish('user:logout');
    // window.localStorage.removeItem('profile');
    // window.localStorage.removeItem('id_token');
    // window.localStorage.removeItem('refresh_token');
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
  }

}