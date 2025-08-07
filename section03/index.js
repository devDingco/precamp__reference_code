let 수강생모음 = []; // 수강생 목록 저장을 위한 배열
let timer; // 타이머 아이디를 저장할 변수
let 남은시간 = 180; // 남은시간 체크를 위한 변수
let 인증여부 = false; // 인증완료 여부를 저장하기 위한 변수

function JS_수강생확인() {
  //수강생이 아무도 없는 경우
  if (수강생모음.length === 0) {
    document.getElementById("수강생이 없는 경우").style = "display: block;";
  }
  // 수강생이 1명 이상 있는 경우
  else if (수강생모음.length !== 0) {
    document.getElementById("수강생이 없는 경우").style = "display: none;";
  }
}

function JS_수강생DOM만들기() {
  const 수강생목록 = 수강생모음
    .map(
      (수강생, index) =>
        `<div class="CSS_수강생항목" onclick="JS_수강생상세정보보여주기(${index})"><img src="./assets/프로필이미지.png" /><div class="CSS_사이드바_왼쪽부분_항목_간격"></div><div class="CSS_수강생항목텍스트"
      >${수강생.이름}</div></div>`
    )
    .join("");

  window.document.getElementById("수강생보여주는곳").innerHTML = 수강생목록;
}

function JS_수강생상세정보보여주기(수강생번호) {
  const 수강생정보 = 수강생모음[수강생번호];
  alert(
    `     이름 : ${수강생정보.이름} 
     이메일 : ${수강생정보.이메일}
     비밀번호 : ${수강생정보.비밀번호}
     성별 : ${수강생정보.성별} 
     전화번호 : ${수강생정보.전화번호}
     동의여부 : Y 
     자기소개 : ${수강생정보.자기소개}
     (가입일시 : ${수강생정보.가입일시})
     `
  );
}

function JS_회원가입() {
  // verification 실패시 회원가입 불가.
  if (!JS_회원가입가능확인기능()) return;
  // 두번이상 시도하는경우 에러메시지 초기화해야됨
  document.getElementById("전화번호하이픈에러메세지뜨는곳").style.display =
    "none";
  document.getElementById("비밀번호에러메세지뜨는곳").style.display = "none";
  document.getElementById("전화번호에러메세지뜨는곳").style.display = "none";
  document.getElementById("이메일에러메세지뜨는곳").style.display = "none";

  // 회원가입 못하는 경우,
  let error = false;

  // 비밀번호가 맞는지 확인하기
  const 내가입력한비밀번호 = document.getElementById("비밀번호입력창").value;
  const 내가입력한확인비밀번호 =
    document.getElementById("비밀번호확인입력창").value;
  if (내가입력한비밀번호 !== 내가입력한확인비밀번호) {
    error = true;
    document.getElementById("비밀번호에러메세지뜨는곳").style =
      "display:block;";
    const 비밀번호입력인풋 = document.getElementById("비밀번호입력창");
    const 비밀번호확인입력인풋 = document.getElementById("비밀번호확인입력창");

    // classList에 접근하여 클래스를 추가
    비밀번호입력인풋.classList.add("error");
    비밀번호확인입력인풋.classList.add("error");
  }

  //전화번호 검증하기
  const 내가입력한전화번호 = document.getElementById("전화번호입력창").value;
  //입력한 전화번호에 하이픈이 없는경우,
  if (!내가입력한전화번호.includes("-")) {
    error = true;
    document.getElementById("전화번호하이픈에러메세지뜨는곳").style =
      "display:block;";
    const 전화번호입력인풋 = document.getElementById("전화번호입력창");
    전화번호입력인풋.classList.add("error");
  }
  const 전화번호머리 = 내가입력한전화번호.split("-")[0];
  const 전화번호중간 = 내가입력한전화번호.split("-")[1];
  const 전화번호꼬리 = 내가입력한전화번호.split("-")[2];
  // 입력한 전화번호에 하이픈이 있는경우 && 입력한 전화번호에 010이 없는경우,
  if (내가입력한전화번호.includes("-")) {
    if (전화번호머리 !== "010") {
      error = true;
      document.getElementById("전화번호에러메세지뜨는곳").style =
        "display:block;";
      const 전화번호입력인풋 = document.getElementById("전화번호입력창");
      전화번호입력인풋.classList.add("error");
    }
  }

  //이메일 검증
  const 내가입력한이메일 = document.getElementById("이메일입력창").value;
  console.log("내가입력한이메일", 내가입력한이메일);
  const 이메일앞부분 = 내가입력한이메일.split("@")[0];
  const 이메일뒷부분 = 내가입력한이메일.split("@")[1];
  const 가능한이메일도메인 = [
    "naver.com",
    "gmail.com",
    "hanmail.net",
    "kakao.com",
  ];
  let 가입가능여부 = false;
  for (let i = 0; i < 가능한이메일도메인.length; i++) {
    if (가능한이메일도메인[i] === 이메일뒷부분) 가입가능여부 = true;
  }

  // 가입가능한 메일 도메인이 아닌 경우,
  if (!가입가능여부) {
    error = true;
    document.getElementById("이메일에러메세지뜨는곳").style = "display:block;";
    const 이메일입력인풋 = document.getElementById("이메일입력창");
    이메일입력인풋.classList.add("error");
  }
  console.log("가입가능여부", 가입가능여부);
  //회원가입을 못하는 경우 이 다음 단계를 진행하지 않음.
  if (error) return;

  // 오늘날짜 계산하기
  const 나의날짜 = new Date();
  const 연도 = 나의날짜.getFullYear()
  const 월 = String(나의날짜.getMonth() + 1).padStart(2, "0")
  const 일 = String(나의날짜.getDate()).padStart(2, "0")

  const 오늘연월일 = 연도 + "-" + 월 + "-" + 일
    
  // 회원가입 완료 alert 창 날짜와 함께 보여주기
  alert(`회원가입을 축하합니다. \n(가입일시: ${오늘연월일})`);

  // 새로운 수강생 추가하기
  const 내가입력한이름 = document.getElementById("이름입력창").value;

  const 내가입력한자기소개 = document.getElementById("자기소개입력창").value;

  let 내가입력한성별 = "";
  const 남자성별일까 = document.getElementById("male");
  const 여자성별일까 = document.getElementById("female");

  if (남자성별일까.checked) 내가입력한성별 = "남성";
  else if (여자성별일까.checked) 내가입력한성별 = "여성";

  // 문자열쪼개기: 전화번호 가운데 - 쪼개서 ****로 바꾸기
  const 새로운전화번호중간 = "****";
  const 새로운전화번호 =
    전화번호머리 + "-" + 새로운전화번호중간 + "-" + 전화번호꼬리;
  const 새로운수강생 = {
    이름: 내가입력한이름,
    이메일: 내가입력한이메일,
    비밀번호: "****",
    전화번호: 새로운전화번호,
    자기소개: 내가입력한자기소개,
    성별: 내가입력한성별,
    가입일시: 오늘연월일,
  };

  수강생모음.push(새로운수강생);
  // 변경된 수강생목록 보여주기
  JS_수강생DOM만들기();

  // 수강생이 아무도 없는경우 or 있는경우 화면 보여주기
  JS_수강생확인();

  // 입력된 회원 정보를 초기화하기
  JS_회원가입입력정보초기화기능()
}

function JS_인증번호요청기능() {
  if (timer) {
    clearInterval(timer);
  }

  const 인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("인증번호보여주는곳").innerText = 인증번호;

  let 남은시간 = 180;
  JS_타이머셋팅기능(남은시간)
  timer = setInterval(function () {
    남은시간--;
    JS_타이머셋팅기능(남은시간);
    if (남은시간 <= 0) {
      clearInterval(timer)
    }

  }, 1000);
}

function JS_인증완료기능() {
  const 결과버튼 = document.getElementById("회원가입_인증번호_결과버튼");
  const 인증버튼 = document.getElementById("인증번호요청버튼");
  const 인증버튼이미지 = document.getElementById("인증번호요청이미지");
  //인증가능
  if (남은시간 <= 0) {
    결과버튼.src = "./assets/button_primary.png";
  } else if (남은시간 > 0) {
    clearInterval(timer);
    인증여부 = true;
    인증버튼이미지.src = "./assets/인증번호요청완료버튼.png";
    인증버튼.disabled = true
    document.getElementById("남은시간보여주는곳").innerText = "";
    결과버튼.src = "./assets/인증완료.png";
  }
}

function JS_회원가입가능확인기능() {
  const 이름 = document.getElementById("이름입력창").value;
  const 이메일 = document.getElementById("이메일입력창").value;
  const 비밀번호 = document.getElementById("비밀번호입력창").value;
  const 비밀번호확인 = document.getElementById("비밀번호확인입력창").value;
  const 여자선택 = document.getElementById("female").checked;
  const 남자선택 = document.getElementById("male").checked;
  const 동의하기 = document.getElementById("agreement").checked;

  const 인풋창다채웠는지 =
    이메일 !== "" && 이름 !== "" && 비밀번호 !== "" && 비밀번호확인 !== "";
  const 성별선택했는지 = 여자선택 === true || 남자선택 === true;
  const 동의했는지 = 동의하기 === true;
  const 가입버튼 = document.getElementById("회원가입_버튼");
  if (
    인풋창다채웠는지 === true &&
    성별선택했는지 === true &&
    동의했는지 === true &&
    인증여부 === true
  ) {
    가입버튼.src = "./assets/가입가능버튼.png";
    가입버튼.disabled = false;
    return true;
  } else {
    가입버튼.src = "./assets/가입버튼.png";
    가입버튼.disabled = true;
    return false;
  }

  // 삼항연산자로 가입버튼 활성화 여부 보여주기
  // 인풋창다채웠는지 && 성별선택했는지 && 동의했는지
  //   ? (가입버튼.src = "./assets/가입가능버튼.png")
  //   : (가입버튼.src = "./assets/가입버튼.png");
}

// 회원 가입이 완료되면 입력된 정보 초기화하기
function JS_회원가입입력정보초기화기능() {
  const 결과버튼 = document.getElementById("회원가입_인증번호_결과버튼");
  const 인증버튼 = document.getElementById("인증번호요청버튼");
  const 인증버튼이미지 = document.getElementById("인증번호요청이미지");
  const 가입버튼 = document.getElementById("회원가입_버튼");

  document.getElementById("이름입력창").value = "";
  document.getElementById("이메일입력창").value = "";
  document.getElementById("비밀번호입력창").value = "";
  document.getElementById("비밀번호확인입력창").value = "";
  document.getElementById("전화번호입력창").value = "";
  document.getElementById("자기소개입력창").value = "";

  document.getElementById("female").checked = false
  document.getElementById("male").checked = false
  document.getElementById("agreement").checked = false

  document.getElementById("인증번호보여주는곳").innerText = "000000";
  document.getElementById("남은시간보여주는곳").textContent = "00:00"
  인증버튼.disabled = false
  인증버튼이미지.src = "./assets/button_outline.png";
  결과버튼.src = "./assets/button_primary.png"

  가입버튼.src = "./assets/가입버튼.png";
  가입버튼.disabled = true;

  인증여부 = false
}

function JS_타이머셋팅기능(t) {
  const min = String(Math.floor(t / 60)).padStart(2, '0');
  const sec = String(t % 60).padStart(2, '0');
  document.getElementById("남은시간보여주는곳").textContent = `${min}:${sec}`;
}