import { isLocal } from '$global/settings';

export function log(message: string) {
  // eslint-disable-next-line no-console
  if (isLocal) console.log(message, isLocal);
}
