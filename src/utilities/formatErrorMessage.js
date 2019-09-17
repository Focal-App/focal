export const formatErrorMessage = (errors) => {
    if (typeof errors ===  'string') {
      return errors;
    } 
    const errorKeys = Object.keys(errors);
    let errorMessage = "";
    errorKeys.forEach(key => {
      errorMessage += `${key} ${errors[key]}`
    })
    return errorMessage;
}