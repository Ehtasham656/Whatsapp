// export const formatDate = (data) => {
//   const hours = new Date(data).getHours();
//   const minutes = new Date(data).getMinutes();
//   return `${hours < 10 ? "0" + hours : hours}:${
//     minutes < 10 ? "0" + minutes : minutes
//   }`;
// };

// dateUtils.js
import { format } from "date-fns";

export const getFormattedDate = (date) => {
  return date ? format(new Date(date), "dd MMM yyyy, HH:mm") : "Unknown time";
};
