"use client";

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CalendarIcon,
    MapPinIcon,
    TimerIcon,
    TrendingUpIcon,
} from "lucide-react";
import { StravaActivity } from "@/types/stravaTypes";
import dataStravaActivity from "./dataStravaActivity.json";

const YourWorkouts = () => {
    const [workouts, setWorkouts] = useState<StravaActivity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Format duration to a readable string
    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${secs}s`;
    };

    // Format distance to km
    const formatDistance = (meters: number): string => {
        return (meters / 1000).toFixed(2) + " km";
    };

    // Format date in English
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Format running pace (min/km)
    const formatPace = (mPerS?: number | null): string => {
        if (!mPerS || mPerS <= 0) return "-";
        const secPerKm = 1000 / mPerS;
        const min = Math.floor(secPerKm / 60);
        const sec = Math.round(secPerKm % 60);
        return `${min}:${sec.toString().padStart(2, "0")} min/km`;
    };

    // Format speed (km/h)
    const formatSpeed = (mPerS?: number | null): string => {
        if (!mPerS || mPerS < 0) return "-";
        return `${(mPerS * 3.6).toFixed(1)} km/h`;
    };

    // Fetch workouts (replace mock with real Strava API call)
    const fetchWorkouts = async () => {
        try {
            setLoading(true);

            // Here you would make your real call to the Strava API
            // const response = await fetch('STRAVA_API_URL', { headers: { Authorization: `Bearer ${token}` }});
            // const data = await response.json();

            // For demonstration purposes, using sample data
            const mockData: StravaActivity[] = [dataStravaActivity] as unknown as StravaActivity[];

            setWorkouts(mockData);
        } catch (err) {
            setError("Error getting workouts");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    // Loading skeleton
    if (loading) {
        return (
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-bold">Latest Workouts</h2>
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="w-full">
                        <CardHeader className="pb-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold">Latest Workouts</h2>
                <Card className="w-full bg-red-50">
                    <CardContent className="pt-6">
                        <p className="text-red-500">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Main render
    return (
        <div className="space-y-4 p-4">
            <h2 className="text-2xl font-bold">Latest Workouts</h2>

            {workouts.length === 0 ? (
                <Card className="w-full">
                    <CardContent className="pt-6">
                        <p className="text-gray-500 text-center">No recent workouts</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {workouts.slice(0, 5).map((workout) => (
                        <Card
                            key={workout.id}
                            className="w-full transition-shadow hover:shadow-md"
                        >
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold">
                                        {workout.name}
                                    </CardTitle>
                                    <Badge
                                        variant={workout.type === "Run" ? "default" : "secondary"}
                                    >
                                        {workout.type}
                                    </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    {formatDate(workout.start_date)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPinIcon className="h-4 w-4 text-primary" />
                                        <span>{formatDistance(workout.distance)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TimerIcon className="h-4 w-4 text-primary" />
                                        <span>{formatDuration(workout.moving_time)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <span>{workout.total_elevation_gain}m ↑</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium">
                                            {workout.type === "Run" ? "Pace:" : "Speed:"}
                                        </span>
                                        <span>
                                            {workout.type === "Run"
                                                ? formatPace(workout.average_speed)
                                                : formatSpeed(workout.average_speed)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <a
                                    href={`https://www.strava.com/activities/${workout.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline ml-auto"
                                >
                                    View on Strava
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourWorkouts;
