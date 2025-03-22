export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(time: string) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  public isEqual(otherTime: Time): boolean {
    return this.toSeconds() === otherTime.toSeconds();
  }

  public isBefore(otherTime: Time): boolean {
    return this.toSeconds() < otherTime.toSeconds();
  }

  public isAfter(otherTime: Time): boolean {
    return this.toSeconds() > otherTime.toSeconds();
  }

  public get number(): number {
    const hours = this.hours || 0;
    const minutes = this.minutes || 0;
    const seconds = this.seconds || 0;

    return hours + minutes / 60 + seconds / 3600;
  }

  toString(): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
  }

  public add(unit: 'hours' | 'minutes', value: number): Time {
    const totalSeconds = this.toSeconds() + (unit === 'hours' ? value * 3600 : value * 60);
    const newHours = Math.floor(totalSeconds / 3600) % 24;
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;
    return new Time(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`);
  }

  public toSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }
}