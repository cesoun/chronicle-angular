export interface Config {
	API: string;
}

/**
 * Contains the Configuration settings used within the application.
 * TODO: Convert to environment variables.
 */
export const ChronicleConfig: Config = {
	API: "https://api.heckin.dev/v1",
	// API: "http://localhost:3000",
};
