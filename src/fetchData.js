const apiEntry = "https://itunanya-backend.onrender.com"
const token= localStorage.getItem("itunaya_token")
const fetchData=(endpoint, method, onSuccess, onFail, body={} )=>{
  console.log(method)
  const reqObj= {
    method,
    headers:{
        "Content-Type":"application/json",
        token,
    },
  
  }
  if((method==="Post")||(method==="POST")){
    reqObj.body= JSON.stringify(body)
  }
  console.log(reqObj.body)
  fetch(`${apiEntry}/${endpoint}`,
    reqObj
   

).then(res=>res.json())
  .then(data=>{
    console.log(data)
    if(data.success){
        onSuccess(data.result)

    }
    else{
        onFail(data.result)
    }
    
  }).catch(err=>{
    onFail(err.message)
  })

}

export default fetchData