// Todo 조회
readTodo();

async function readTodo(){
    // 토큰 검증: 유저만 Todo를 확인할 수 있음
    const token = localStorage.getItem("x-access-token");

    if(!token){
        return;
    }   
    // 일정조회 API 호출하기
    const config ={
        method: "get",
        url: url + "/todos",
        headers: {"x-access-token":token},
    }
    try{
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        const todoDataSet = res.data.result;

        //todoDataSet으로부터 key값 출력
        for(let section in todoDataSet){
            //각 섹션에 해당하는 ul 태그
            const sectionUl = document.querySelector(`#${section} ul`);
            //각 섹션에 해당하는 데이터
            const arrayForEachSection = todoDataSet[section];
            
            let result = "";

            for(let todo of arrayForEachSection){
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                    <div class="done-text-container">
                        <input type="checkbox" class="todo-done" ${todo.status==='C' ? "checked":""}>
                        <p class="todo-text">${todo.contents}</p>
                    </div>
                    <div class="update-delete-container">
                        <i class="todo-update fa-solid fa-pencil"></i>
                        <i class="todo-delete fa-solid fa-trash-can"></i>
                    </div>
                </li>
                `;
                result+=element;
            }
            sectionUl.innerHTML = result;
        }

    }catch(err){
        console.log(res);
    }
    
    
}

// 일정 CUD
const matrixContainer = document.querySelector(".matrix-container");
matrixContainer.addEventListener("keypress",cudController);
matrixContainer.addEventListener("click",cudController);

function cudController(event){
    // 토큰 검증: 유저만 Todo를 확인할 수 있음
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    }   

    const target = event.target;
    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;
    
    console.log(target,target.value,targetTagName,eventType,key);

    // 생성 이벤트 처리
    if(targetTagName === "INPUT" && key === "Enter"){
        createTodo(event,token);
        return;
    }

    // 수정 이벤트 처리: 체크박스
    if(target.className === "todo-done" && eventType === "click"){
        updateTodo(event,token);
        return;
    }

    const firstClassName = target.className.split(" ")[0];
    
    // 수정 이벤트 처리: 수정 아이콘
    if(firstClassName === "todo-update" && eventType === "click"){
        updateTodoContent(event,token);
        return;
    }

    // 삭제 이벤트 처리: 삭제 아이콘
    if(firstClassName === "todo-delete" && eventType === "click"){
        deleteTodo(event,token);
        return;
    }
}

// 일정 생성 API 호출
async function createTodo(event,token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id; //이벤트가 발생한 태그의 가장 근처에 있는 matrix-item 아이템
    if(!contents){
        alert("내용을 입력해주세요.");
        return false;
    }
    
    const config ={
        method: "post",
        url: url + "/todo",
        headers: {"x-access-token":token},
        data: {
            contents: contents,
            type: type,
        },
    };
    try{
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        
        // DOM 업데이트
        readTodo();
        event.target.value = "";

    }catch(err){
        console.log(err);
    }
}

// 일정 수정 API 호출: status 변경
async function updateTodo(event,token){
    const status = event.target.checked ? "C" : "A";
    const todoIdx = event.target.closest(".list-item").id;
    const config ={
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token":token},
        data: {
            todoIdx: todoIdx,
            status: status,
        },
    };
    try{
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        
        // DOM 업데이트
        readTodo();

    }catch(err){
        console.log(err);
    }
}

// 일정 수정 API 호출: contents 변경
async function updateTodoContent(event,token){
    const contents = prompt("내용을 입력해주세요.");
    const todoIdx = event.target.closest(".list-item").id;
    const config ={
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token":token},
        data: {
            todoIdx: todoIdx,
            contents: contents,
        },
    };
    try{
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        
        // DOM 업데이트
        readTodo();

    }catch(err){
        console.log(err);
    }
}

// 일정 삭제 API 호출
async function deleteTodo(event,token){
    const isValidReq = confirm("삭제하시겠습니까? 삭제 후에는 복구가 어렵습니다.");
    
    if(!isValidReq)
        return;

    const status = "D";
    const todoIdx = event.target.closest(".list-item").id;
    const config ={
        method: "delete",
        url: url + `/todo/${todoIdx}`,
        headers: {"x-access-token":token},
    };
    try{
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        
        // DOM 업데이트
        readTodo();

    }catch(err){
        console.log(err);
    }
}