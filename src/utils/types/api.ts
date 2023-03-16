type ResponseStatus = 'success' | 'fail';

// Counter
export type Counter$Get$Response = {
  value: number;
};

// Auth
export type Auth$Login$Response = {
  status: 'success' | 'fail';
  data: any;
};
