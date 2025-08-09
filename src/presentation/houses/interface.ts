export interface Location {
    neighborhood: string;
    googleMapsLink: string; // Link to Google Maps
}

export interface Features {
    rooms: number;
    bathrooms: number;
    age: number;
    surfaceArea: number;
    type: string;
}

export interface House {
    id: number;
    description: string;
    value: number;
    expenses: number;
    status: string;
    images: string[];
    location: Location;
    features: Features;
}