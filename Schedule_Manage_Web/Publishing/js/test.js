const example = new Promise((resolve, reject) => {
    let isSuccess = false; // true, false 값을 변경하며 테스트 해봅니다.
  
    if (!isSuccess) {
        reject(false);
        throw new Error("요청에 실패했습니다."); // 에러가 발생하면 reject하지 않아도 catch메서드로 이동합니다.
      
    }
  
    resolve();
  });
  
  example
    .then((res) => {
      console.log(res);
      throw new Error("일부러 에러를 내봤어요.."); // 에러가 발생하면 reject하지 않아도 catch 메서드로 이동합니다.
    })
    .catch((err) => console.log(err));