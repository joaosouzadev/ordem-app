export const BASE_URL = 'http://10.0.2.2:8000/api';

export function createAction(type, payload) {
	console.log('dasdad');
  return {
    type,
    payload
  };
}