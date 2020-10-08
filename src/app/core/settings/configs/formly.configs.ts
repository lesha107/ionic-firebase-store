import { ConfigOption } from '@ngx-formly/core';

const FORMLY_TYPES = [];

const FORMLY_VALIDATION_MESSAGES = [
  {
    name: 'required',
    message: 'This field is required',
  },
];

export const FORMLY_CONFIGS: ConfigOption = {
  validationMessages: FORMLY_VALIDATION_MESSAGES,
  types: FORMLY_TYPES,
};
