

export const getTestFetch = () =>{
 return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
    headers: {
      authorization: 'f12b044f-995b-4f4a-bc14-fbb855775aa8'
    }
  })
    //.then(res => console.log('res=> ',res))
    .then(res => res.ok ? res.json() : Promise.reject())
    //.then((result) => {
      //console.log(result);
    }; 


 