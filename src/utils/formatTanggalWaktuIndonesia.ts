type DateInput = Date | string | number

export function formatTanggalWaktuIndonesia(
    value: DateInput,
    options?: { timeZone?: string }
) {
    const date = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ""
    }

    const parts = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: options?.timeZone ?? "Asia/Makassar",
    }).formatToParts(date)

    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? ""

    return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")} ${get("hour")}:${get("minute")}`
}
