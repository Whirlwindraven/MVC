module.exports = {
    format_date: (date) => {
    // Returns the inputDate as MM/DD/YYYY
    return date.toLocaleDateString();
},

format_amount: (amount) => {
    // Returns large numbers formatted with commas
    return parseInt(amount).toLocaleString();
}, 

}; 