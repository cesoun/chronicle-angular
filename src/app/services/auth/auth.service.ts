import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ChronicleConfig } from "../../config/config";
import { TokenResponse } from "../../core/interfaces/api/tokens";
import { TokenService } from "../token/token.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	// User state.
	private _isLoggedIn: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	public isLoggedIn: BehaviorSubject<boolean> = this._isLoggedIn;

	constructor(private http: HttpClient, private tokenService: TokenService) {
		const token = tokenService.getToken();

		if (!token) {
			this.setLoggedIn(false);
		}

		// If token is not expired, true, else false.
		this.setLoggedIn(!new JwtHelperService().isTokenExpired(token!));
	}

	getUsernameFromToken(): string {
		const token = this.tokenService.getToken();
		if (!token) {
			return "???";
		}

		const decodedToken = new JwtHelperService().decodeToken(token);
		const username = decodedToken["sub"];

		return username ? username : "???";
	}

	/**
	 * Update the value of isLoggedIn.
	 * @param value
	 */
	setLoggedIn(value: boolean): void {
		this._isLoggedIn.next(value);
	}

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
