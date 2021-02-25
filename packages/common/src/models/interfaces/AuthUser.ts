export interface AuthUser {
    id: number;
    username: string;
    password: string;
    email: string;
    role: "user" | "admin";
    provider: "basic" | "google" | "facebook";
    resetToken?: string;
    resetTokenExpiration?: Date;
}
