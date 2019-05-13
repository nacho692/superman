import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { CATEGORIES } from './categories';

export const POIS: PointOfInterest[] = [
    { id: 1, name: "La Birreria", description: "Tienen un arcade con windjammers +10", latitude: -34.556578, longitude: -58.452443, categories: [CATEGORIES[0], CATEGORIES[1]] },
    { id: 2, name: "El gato y la caja negra y la luna y los gatos", description: "Buenos chorizos", latitude: -34.561637, longitude: -58.463049, categories: [CATEGORIES[0]] },
    { id: 3, name: "On Tap", description: "Me gustan los condimentos", latitude: -34.583137, longitude: -58.433931, categories: [CATEGORIES[0]] },
    { id: 4, name: "Museo de ciencias naturales", description: "Buenos dinosaurios", latitude: -34.605045, longitude: -58.437525, categories: [CATEGORIES[4]] }
]