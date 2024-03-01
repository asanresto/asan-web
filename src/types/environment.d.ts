namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_ACCESS_TOKEN_KEY: string;
    NEXT_PUBLIC_REFRESH_TOKEN_KEY: string;
    JWT_SECRET: string;
    PASSWORD_SALT_ROUNDS: string;
    ACCESS_TOKEN_TTL: string;
    REFRESH_TOKEN_TTL: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_PRESET: string;
  }
}
