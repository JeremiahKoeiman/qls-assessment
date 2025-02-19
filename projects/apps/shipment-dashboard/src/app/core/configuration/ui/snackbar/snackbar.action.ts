export enum SnackbarActionType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}

export interface SuccessSnackbarAction {
  type: SnackbarActionType.SUCCESS;
  message: string;
}

export interface WarningSnackbarAction {
  type: SnackbarActionType.WARNING;
  message: string;
}

export interface DangerSnackbarAction {
  type: SnackbarActionType.DANGER;
  message: string;
}

export type SnackbarAction = SuccessSnackbarAction | WarningSnackbarAction | DangerSnackbarAction;
