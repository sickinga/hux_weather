export interface GeocoderContext {
    id: string;
    wikidata: string;
    text: string;
}

export interface GeocoderFeature {
    id: string;
    type: 'Feature';
    place_type: Array<string>;
    relevance: number;
    properties: object;
    address: string;
    text: string;
    place_name: string;
    bbox: [number, number, number, number];
    center: [number, number];
    geometry: Point;
    context: Array<GeocoderContext>;
}

export interface GeocoderResult {
    type: 'FeatureCollection';
    query: Array<string | number>;
    features: Array<GeocoderFeature>;
    attribution: string;
}