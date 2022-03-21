import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserUpdate } from "../../core/interfaces/api/users";
import { ChronicleConfig } from "../../config/config";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	/**
	 * Get a User by Username
	 * @param username
	 */
	getUserByUsername(username: string): Observable<User> {
		return this.http.get<User>(
			`${ChronicleConfig.API}/user/username/${username}`
		);
	}

	/**
	 * Get a User by Id
	 * @param id
	 */
	getUserById(id: number): Observable<User> {
		return this.http.get<User>(`${ChronicleConfig.API}/user/id/${id}`);
	}

	/**
	 * Put a User by Id
	 * @param id
	 * @param body
	 */
	putUserById(id: number, body: UserUpdate): Observable<object> {
		return this.http.put(`${ChronicleConfig.API}/user/id/${id}`, body);
	}

	/**
	 * Delete a User by Id.
	 * @param id
	 */
	deleteUserById(id: number): Observable<object> {
		return this.http.delete(`${ChronicleConfig.API}/user/id/${id}`);
	}
}
