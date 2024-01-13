export function format(x) {
    if (x !== undefined && x !== null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "0"; 
    }
}