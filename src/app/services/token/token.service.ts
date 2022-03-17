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
    // scopes ...
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
		localStorage.removeItem("access");
	}

	/**
	 * Writes the token to session storage as JWT
	 * @param token
	 */
	public saveToken(token: string): void {
		localStorage.setItem("access", token);
	}

	/**
	 * Reads the token from session storage or returns null if missing
	 */
	public getToken(): string | null {
		return localStorage.getItem("access");
	}
}
