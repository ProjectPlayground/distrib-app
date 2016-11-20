import { Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
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
    avatar: null,
    rememberLastLogin: false,
    autoclose: true,
    container: "authContainer",
    theme: {
      logo: "https://dl.dropboxusercontent.com/s/wd0og2bqy7z7uuk/Picture1.png?dl=0",
      primaryColor: "green"
    },
    socialButtonStyle: 'small',
    languageDictionary: {
      title: "Drive for the future!"
    },
    auth: {
      redirect: false,
      params: {
        scope: 'openid email offline_access'
      }
    }
  });

  // local: Storage = new Storage();
  refreshSubscription: any;
  user: any;
  zoneImpl: NgZone;

  constructor (
    public events: Events,
  	private authHttp: AuthHttp, 
  	zone: NgZone,
	) {
    this.zoneImpl = zone;
    if (localStorage.getItem('profile')) {
      this.user = JSON.parse(localStorage.getItem('profile'));
    }
    // Check if there is a profile saved in Storage (not necessarily localStorage)
    // this.local.get('profile').then(profile => {
    //   this.user = JSON.parse(profile);
    // }).catch(error => {
    //   console.log(error);
    // });
    this.lock.on('authenticated', authResult => {
      localStorage.setItem('id_token', authResult.idToken);
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
            localStorage.setItem('profile', JSON.stringify(profile));
            this.user = profile;
          },
          error => alert(error)
         );
      });
      // important to remove lock.hide() or keyboard doesnt hide
      localStorage.setItem('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
      // Schedule a token refresh
      this.scheduleRefresh();
      // Finished logging in
      this.events.publish('user:login');
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
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
    // Finished logging out
    this.events.publish('user:logout');
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = this.authHttp.tokenStream.flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });
    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });
      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    if (localStorage.getItem('refresh_token')) {
      let token = localStorage.getItem('refresh_token');
      this.auth0.refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        localStorage.setItem('id_token', delegationRequest.id_token);
      });
    } else {
      console.log('error');
    }
    // this.local.get('refresh_token').then(token => {
    //   this.auth0.refreshToken(token, (err, delegationRequest) => {
    //     if (err) {
    //       alert(err);
    //     }
    //     this.local.set('id_token', delegationRequest.id_token);
    //   });
    // }).catch(error => {
    //   console.log(error);
    // });
  }

}