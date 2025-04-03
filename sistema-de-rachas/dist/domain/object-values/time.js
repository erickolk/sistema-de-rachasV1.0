"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
class Time {
    constructor(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    isEqual(otherTime) {
        return this.toSeconds() === otherTime.toSeconds();
    }
    isBefore(otherTime) {
        return this.toSeconds() < otherTime.toSeconds();
    }
    isAfter(otherTime) {
        return this.toSeconds() > otherTime.toSeconds();
    }
    get number() {
        const hours = this.hours || 0;
        const minutes = this.minutes || 0;
        const seconds = this.seconds || 0;
        return hours + minutes / 60 + seconds / 3600;
    }
    toString() {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
    add(unit, value) {
        const totalSeconds = this.toSeconds() + (unit === 'hours' ? value * 3600 : value * 60);
        const newHours = Math.floor(totalSeconds / 3600) % 24;
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        return new Time(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`);
    }
    toSeconds() {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }
}
exports.Time = Time;
