import { describe, it, expect } from 'vitest';
import { SoccerField, SoccerFieldParams } from './soccer-field';
import { Time } from '../object-values/time';
import { uid } from 'uid';
import { UserFactory } from '../factories/user';

describe('SoccerField', () => {
  it('should format time correctly', () => {
    const time = new Time('1:2:3');
    expect(time.toString()).toBe('01:02:03');

    const time2 = new Time('10:20:30');
    expect(time2.toString()).toBe('10:20:30');
  });
});
