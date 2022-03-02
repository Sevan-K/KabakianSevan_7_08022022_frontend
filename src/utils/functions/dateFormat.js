// export function to format date stored in DB
export default function dateFormat(date) {
   return `le ${date.split("T")[0]} à ${date.split("T")[1].split(".")[0]}`;
}
