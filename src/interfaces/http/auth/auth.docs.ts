import type { ApiOperationOptions } from "@nestjs/swagger";

type AuthRoute = "post_signup" | "post_signin" | "get_token" | "delete_signout";
export const authDocs: Record<AuthRoute, ApiOperationOptions> = {
  post_signup: {
    description: `The endpoint allows users to create a new account in the system by providing their
    personal information, such as a username and password. This endpoint validates the provided data,
    ensures the uniqueness of the username, and securely stores the user's credentials`,
  },
  post_signin: {
    description: `The endpoint allows users to log into the system by providing their credentials,
    typically a username and a password. The endpoint validates the provided information,
    verifies the user's existence, and checks the correctness of the password. Upon successful authentication,
    it returns an access token that the user can use to access protected resources.
    If the credentials are invalid, an error message is returned.`,
  },
  get_token: {
    description: `The endpoint is used to generate a new access token, typically as part of a token refresh process.
    This endpoint requires a valid refresh token to authenticate the request.
    Upon validation, it issues a new access token that can be used to access protected resources without
    requiring the user to log in again. If the refresh token is invalid or expired, an error message is returned.`,
  },
  delete_signout: {
    description: `The endpoint is used to log the user out of the system. It deletes the refresh token associated with the user
    and invalidates any active access tokens. This ensures that the user’s session is securely terminated,
    preventing unauthorized access. A success message is returned upon completion, and any further use of
    the tokens will be rejected.`,
  },
};
