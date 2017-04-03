import { range } from 'lodash';
import moment from 'moment';

export default class DateHelper {
    static defaultTimeSlot = 30;

    static disableMinutes() {
        return range(0, 60).filter(i => i % DateHelper.defaultTimeSlot !== 0);
    }

    static getDaysOfWeek() {
        const days = moment.weekdays().map(day => day.toLocaleLowerCase());
        // put the sunday at the last position
        const firstDay = days[0];
        days.splice(0, 1);
        days.push(firstDay);
        return days;
    }
}
