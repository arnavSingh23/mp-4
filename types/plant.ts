export type PlantListItem = {
    id: number;
    common_name?: string;
    scientific_name?: string[];
    default_image?: { thumbnail?: string; medium_url?: string };
    watering?: string;
    sunlight?: string[];
};

export type PlantDetails = PlantListItem & {
    description?: string;
    care_level?: string;
    watering_general_benchmark?: { value?: string; unit?: string };
    other_name?: string[];
    dimension?: string;
    cycle?: string;
};
