const questions = [
  { q: "태양계에서 가장 큰 행성은?", a: ["지구", "목성", "토성", "화성"], c: 1 },
  { q: "인류 최초로 달에 발을 디딘 사람은?", a: ["유리 가가린", "버즈 올드린", "닐 암스트롱", "존 글렌"], c: 2 },
  { q: "'붉은 행성'이라고 불리는 행성은?", a: ["화성", "금성", "수성", "천왕성"], c: 0 },
  { q: "빛이 태양에서 지구까지 오는 데 걸리는 시간은 약?", a: ["8분", "8초", "1시간", "1일"], c: 0 },
  { q: "우리 은하의 이름은?", a: ["안드로메다", "마젤란", "은하수", "삼각형자리"], c: 2 },
  { q: "한국의 달 궤도선 이름은?", a: ["나로", "다누리", "누리", "아리랑"], c: 1 }
];

let index = 0, score = 0;
const $ = id => document.getElementById(id);

function show() {
  const item = questions[index];
  $("status").textContent = `문제 ${index + 1} / ${questions.length}`;
  $("bar").style.width = `${(index / questions.length) * 100}%`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("next").hidden = true;
  $("choices").innerHTML = "";
  item.a.forEach((text, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = text;
    b.onclick = () => answer(i);
    $("choices").appendChild(b);
  });
}

function answer(i) {
  const item = questions[index];
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach(b => b.disabled = true);
  buttons[item.c].classList.add("correct");
  if (i === item.c) {
    score++;
    $("feedback").textContent = "🎉 정답입니다!";
  } else {
    buttons[i].classList.add("wrong");
    $("feedback").textContent = "💥 아쉬워요, 오답입니다.";
  }
  $("next").hidden = false;
  $("next").textContent = index === questions.length - 1 ? "결과 보기" : "다음 문제";
}

$("next").onclick = () => {
  index++;
  if (index < questions.length) return show();
  $("bar").style.width = "100%";
  ["question", "choices", "feedback", "next", "status"].forEach(id => $(id).hidden = true);
  $("score").textContent = `🌟 ${questions.length}문제 중 ${score}문제 정답!`;
  $("result").hidden = false;
};

$("restart").onclick = () => {
  index = 0; score = 0;
  ["question", "choices", "feedback", "status"].forEach(id => $(id).hidden = false);
  $("result").hidden = true;
  show();
};

show();
