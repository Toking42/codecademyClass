// Sleep Counter Codecademy Project
const getSleepHours = (day) => {

  switch (day) {
    case 'monday':
      return 8;
      break;
    case 'tuesday':
      return 6;
      break;
    case 'wednesday':
      return 5;
      break;
    case 'thursday':
      return 6;
      break;
    case 'friday':
      return 5;
      break;
    case 'saturday':
      return 8;
      break;
    case 'sunday':
      return 7;
      break;
    default:
      0;
      break;
  }

}

const getActualSleepHours = () => {
    var daysOfWeek = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    var hoursOfSleep = 0;
    for (i = 0; i< daysOfWeek.length;i++) {
      console.log(daysOfWeek[i]);
      hoursOfSleep += getSleepHours(daysOfWeek[i]);
    }
    return hoursOfSleep;
}

const getIdealSleepHours = () => {
  var idealHours = 8;
  return idealHours*7;
}

const calculateSleepDept = () => {
  return getIdealSleepHours()-getActualSleepHours();
}

console.log(calculateSleepDept());
