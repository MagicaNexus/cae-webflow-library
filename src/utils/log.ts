/* eslint-disable no-console */
import { isLocal } from '$global/settings';

export function log(message: any) {
  if (isLocal) console.log(message);
}

export function logAll(message: any) {
  console.log(message);
}
