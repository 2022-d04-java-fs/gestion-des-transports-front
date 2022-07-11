import { Features } from './features';

export interface AddressList {
  type: string;
  version: string;
  features: Features[];
  attribution: string;
  licence: string;
  query: string;
  limit: number;
}
