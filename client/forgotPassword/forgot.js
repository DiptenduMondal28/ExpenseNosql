async function forgot(e){
    e.preventDefault();
    const detail={
        email:document.getElementById('email').value
    }
    const dataEmailSend=await axios.post('http://localhost:3000/password/forgotpassword',detail)

    if(dataEmailSend.request.status===201){
        //console.log(dataEmailSend.data.message)
        alert(dataEmailSend.data.message)
    }else(
        alert('something wrong happened')
    )
    
}