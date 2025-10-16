// Types for Strava "Get Activity" response
// Note: Strava IDs can exceed JS safe integer range; handle them as string | number.
export type StravaID = string | number;
export type LatLng = [number, number];

export type StravaActivityType =
    | 'Ride'
    | 'Run'
    | 'Swim'
    | 'Walk'
    | 'Hike'
    | 'Workout'
    | 'EBikeRide'
    | 'VirtualRide'
    | string;

export type StravaSportType =
    | 'MountainBikeRide'
    | 'RoadRide'
    | 'GravelRide'
    | 'EBikeRide'
    | 'Ride'
    | 'Run'
    | 'VirtualRide'
    | string;

export interface StravaRef {
    id: StravaID;
    resource_state: number;
}

export type StravaAthleteSummary = StravaRef

export interface StravaActivityMap {
    id?: string | null;
    polyline?: string | null;
    resource_state?: number;
    summary_polyline?: string | null;
}

export interface StravaSegment {
    id: StravaID;
    resource_state: number;
    name: string;
    activity_type: string;
    distance: number;
    average_grade: number;
    maximum_grade: number;
    elevation_high: number;
    elevation_low: number;
    start_latlng?: LatLng | null;
    end_latlng?: LatLng | null;
    climb_category?: number;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    private?: boolean;
    hazardous?: boolean;
    starred?: boolean;
}

export interface StravaSegmentEffort {
    id: StravaID;
    resource_state: number;
    name: string;
    activity: StravaRef;
    athlete: StravaRef;
    elapsed_time: number;
    moving_time: number;
    start_date: string; // ISO 8601
    start_date_local: string; // ISO 8601
    distance: number;
    start_index?: number;
    end_index?: number;
    average_cadence?: number | null;
    device_watts?: boolean;
    average_watts?: number | null;
    segment: StravaSegment;
    kom_rank?: number | null;
    pr_rank?: number | null;
    achievements?: unknown[];
    hidden?: boolean;
}

export interface StravaSplit {
    distance: number;
    elapsed_time: number;
    elevation_difference?: number;
    moving_time: number;
    split: number;
    average_speed: number;
    pace_zone?: number;
}

export interface StravaLap {
    id: StravaID;
    resource_state: number;
    name: string;
    activity: StravaRef;
    athlete: StravaRef;
    elapsed_time: number;
    moving_time: number;
    start_date: string; // ISO 8601
    start_date_local: string; // ISO 8601
    distance: number;
    start_index?: number;
    end_index?: number;
    total_elevation_gain?: number;
    average_speed?: number;
    max_speed?: number;
    average_cadence?: number | null;
    device_watts?: boolean;
    average_watts?: number | null;
    lap_index?: number;
    split?: number;
}

export interface StravaGear {
    id: string;
    primary?: boolean;
    name?: string;
    resource_state?: number;
    distance?: number;
}

export interface StravaPhotoPrimary {
    id: StravaID | null;
    unique_id?: string;
    urls: Record<string, string>;
    source?: number;
}

export interface StravaPhotos {
    primary?: StravaPhotoPrimary | null;
    use_primary_photo?: boolean;
    count?: number;
}

export interface StravaKudosUser {
    destination_url: string;
    display_name: string;
    avatar_url: string;
    show_name: boolean;
}

export interface StravaActivity {
    id: StravaID;
    resource_state: number;
    external_id?: string | null;
    upload_id?: StravaID | null;
    athlete: StravaAthleteSummary;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: StravaActivityType;
    sport_type?: StravaSportType;
    start_date: string; // ISO 8601
    start_date_local: string; // ISO 8601
    timezone?: string;
    utc_offset?: number; // seconds
    start_latlng?: LatLng | null;
    end_latlng?: LatLng | null;
    achievement_count?: number;
    kudos_count?: number;
    comment_count?: number;
    athlete_count?: number;
    photo_count?: number;
    map?: StravaActivityMap;
    trainer?: boolean;
    commute?: boolean;
    manual?: boolean;
    private?: boolean;
    flagged?: boolean;
    gear_id?: string | null;
    from_accepted_tag?: boolean;
    average_speed?: number;
    max_speed?: number;
    average_cadence?: number | null;
    average_temp?: number | null;
    average_watts?: number | null;
    weighted_average_watts?: number | null;
    kilojoules?: number | null;
    device_watts?: boolean;
    has_heartrate?: boolean;
    max_watts?: number | null;
    elev_high?: number | null;
    elev_low?: number | null;
    pr_count?: number;
    total_photo_count?: number;
    has_kudoed?: boolean;
    workout_type?: number | null;
    suffer_score?: number | null;
    description?: string | null;
    calories?: number | null;
    segment_efforts?: StravaSegmentEffort[];
    splits_metric?: StravaSplit[];
    laps?: StravaLap[];
    gear?: StravaGear | null;
    partner_brand_tag?: string | null;
    photos?: StravaPhotos;
    highlighted_kudosers?: StravaKudosUser[];
    hide_from_home?: boolean;
    device_name?: string | null;
    embed_token?: string | null;
    segment_leaderboard_opt_out?: boolean;
    leaderboard_opt_out?: boolean;
}