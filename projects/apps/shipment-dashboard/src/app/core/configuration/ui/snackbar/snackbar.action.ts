import { UiText } from '@qls/utilities/i18n';

export enum SnackbarActionType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}

export interface SuccessSnackbarAction {
  type: SnackbarActionType.SUCCESS;
  message: UiText;
}

export interface WarningSnackbarAction {
  type: SnackbarActionType.WARNING;
  message: UiText;
}

export interface DangerSnackbarAction {
  type: SnackbarActionType.DANGER;
  message: UiText;
}

export type SnackbarAction = SuccessSnackbarAction | WarningSnackbarAction | DangerSnackbarAction;
