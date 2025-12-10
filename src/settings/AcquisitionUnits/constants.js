import { FormattedMessage } from 'react-intl';

export const USER_GROUPS_API = 'groups';

export const LIMIT_MAX = 2147483647;

export const ACCORDIONS = {
  GENERAL_INFO: 'generalInfo',
  ACTION_PERMISSIONS: 'actionPermissions',
  MEMBERSHIPS: 'memberships',
};

export const ACCORDION_LABELS = {
  [ACCORDIONS.GENERAL_INFO]: <FormattedMessage id="ui-acquisition-units.accordion.generalInfo" />,
  [ACCORDIONS.ACTION_PERMISSIONS]: <FormattedMessage id="ui-acquisition-units.accordion.actionPermissions" />,
  [ACCORDIONS.MEMBERSHIPS]: <FormattedMessage id="ui-acquisition-units.accordion.memberships" />,
};

export const ACTIONS = {
  HANDLE_EXPAND_ALL: 'handleExpandAll',
  TOGGLE_SECTION: 'toggleSection',
};
