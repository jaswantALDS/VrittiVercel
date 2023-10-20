import moment from "moment";

export function formattedDateTime(dateTime: string) {
  return moment(dateTime).format("DD MMMM YYYY hh:mm A");
}
