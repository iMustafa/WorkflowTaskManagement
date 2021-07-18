import Roles from "../models/role.model";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_ROLES = process.env.ROLES?.split(",");

(async () => {
  if (!DEFAULT_ROLES) {
    console.log('>> No default roles provided');
    process.exit(0);
  }

  try {
    const createdRoles = await Roles.find({});
    const rolesCreated = createdRoles.every(role => DEFAULT_ROLES.includes(role.name));

    if (rolesCreated)
      return true;

    const createRoles = await Roles.create(
      DEFAULT_ROLES.map(role => ({ name: role }))
    );

    return createRoles;

  } catch (e) {
    console.log('>> Unable to create roles');
    process.exit(0);
  }
})();
