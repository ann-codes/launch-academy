// ignore me, not able to get working in a functional matter that accepts params

const fetchData = (APIPath, stateSetter) => {
  fetch(APIPath)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      stateSetter(body);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
};

// export default fetchData;
