


async function login(event){
    event.preventDefault();
    // try{
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value;
        const detail={
            email:email,
            password:password
        }
        console.log("email"+email+"pass"+password)
        await axios.post('http://localhost:3000/login',detail).then(response=>{
            if(response.status===200){
                alert(response.data.message)
                localStorage.setItem('token',response.data.token)
                window.location.href='../website/expenceTracker.html'
            }else{
                throw new Error(response.data.message)
            }
        }).catch(err=>{
            console.log(err)
            //document.body.innerHTML+=`<div style="color:red;">line 19${err}</div>`
            //alert(err)
            console.log(err.response.data.message)
            const fullMessage=err.response.data.message +"  error:" +err.request.status
            console.log(fullMessage)
            alert(fullMessage)
        })
        
    // }catch(err){
    //     console.log(err)
    //     document.body.innerHTML+=`<div style="color:red;">line 29${err}</div>`
    // }
}


document.getElementById('forgotPassword').onclick=()=>{
    window.location.href='../forgotPassword/forgotPassword.html'
}