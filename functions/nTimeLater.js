const millisecondsInSecond = 1000;
const millisecondsInMinute = 60*1000;
const millisecondsInHour   = 60*60*1000;
const millisecondInDay     = 24*60*60*1000;

const secondsToMilliseconds = 
    seconds => seconds * millisecondsInSecond;
const minutesToMilliseconds = 
    minutes => minutes * millisecondsInMinute;
const hoursToMilliseconds   = 
    hours   => hours   * millisecondsInHour;
const daysToMilliseconds    = 
    days    => days    * millisecondInDay;

const nSecondsLater = seconds => 
    new Date( new Date().getTime() + 
    secondsToMilliseconds(seconds) );

const nMinutesLater = minutes => 
    new Date( new Date().getTime() + 
    minutesToMilliseconds(minutes) );

const nHoursLater   = hours => 
    new Date( new Date().getTime() + 
    hoursToMilliseconds(hours) );

const nDaysLater    = days => 
    new Date( new Date().getTime() + 
    daysToMilliseconds(days) );

module.exports = {
    nSecondsLater,
    nMinutesLater,
    nHoursLater, 
    nDaysLater           
}