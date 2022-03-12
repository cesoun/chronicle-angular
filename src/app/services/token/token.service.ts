import { Injectable } from "@angular/core";

/*
  Tokens are passed during SignUp + Login.
  There isn't a refresh token atm so users will need to refresh them by
    logging in again.

  JWT token format:
  {
    iss: string (domain)
    sub: string (username)
    iat: number (issued at)
    exp: number (expires at)
  }
 */

@Injectable({
	providedIn: "root",
})
export class TokenService {
	constructor() {}

	/**
	 * Clear the session when we logout.
	 */
	logout(): void {
		sessionStorage.clear();
	}

	/**
	 * Writes the token to session storage as JWT
	 * @param token
	 */
	public saveToken(token: string): void {
		sessionStorage.setItem("access_token", token);
	}

	/**
	 * Reads the token from session storage or returns null if missing
	 */
	public getToken(): string | null {
		return sessionStorage.getItem("access_token");
	}
}
