import { format, parse } from "fecha";

const POSUN_UTC = "+02:00";

const formatDate = (dateInISO) => {
  const inputDate = parse(`${dateInISO}${POSUN_UTC}`, "isoDateTime");
  const dateToday = new Date(Date.now());
  const dateYesterday = new Date(Date.now() - 864e5);

  const inputDateString = format(inputDate, "isoDate");
  const dateTodayString = format(dateToday, "isoDate");
  const dateYesterdayString = format(dateYesterday, "isoDate");

  if (inputDateString === dateTodayString) {
    return "dnes " + format(inputDate, "shortTime");
  } else if (inputDateString === dateYesterdayString) {
    return "včera " + format(inputDate, "shortTime");
  } else {
    return format(inputDate, "D[.] MMMM YYYY, HH:mm", {
      monthNames: [
        "januára",
        "februára",
        "marca",
        "apríla",
        "mája",
        "júna",
        "júla",
        "augusta",
        "septembra",
        "októbra",
        "novembra",
        "decembra",
      ],
    });
  }
};

const formatDateToHHmm = (dateInISO) => {
  const inputDate = parse(`${dateInISO}${POSUN_UTC}`, "isoDateTime");
  return format(inputDate, "HH:mm");
};
export { formatDateToHHmm };
export default formatDate;
