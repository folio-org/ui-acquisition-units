import configUnits from './configs/units';
import configUsers from './configs/users';

export default function config() {
  configUnits(this);
  configUsers(this);
}
