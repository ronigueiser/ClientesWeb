/**
 *
 * Convierte la fecha de un objeto Date al formato "dd/mm/aaaa HH:ii:ss".
 *
 * @param {Date} date
 * @return {String}
 */

export function dateToString(date) {

    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date)

    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date)

    return `${formattedDate} ${formattedTime}`
}