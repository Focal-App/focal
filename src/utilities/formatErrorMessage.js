export const formatErrorMessage = (errors) => {
    if (typeof errors ===  'string') {
      return errors;
    } 
    const errorKeys = Object.keys(errors);
    let errorMessage = "Error - ";
    errorKeys.forEach(key => {
      errorMessage += `${errors[key]}`
    })
    return errorMessage;
}