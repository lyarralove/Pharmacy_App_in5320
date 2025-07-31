export  const validInputChecker = (input) => {
    if (input.includes('-')) {
        return { isValid: false, message: "No negatives" };
    } else if (input.includes('.')) {
        return { isValid: false, message: "No decimals" };
    } else if (input.length > 4) {
        return { isValid: false, message: "Max 4 digits." };
    } else {
        return { isValid: true, message: '' };
    }
};