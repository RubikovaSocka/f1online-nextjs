import { parseISO } from "date-fns";
import { format } from "date-fns";
import { sk } from 'date-fns/locale'

function formatDate(dateInISO) {
    return format(parseISO(dateInISO), "d. MMMM yyyy, HH:mm", {locale: sk})
}
export default formatDate