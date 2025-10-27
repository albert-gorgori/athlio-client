"use client";

import * as React from "react";
import { addDays, addMonths, addWeeks, differenceInMinutes, isSameDate, isSameMonth, isToday, startOfDay } from "./date-utils";
import { Button } from "@/components/ui/button";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";




type ViewMode = "day" | "week" | "month";

type CalEvent = {
    id: string;
    title: string;
    start: Date; // Inclusive
    end: Date; // Exclusive
    allDay?: boolean;
    color?: string; // any CSS color
    location?: string;
    description?: string;
};

const WEEK_STARTS_ON = 1; // Monday
const HOUR_HEIGHT = 56; // px per hour in time-grid
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function startOfWeek(date: Date, weekStartsOn = WEEK_STARTS_ON) {
    const d = new Date(date);
    const day = (d.getDay() + 7 - weekStartsOn) % 7;
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
}

function endOfWeek(date: Date, weekStartsOn = WEEK_STARTS_ON) {
    const s = startOfWeek(date, weekStartsOn);
    return addDays(s, 6);
}

function startOfMonth(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth(), 1);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getMonthMatrix(anchor: Date, weekStartsOn = WEEK_STARTS_ON) {
    const start = startOfWeek(startOfMonth(anchor), weekStartsOn);
    return Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => addDays(start, row * 7 + col))
    );
}

function fmtMonthYear(d: Date) {
    return new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(d);
}

function fmtWeekRange(d: Date) {
    const s = startOfWeek(d);
    const e = endOfWeek(d);
    const sameMonth = s.getMonth() === e.getMonth();
    const sameYear = s.getFullYear() === e.getFullYear();
    const startFmt = new Intl.DateTimeFormat(undefined, {
        month: sameMonth ? undefined : "short",
        day: "numeric",
        year: sameYear ? undefined : "numeric",
    }).format(s);
    const endFmt = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(e);
    return `${startFmt} – ${endFmt}`;
}

function fmtDayLong(d: Date) {
    return new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(d);
}

function dayLabel(d: Date) {
    return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(d);
}

function timeLabel(h: number) {
    const dt = new Date();
    dt.setHours(h);
    dt.setMinutes(0);
    return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(dt);
}

function minutesFromStartOfDay(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}



function toDateYYYYMMDD(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function collides(a: CalEvent, b: CalEvent) {
    return a.start < b.end && b.start < a.end;
}

function layoutDayEvents(events: CalEvent[]) {
    // Greedy column assignment for overlapping events
    const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
    const columns: CalEvent[][] = [];
    const placements: { event: CalEvent; col: number; colSpan: number; columns: number }[] = [];

    sorted.forEach((evt) => {
        let placed = false;
        for (let c = 0; c < columns.length; c++) {
            if (!columns[c].some((e) => collides(e, evt))) {
                columns[c].push(evt);
                placements.push({ event: evt, col: c, colSpan: 1, columns: 0 });
                placed = true;
                break;
            }
        }
        if (!placed) {
            columns.push([evt]);
            placements.push({ event: evt, col: columns.length - 1, colSpan: 1, columns: 0 });
        }
    });

    const totalCols = columns.length || 1;
    placements.forEach((p) => (p.columns = totalCols));
    return placements;
}

function withinDayRange(e: CalEvent, day: Date) {
    const s = startOfDay(day);
    const eod = addDays(s, 1);
    return e.start < eod && e.end > s;
}

function withinWeekAllDay(e: CalEvent, weekStart: Date) {
    const ws = startOfDay(weekStart);
    const we = addDays(ws, 7);
    return (e.allDay || (minutesFromStartOfDay(e.start) === 0 && differenceInMinutes(e.end, e.start) >= 24 * 60)) && e.start < we && e.end > ws;
}

function seedEvents(today: Date): CalEvent[] {
    const base = startOfWeek(today);
    const mk = (offsetDay: number, sh: number, sm: number, eh: number, em: number, title: string, color?: string, allDay?: boolean): CalEvent => {
        const s = new Date(base);
        s.setDate(s.getDate() + offsetDay);
        s.setHours(sh, sm, 0, 0);
        const e = new Date(base);
        e.setDate(e.getDate() + offsetDay);
        e.setHours(eh, em, 0, 0);
        return {
            id: `${title}-${offsetDay}-${sh}${sm}`,
            title,
            start: s,
            end: e,
            color,
            allDay,
        };
    };
    const mkAllDay = (offsetStart: number, spanDays: number, title: string, color?: string): CalEvent => {
        const s = new Date(base);
        s.setDate(s.getDate() + offsetStart);
        s.setHours(0, 0, 0, 0);
        const e = new Date(s);
        e.setDate(e.getDate() + spanDays);
        return { id: `${title}-ad-${offsetStart}`, title, start: s, end: e, allDay: true, color };
    };

    return [
        mk(1, 9, 0, 10, 30, "Daily Standup", "#0ea5e9"),
        mk(1, 11, 0, 12, 0, "Design Review", "#22c55e"),
        mk(2, 13, 30, 15, 0, "1:1 Meeting", "#f59e0b"),
        mk(3, 10, 0, 11, 0, "Client Call", "#ef4444"),
        mk(4, 16, 0, 17, 30, "Project Sync", "#8b5cf6"),
        mk(0, 14, 0, 15, 0, "Gym", "#06b6d4"),
        mk(5, 9, 0, 12, 0, "Workshop", "#e11d48"),
        mkAllDay(2, 2, "Sprint Planning", "#a3e635"),
        mkAllDay(4, 1, "Public Holiday", "#94a3b8"),
    ];
}

export default function CalendarContent() {
    const [view, setView] = React.useState<ViewMode>("week");
    const [anchorDate, setAnchorDate] = React.useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const [events] = React.useState<CalEvent[]>(() => seedEvents(new Date()));
    const weekStart = React.useMemo(() => startOfWeek(anchorDate), [anchorDate]);

    const onToday = () => setAnchorDate(new Date());
    const onPrev = () => {
        setAnchorDate((d) => (view === "month" ? addMonths(d, -1) : view === "week" ? addWeeks(d, -1) : addDays(d, -1)));
    };
    const onNext = () => {
        setAnchorDate((d) => (view === "month" ? addMonths(d, 1) : view === "week" ? addWeeks(d, 1) : addDays(d, 1)));
    };

    const label =
        view === "month"
            ? fmtMonthYear(anchorDate)
            : view === "week"
            ? fmtWeekRange(anchorDate)
            : fmtDayLong(anchorDate);

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={onNext} aria-label="Next">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" onClick={onToday}>Today</Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                {label}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start">
                            <DatePicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(d) => {
                                    if (!d) return;
                                    setSelectedDate(d);
                                    setAnchorDate(d);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="min-w-[120px] justify-between">
                                {view.charAt(0).toUpperCase() + view.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>View</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={view} onValueChange={(v) => setView(v as ViewMode)}>
                                <DropdownMenuRadioItem value="day">Day</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="week">Week</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="More">
                                <Ellipsis className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled>New calendar…</DropdownMenuItem>
                            <DropdownMenuItem disabled>Import…</DropdownMenuItem>
                            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Separator />

            {view === "month" ? (
                <MonthView anchorDate={anchorDate} events={events} />
            ) : view === "week" ? (
                <WeekView weekStart={weekStart} events={events} />
            ) : (
                <DayView day={anchorDate} events={events} />
            )}
        </div>
    );
}

function MonthView({ anchorDate, events }: { anchorDate: Date; events: CalEvent[] }) {
    const weeks = React.useMemo(() => getMonthMatrix(anchorDate), [anchorDate]);

    const eventsByDay = React.useMemo(() => {
        const map = new Map<string, CalEvent[]>();
        weeks.flat().forEach((d) => map.set(toDateYYYYMMDD(d), []));
        events.forEach((e) => {
            weeks.flat().forEach((d) => {
                const s = startOfDay(d);
                const eod = addDays(s, 1);
                if (e.start < eod && e.end > s) {
                    const key = toDateYYYYMMDD(d);
                    map.get(key)?.push(e);
                }
            });
        });
        return map;
    }, [weeks, events]);

    return (
        <div className="grid grid-cols-7 border border-border rounded-md overflow-hidden">
            {weeks[0].map((d, idx) => (
                <div key={`dow-${idx}`} className="bg-muted/50 p-2 text-xs font-medium uppercase tracking-wide">
                    {dayLabel(d)}
                </div>
            ))}
            {weeks.flat().map((d, i) => {
                const inMonth = isSameMonth(d, anchorDate);
                const dayKey = toDateYYYYMMDD(d);
                const dayEvents = eventsByDay.get(dayKey) || [];
                const isTodayFlag = isToday(d);

                return (
                    <div key={dayKey} className="relative min-h-[120px] border-t border-l border-border p-2">
                        <div className="mb-1 flex items-center justify-between">
                            <div className={`size-6 shrink-0 rounded-full text-xs grid place-items-center ${isTodayFlag ? "bg-primary text-primary-foreground" : ""} ${!isTodayFlag && !inMonth ? "text-muted-foreground" : ""}`}>
                                {d.getDate()}
                            </div>
                            {!inMonth && <Badge variant="outline" className="text-[10px]">Other</Badge>}
                        </div>
                        <div className="flex flex-col gap-1">
                            {dayEvents.slice(0, 3).map((e) => (
                                <div key={e.id} className="truncate rounded-md px-2 py-1 text-xs" style={{ backgroundColor: (e.color || "#e5e7eb") + "33", borderLeft: `3px solid ${e.color || "#9ca3af"}` }}>
                                    <span className="font-medium">{e.title}</span>
                                    {!e.allDay && <span className="ml-1 text-muted-foreground">{fmtEventTimeRange(e)}</span>}
                                </div>
                            ))}
                            {dayEvents.length > 3 && (
                                <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function WeekView({ weekStart, events }: { weekStart: Date; events: CalEvent[] }) {
    const days = React.useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

    const allDayEvents = React.useMemo(() => {
        return events.filter((e) => withinWeekAllDay(e, weekStart));
    }, [events, weekStart]);

    const byDayTimed = React.useMemo(() => {
        const map = new Map<string, CalEvent[]>();
        days.forEach((d) => map.set(toDateYYYYMMDD(d), []));
        events.forEach((e) => {
            days.forEach((d) => {
                if (!e.allDay && withinDayRange(e, d)) {
                    map.get(toDateYYYYMMDD(d))!.push(e);
                }
            });
        });
        return map;
    }, [events, days]);

    const containerHeight = HOUR_HEIGHT * 24;

    return (
        <div className="flex flex-col">
            {/* Header row */}
            <div className="grid grid-cols-[64px_repeat(7,1fr)] items-stretch">
                <div />
                {days.map((d) => (
                    <div key={toDateYYYYMMDD(d)} className="flex items-center gap-2 p-2 border-l border-border">
                        <div className={`grid size-7 place-items-center rounded-full ${isToday(d) ? "bg-primary text-primary-foreground" : ""}`}>
                            <span className={`text-sm ${!isToday(d) ? "" : ""}`}>{d.getDate()}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{dayLabel(d)}</span>
                    </div>
                ))}
            </div>

            {/* All-day row */}
            <div className="grid grid-cols-[64px_repeat(7,1fr)] border-t border-b border-border">
                <div className="p-2 text-xs text-muted-foreground">All-day</div>
                <div className="col-span-7 grid grid-cols-7">
                    {days.map((d, idx) => (
                        <div key={`ad-${idx}`} className="min-h-[44px] border-l border-border p-1">
                            {allDayEvents
                                .filter((e) => e.start <= addDays(d, 1) && e.end > d)
                                .slice(0, 3)
                                .map((e) => (
                                    <div key={`${e.id}-${idx}`} className="mb-1 truncate rounded px-2 py-1 text-xs font-medium" style={{ backgroundColor: (e.color || "#e5e7eb") + "66" }}>
                                        {e.title}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Time grid */}
            <ScrollArea className="h-[72vh]">
            <div className="grid grid-cols-[64px_repeat(7,1fr)]">
                {/* Time gutter */}
                <div className="relative">
                    {/* <ScrollArea className="h-[72vh]"> */}
                        <div style={{ height: containerHeight }}>
                            {HOURS.map((h) => (
                                <div key={h} className="relative h-[56px]">
                                    <div className="absolute -top-2 right-2 text-[10px] text-muted-foreground">{timeLabel(h)}</div>
                                    <div className="absolute bottom-0 left-0 right-0 border-b border-dashed border-border/70" />
                                </div>
                            ))}
                        </div>
                    {/* </ScrollArea> */}
                </div>

                {/* Day columns */}
                {days.map((d) => (
                    <DayColumn key={toDateYYYYMMDD(d)} day={d} events={byDayTimed.get(toDateYYYYMMDD(d)) || []} />
                ))}
            </div>
            </ScrollArea>
        </div>
    );
}

function DayView({ day, events }: { day: Date; events: CalEvent[] }) {
    const allDayEvents = events.filter((e) => withinWeekAllDay(e, startOfWeek(day)));
    const timed = events.filter((e) => !e.allDay && withinDayRange(e, day));
    const containerHeight = HOUR_HEIGHT * 24;

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 p-2">
                <div className={`grid size-8 place-items-center rounded-full ${isToday(day) ? "bg-primary text-primary-foreground" : ""}`}>
                    <span className="text-base leading-none">{day.getDate()}</span>
                </div>
                <span className="text-sm text-muted-foreground">{dayLabel(day)}</span>
            </div>

            {/* All-day */}
            <div className="border-y border-border p-2">
                <div className="mb-2 text-xs text-muted-foreground">All-day</div>
                <div className="flex flex-wrap gap-2">
                    {allDayEvents.map((e) => (
                        <Badge key={e.id} style={{ backgroundColor: (e.color || "#e5e7eb") + "66" }}>
                            {e.title}
                        </Badge>
                    ))}
                    {allDayEvents.length === 0 && <div className="text-xs text-muted-foreground">No all-day events</div>}
                </div>
            </div>

            {/* Time grid */}
            <ScrollArea className="h-[72vh]">
            <div className="grid grid-cols-[64px_1fr]">
                {/* Time gutter */}
                <div className="relative">
                        <div style={{ height: containerHeight }}>
                            {HOURS.map((h) => (
                                <div key={h} className="relative h-[56px]">
                                    <div className="absolute -top-2 right-2 text-[10px] text-muted-foreground">{timeLabel(h)}</div>
                                    <div className="absolute bottom-0 left-0 right-0 border-b border-dashed border-border/70" />
                                </div>
                            ))}
                        </div>
                </div>

                {/* Day column */}
                <DayColumn day={day} events={timed} />
            </div>
            </ScrollArea>
        </div>
    );
}

function DayColumn({ day, events }: { day: Date; events: CalEvent[] }) {
    const containerHeight = HOUR_HEIGHT * 24;
    const now = new Date();
    const showNow = isSameDate(now, day);
    const nowTop = (minutesFromStartOfDay(now) / 60) * HOUR_HEIGHT;

    const placements = React.useMemo(() => layoutDayEvents(events), [events]);

    return (
        <div className="relative border-l border-border">
            {/* <ScrollArea className="h-[72vh]"> */}
                <div className="relative" style={{ height: containerHeight }}>
                    {/* Hour lines */}
                    {HOURS.map((h) => (
                        <div key={h} className="absolute left-0 right-0 border-b border-dashed border-border/70" style={{ top: h * HOUR_HEIGHT }} />
                    ))}

                    {/* Now marker */}
                    {showNow && (
                        <div className="absolute left-0 right-0" style={{ top: nowTop }}>
                            <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                <div className="h-[2px] w-full bg-red-500" />
                            </div>
                        </div>
                    )}

                    {/* Events */}
                    {placements.map(({ event, col, columns }) => {
                        const startMin = clamp(minutesFromStartOfDay(event.start), 0, 24 * 60);
                        const endMin = clamp(minutesFromStartOfDay(event.end), 0, 24 * 60);
                        const top = (startMin / 60) * HOUR_HEIGHT;
                        const height = Math.max(18, ((endMin - startMin) / 60) * HOUR_HEIGHT);
                        const widthPct = 100 / (columns || 1);
                        const leftPct = col * widthPct;

                        return (
                            <div
                                key={event.id}
                                className="absolute overflow-hidden rounded-md border text-xs shadow-sm"
                                style={{
                                    top,
                                    left: `${leftPct}%`,
                                    width: `calc(${widthPct}% - 6px)`,
                                    height,
                                    backgroundColor: (event.color || "#60a5fa") + "22",
                                    borderLeft: `3px solid ${event.color || "#3b82f6"}`,
                                }}
                                title={`${event.title} ${fmtEventTimeRange(event)}`}
                            >
                                <div className="px-2 py-1">
                                    <div className="truncate font-medium">{event.title}</div>
                                    <div className="truncate text-[10px] text-muted-foreground">{fmtEventTimeRange(event)}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            {/* </ScrollArea> */}
        </div>
    );
}

function fmtEventTimeRange(e: CalEvent) {
    const fmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
    return `${fmt.format(e.start)} – ${fmt.format(e.end)}`;
}

/**
 * Lightweight date helpers to avoid extra deps.
 * If your project already uses date-fns, remove this file and import from "date-fns".
 */
export const __DO_NOT_EXPORT = null;

// date-utils colocated for single-file drop-in
// You can move these to a separate util file if preferred.
