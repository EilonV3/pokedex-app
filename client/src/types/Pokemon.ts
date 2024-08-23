export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    types: string[];
    isLegendary: boolean;
    isCaught: boolean;
}