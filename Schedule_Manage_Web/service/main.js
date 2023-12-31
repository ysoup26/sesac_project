// axios({
//     method: "post",
// url: "http://127.0.0.1:3000/sign-in",
// headers: {},
// data: {email:"two2@gmail.com",password:"a2a2a2add2dd",nickname:"두투두"},
// })
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

//async 방식
async function dummy(){
	try{
		const res = await axios({
		    method: "post",
            url: "http://127.0.0.1:3000/sign-in",
            headers: {},
            data: {email:"two2@gmail.com",password:"a2a2a2add2dd",nickname:"두투두"},
            });

		console.log(res);
	} catch(err){
		console.error(err);	
    }
}

dummy();