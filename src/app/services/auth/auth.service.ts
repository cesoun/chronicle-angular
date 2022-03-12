import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../core/interfaces/api/users";
import { ChronicleConfig } from "../../config/config";
import { TokenResponse } from "../../core/interfaces/api/tokens";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}

	/**
	 * Login with a given username and password.
	 * @param username
	 * @param password
	 */
	login(username: string, password: string): Observable<TokenResponse> {
		return this.http.post<TokenResponse>(`${ChronicleConfig.API}/login`, {
			username,
			password,
		});
	}

	/**
	 * Register with a given username, password and email.
	 * @param username
	 * @param password
	 * @param email
	 */
	register(
		username: string,
		password: string,
		email: string
	): Observable<TokenResponse> {
		return this.http.post<TokenResponse>(
			`${ChronicleConfig.API}/register`,
			{
				username,
				email,
				password,
			}
		);
	}
}
