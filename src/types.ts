export interface Bike {
  date_stolen: number;
  description: string;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: null | string;
  manufacturer_name: string;
  external_id: null | string;
  registry_name: null | string;
  registry_url: null | string;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: [number, number];
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}
