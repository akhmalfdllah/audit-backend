import type { ApiOperationOptions } from "@nestjs/swagger";

type UserRoute = "get_user" | "get_userGroup" | "patch_user" | "get_userId" | "patch_userId";
export const userDocs: Record<UserRoute, ApiOperationOptions> = {
  get_user: {
    description: `The endpoint (when used to list users) retrieves a collection of user profiles available in the system.
    This includes non-sensitive public information for each user, such as usernames, display names, or other
    profile-related data. Sensitive information, such as passwords or private tokens, is excluded.
    The endpoint may support optional filters or pagination to manage the returned data efficiently`,
  },
  get_userGroup: {
    description: `The endpoint will retrieve detailed information about the group associated with the currently
    authenticated user, including the group's unique identifier, name, description, the number of members,
    and a list of applications accessibleto the group.`,
  },
  patch_user: {
    description: `The endpoint is used to update the authenticated user's personal properties, such as username, password,
    or other customizable fields. The endpoint requires authentication and validates the provided data before applying changes`,
  },
  get_userId: {
    description: `The endpoint retrieves the public details of a specific user based on their unique identifier (**:id**).
    This includes non-sensitive information such as the user's username, display name, or other profile-related data.
    Sensitive information like passwords or private tokens is excluded.`,
  },
  patch_userId: {
    description: `The endpoint allows authorized users, such as super admins, to update specific properties of a user's account.
    This includes administrative fields such as **role**, **group**, or other non-personal settings.
    Authentication and appropriate permissions are required to access this endpoint.
    The provided data is validated before being applied to ensure consistency and security`,
  },
};
