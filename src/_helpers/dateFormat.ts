import Holidays from 'date-holidays';

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
};

export const stringToDateTime = (dateString: string) => {
    // convert string to date
    const date = new Date(dateString);
    return date;
}

export const isHoliday = (date: any) => {
    const za_holidays = new Holidays();
    za_holidays.init('ZA');
    const holiday = za_holidays.isHoliday(stringToDateTime(date));
    if (holiday) {
        return true;
    }
    return false;
}

export const holidays = () => {
    const za_holidays = new Holidays();
    za_holidays.init('ZA');
    return za_holidays.getHolidays(new Date().getFullYear());
}
