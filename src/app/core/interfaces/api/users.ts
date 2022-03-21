export enum UserRole {
	Banned = "banned",
	User = "user",
	Admin = "admin",
}

export interface User {
	id?: number;
	username: string;
	password?: string;
	hash?: string;
	first_name: string;
	last_name: string;
	email?: string;
	role: UserRole;
}

export interface UserUpdateFields {
	username?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	password?: string;
	role?: UserRole;
}

export interface UserUpdate {
	new: UserUpdateFields;
	password: string;
}
