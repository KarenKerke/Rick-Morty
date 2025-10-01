export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  address: {
    street: string;
    city: string;
    country: string;
    zip: number
  };
}
