import type { ApiOperationOptions } from "@nestjs/swagger";

type GroupRoute = "post_group" | "get_group" | "get_groupId" | "patch_groupId" | "delete_groupId";
export const groupDocs: Record<GroupRoute, ApiOperationOptions> = {
  post_group: {
    description: `The endpoint is used to create a new group within the system. A group is designed to organize
    members (users) and define the list of node application they can access.
    The endpoint requires administrative permissions and validates the provided group details,
    such as the group name and descriptions.`,
  },
  get_group: {
    description: `The endpoint retrieves a list of all groups in the system. Each group in the response includes details
    such as the group name, description, and the associated applications or nodes that members of the group can access.
    This endpoint typically requires authentication, and access may be restricted based on the user's role or permissions
    to ensure proper authorization`,
  },
  get_groupId: {
    description: `The endpoint retrieves detailed information about a specific group based on its unique identifier (**:id**).
    The response includes the group's name, description, the list of members (users) in the group,
    and the node applications that members can access. This endpoint requires authentication and appropriate permissions,
    and access may be restricted based on the user's role or administrative rights.
    If the group is not found, an error message will be returned.`,
  },
  patch_groupId: {
    description: `The endpoint allows authorized users to update specific properties of a group, such as the group's name
    and description, based on its unique identifier (**:id**). This update does not affect the group’s members
    or the applications/nodes associated with the group. Authentication and appropriate permissions are required
    to access this endpoint. The provided data is validated before being applied, and a confirmation message with
    the updated group details is returned upon success.`,
  },
  delete_groupId: {
    description: `The endpoint is used to delete a specific group from the system. When a group is deleted,
    users who were members of that group will no longer belong to any group until they are added to another group.
    This action requires administrative permissions and removes the group’s properties, such as its name, description,
    and associated access rights. Any access rights to applications or nodes tied to the group will also be revoked for the members.`,
  },
};
