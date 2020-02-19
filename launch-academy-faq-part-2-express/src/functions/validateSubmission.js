// changed to take parameters to set the required fields,
// stateGetter is name of the state to update,
// errorSetter is name of the setter for the error state
// will need to set states in to catch errors for the validation below
//     const [errors, setErrors] = useState({});
// will need to add <ErrorList errors={error state name} /> to display errors

const validateSubmission = (requiredFields, stateGetter, errorSetter) => {
    let submitErrors = {};
    requiredFields.forEach(field => {
      if (stateGetter[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        };
      }
    });
    errorSetter(submitErrors);
    return (
      Object.entries(submitErrors).length === 0 &&
      submitErrors.constructor === Object
    );
  };
  
  export default validateSubmission;
  