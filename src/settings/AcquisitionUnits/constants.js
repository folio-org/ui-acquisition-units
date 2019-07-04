import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ACQUISITIONS_UNITS_API = 'acquisitions-units/units';

export const LIMIT_MAX = 2147483647;

export const ACCORDIONS = {
  GENERAL_INFO: 'generalInfo',
  ACTION_PERMISSIONS: 'actionPermissions',
};

export const ACCORDION_LABELS = {
  [ACCORDIONS.GENERAL_INFO]: <FormattedMessage id="ui-acquisition-units.accordion.generalInfo" />,
  [ACCORDIONS.ACTION_PERMISSIONS]: <FormattedMessage id="ui-acquisition-units.accordion.actionPermissions" />,
};

export const ACTIONS = {
  HANDLE_EXPAND_ALL: 'handleExpandAll',
  TOGGLE_SECTION: 'toggleSection',
};
