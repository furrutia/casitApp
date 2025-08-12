interface Location {
    neighborhood: string;
    locality: string;
    googleMapsLink: string; // Link to Google Maps
}
interface Value {
    amount: number;
    currency: string; // e.g., "USD", "EUR"
    expenses: number;
}
interface Area {
    totalArea: number;
    coveredArea: number;
    unit: string; // e.g., "m²", "ft²"
}
interface Features {
    rooms: number;
    bathrooms: number;
    age: number;
    type: string;
}
export interface House {
    id: number;
    description: string;
    value: Value;
    area: Area;
    status: string;
    images: string[];
    location: Location;
    features: Features;
    isFavorite: boolean;
}