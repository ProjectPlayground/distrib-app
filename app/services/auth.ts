import { Events, Storage, LocalStorage } from 'ionic-angular';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: 'mtQanzM5F1P2NXQLFptakp6MsDRYAhpP', domain: 'distrib.auth0.com'});
  lock = new Auth0Lock('mtQanzM5F1P2NXQLFptakp6MsDRYAhpP', 'distrib.auth0.com', {
    container:'authContainer',
    auth: {
      redirect: false,
      params: {
        scope: 'openid email',
      }
    },
    theme: {
      labeledSubmitButton: false
    },
    languageDictionary: {
      title: "Distrib Inc."
    }
  });
  local: Storage = new Storage(LocalStorage);
  refreshSubscription: any;
  user: any;
  zoneImpl: NgZone;
  
  constructor(private authHttp: AuthHttp, zone: NgZone, public events: Events) {

    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });
    this.lock.on('authenticated', authResult => {
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
            this.local.set('profile', JSON.stringify(profile));
            this.user = profile;
          },
          error => alert(error)
         );
      });
      this.events.publish('user:login');
      this.lock.hide();
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
    this.lock.show();    
  }
  
  public logout() {
    this.events.publish('user:logout');
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
  }
}