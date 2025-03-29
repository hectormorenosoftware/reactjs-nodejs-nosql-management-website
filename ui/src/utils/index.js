export const stringRegexPattern = /^[a-zA-Z]{0,20}$/;
export const phoneNumberRegexPattern = /^[0-9-]{0,24}$/;
export const numberRegexPattern = /^[0-9]{0,7}$/;
export const emailRegexPattern = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{0,80}$/;
export const slackRegexPattern = /^[a-zA-Z ]{0,80}$/;
export const companyRoleRegexPattern = /^[a-zA-z ]{0,80}$/;
export const passwordRegexPattern = /^[a-zA-Z0-9]{0,20}$/;
export const lastNameRegexPattern = /^[a-zA-Z ]{0,80}$/;
export const notesRegexPattern = /^[a-zA-Z0-9?() ]{0,10000}$/;

export function addASpace(str) {
  let response = str.replace(/([A-Z])/g, " $&");
  return response;
}

export function differenceInTwoDays(dayOne, dayTwo) {
  let date1 = new Date(dayOne);
  let date2 = new Date(dayTwo);

  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days.toString();
}
