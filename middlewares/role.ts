import IRoleMappingDocument from "../interfaces/IRoleMapping";
import RoleMapping from "../models/role-mapping.model";

const extractUserRole = async (user: String): Promise<IRoleMappingDocument | Error> => {
  try {
    const userRole = await RoleMapping.findOne({ user });
    if (!userRole)
      return new Error("Unauthorized");

    return userRole;
  } catch (e) {
    return new Error("Unauthorized");
  }
}

export default extractUserRole;
