import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getGoogleToken() {
  
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const response = await (await clerkClient()).users.getUserOauthAccessToken(
    userId,
    "oauth_google"
  );

 const token = response.data[0]?.token;  
  if (!token) {
    throw new Error("No se encontró el token de Google Calendar. El usuario debe reconectar su cuenta.");
  }
  return token;
}