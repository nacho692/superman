import { Category } from './category';

export class PointOfInterest {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    categories: Category[];
    image_url: string = "";
    should_show: boolean;
}
