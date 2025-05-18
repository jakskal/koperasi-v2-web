import moment from 'moment'

export function format_date_input(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
    }
}