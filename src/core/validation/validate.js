module.exports = (object, schema) => {
    const validationResults = schema.validate(object, { abortEarly: false });
    const response = {
      value: false,
      error: false,
    };
  
    if (validationResults.error) {
      const detailedErrors = validationResults.error.details.map((error) => error.message);
      response.error = detailedErrors;
    } else {
      response.value = object;
    }
    
    return response;
  };
  