const formatAmPm = (hours) => {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return {hours, ampm}
}

export const getFullDate = () => {
    const date = new Date()

    const hours = date.getHours();
    const {hours: hoursFormatted, ampm} = formatAmPm(hours)

    let minutes = date.getMinutes();
    if (minutes <= 9) {
        minutes = `0${minutes}`; 
    }
    const day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    switch (month) {
        case 0:
            month = "Ene"
            break;
        case 1:
            month = "Feb"
            break;
        case 2:
            month = "Mar"
            break;
        case 3:
            month = "Abr"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "Jun"
            break;
        case 6:
            month = "Jul"
            break;
        case 7:
            month = "Ago"
            break;
        case 8:
            month = "Sep"
            break;
        case 9:
            month = "Oct"
            break;
        case 10:
            month = "Nov"
            break;
        case 11:
            month = "Dic"
            break;
        default:
            month = ""
            break;
    }
    return {
        minutes,
        hoursFormatted,
        ampm,
        day,
        month,
        year
    }
}