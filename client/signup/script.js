async function signup(event){
    event.preventDefault();
    // let name=document.getElementById('name').value;
    // let email=document.getElementById('email').value;
    // let password=document.getElementById('password').value;

    //  console.log(`name: ${name} email:${email} password:${password}`);

    try{
        let name=document.getElementById('name').value;
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value;

        console.log(`name: ${name} email:${email} password:${password}`);
        let data= {
            name:name,
            email:email,
            password:password
        }
        const dataDEtail=await axios.post('http://localhost:3000/signup',data)
        console.log(dataDEtail)
        if(dataDEtail.request.status === 201){
            console.log(dataDEtail.data.message)
            document.body.innerHTML+=`<div style="color:green;">line 24${dataDEtail.data.message}</div>`
        }else{
            throw new Error('fill form')
        }
     
    }catch(err){
        document.body.innerHTML+=`<div style="color:red;">line 29${err}</div>`
        console.log(err)
    }
}