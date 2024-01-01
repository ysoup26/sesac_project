setHeader();

// 토큰 검증

async function setHeader(){
    // 로컬스토리지에 토큰 존재여부 검사
    const token = localStorage.getItem("x-access-token");

    // 토큰이 없다면 signed에 hidden 클래스 붙이기
    if(!token){
        const signed =  document.querySelector(".signed");
        signed.classList.add("hidden");
        return;
    }

    // 토큰이 있다면 signed에 hidden 클래스 붙이기
    const config = {
        method: "get",
        url: url+"/jwt",
        headers:{
            "x-access-token":token,
        },
    };
    try{
        const res = await axios(config);  
        console.log(res);
        if(res.data.code !== 200){
            console.log("잘못된 토큰 입니다.");
            return;
        }  
        const nickname = res.data.result.nickname;

        const unsigned =  document.querySelector(".unsigned");
        unsigned.classList.add("hidden");
        const spanNickname = document.querySelector(".signed .nickname")
        spanNickname.innerHTML = nickname;
    }catch(err){
        console.log(err);
    }
    return;
}

// 로그아웃
const buttonSignout = document.querySelector(".signed #sign-out");
buttonSignout.addEventListener("click",signout);

function signout(event){
    localStorage.removeItem("x-access-token");
    location.reload();
}