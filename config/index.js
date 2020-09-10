export const BASE_URL = 'http://10.0.2.2:8000/api';
// export const BASE_URL = 'http://134.122.23.193/api';

export function createAction(type, payload) {
  return {
    type,
    payload
  };
}