function toMs(d: Date) {
    return d.getTime();
}
function clone(d: Date) {
    return new Date(d.getTime());
}
function add(date: Date, amountMs: number) {
    return new Date(toMs(date) + amountMs);
}
function days(n: number) {
    return n * 24 * 60 * 60 * 1000;
}
function minutes(n: number) {
    return n * 60 * 1000;
}
// Named re-exports used above:
function addInternalDays(date: Date, n: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}
export function addDays(date: Date, n: number) {
    return addInternalDays(date, n);
}
export function addWeeks(date: Date, n: number) {
    return addDays(date, n * 7);
}
export function addMonths(date: Date, n: number) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + n);
    return d;
}
export function differenceInMinutes(a: Date, b: Date) {
    return Math.round((toMs(a) - toMs(b)) / minutes(1));
}
export function startOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}
export function isSameMonth(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
export function isToday(d: Date) {
    const t = new Date();
    return isSameDate(t, d);
}
export function isSameDay(a: Date, b: Date) {
    return isSameDate(a, b);
}

export function isSameDate(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}