import configUnits from './configs/units';
import configMemberships from './configs/memberships';
import configUsers from './configs/users';
import configGroups from './configs/groups';

export default function config() {
  configUnits(this);
  configMemberships(this);
  configUsers(this);
  configGroups(this);
}
