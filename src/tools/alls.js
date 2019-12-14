
 const projects = function(){
    const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include'
  	}
     var result;
     
     
    return  fetch("http://localhost:8081/rrhh_api/projects/all", headers)
        .then(res => res.json())
          .then(res =>  res)
}

const employees = function(){
    const headers = {
  		
        method: 'POST',
       headers: {...new Headers(), 'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Cache': 'no-cache',
       },
       mode: 'cors',
      credentials: 'include'
  	}
       return fetch("http://localhost:8081/rrhh_api/employees/all", headers)
        .then(res => res.json())
          .then(res => res)
          .catch(x => console.warn(x))
          .finally(x => console.log(x))

}

export { employees, projects };
