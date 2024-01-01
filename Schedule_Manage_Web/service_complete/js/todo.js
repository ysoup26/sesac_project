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
        //console.log(todoDataSet);

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

/*
<ul class="matirx-item-list">
                        <li class="list-item">
                            <div class="done-text-container">
                                <input type="checkbox" class="todo-done">
                                <p class="todo-text">산책하기</p>
                            </div>
                            <!-- done-text-container -->
                            <div class="update-delete-container">
                                <i class="todo-update fa-solid fa-pencil"></i>
                                <i class="todo-delete fa-solid fa-trash-can"></i>
                            </div>
                            <!-- update-delete-container -->
                        </li>
                         <!-- list-item -->
                    </ul>
                    <!-- matirx-item-list -->*/