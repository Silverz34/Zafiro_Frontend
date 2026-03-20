export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      onboardingCompleto?: boolean;
    };
  }
}