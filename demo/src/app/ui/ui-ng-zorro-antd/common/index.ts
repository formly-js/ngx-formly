import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';

export interface DebugFile {
  file: string;
  content: any;
  filecontent: any;
}

export interface ExampleConfig {
  title: string;
  component: any;
  debug: boolean;
  files: DebugFile[];
}
export interface NzDebugConfig {
  debugFields: FormlyFieldConfig[];
  exampleConfig: ExampleConfig;
}

export const NzSizeFieldConfig: FormlyFieldConfig = {
  key: 'nzSize',
  type: 'select',
  className: 'col-md-4',
  defaultValue: 'default',
  templateOptions: {
    label: 'nzSize',
    options: [
      { label: 'default', value: 'default' },
      { label: 'large', value: 'large' },
      { label: 'small', value: 'small' },
    ],
  },
};

export const NzAutoFocusFieldConfig: FormlyFieldConfig = {
  key: 'nzAutoFocus',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: false,
  templateOptions: {
    label: 'nzAutoFocus',
  },
};

export const NzDisabledFieldConfig: FormlyFieldConfig = {
  key: 'nzDisabled',
  type: 'checkbox',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzDisabled',
  },
};

export const NzValueFieldConfig: FormlyFieldConfig = {
  key: 'nzValue',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzValue',
  },
};

export const NzNameFieldConfig: FormlyFieldConfig = {
  key: 'nzName',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzName',
  },
};

export const NzPlaceHolderFieldConfig: FormlyFieldConfig = {
  key: 'nzPlaceHolder',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzPlaceHolder',
  },
};
