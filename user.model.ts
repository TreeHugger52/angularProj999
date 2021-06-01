export class User {
  constructor(public uid: string, public isAdmin: string, private _jwt: string, private _jwtExpiration: Date) {}

  get token() {
    // if token expiration is null or if token expired, leave getter
    if (!this._jwtExpiration || new Date() > this._jwtExpiration) {
      return null;
    }
    return this._jwt;
  }
}
