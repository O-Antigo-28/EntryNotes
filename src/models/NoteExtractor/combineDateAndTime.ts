export function combineDateAndTime(date: Date, time: Date){
    if (!date)
        throw new Error("Parece que a data foi fornecida mas não parece válida")
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    if (!time)
        throw new Error("Parece que o horário foi fornecido mas não parece válido")
    const hour = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()

    const combinedDate = new Date(year, month, day, hour, min, sec)
    return combinedDate
}