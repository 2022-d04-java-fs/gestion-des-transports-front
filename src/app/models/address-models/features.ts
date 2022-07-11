import { Geometry } from './geometry';
import { Properties } from "./properties";

export interface Features {
  type: string,
  geometry: Geometry,
  properties:Properties
}
