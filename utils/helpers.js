const formatDate = (inputDate) => {
    // Returns the inputDate as MM/DD/YYYY
    return inputDate.toLocaleDateString();
};

const formatQuantity = (quantity) => {
    // Returns large numbers formatted with commas
    return parseInt(quantity).toLocaleString();
};

module.exports = {
    formatDate,
    formatQuantity
};
