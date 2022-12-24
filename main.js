const writter = document.querySelector("#writter");
const btnEncrypt = document.querySelector("#encrypt");
const btnDecrypt = document.querySelector("#decrypt");
const displayEncrypt = document.querySelector("#displayEncrypt");
const copyText = document.querySelector("#copyText");
const haveExtraAnimation = document.querySelector("#have-animation-extra");
const toastAlert = document.querySelector("#toastAlert");

function encrypt(letter) {
  const values = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  if (values[letter]) return values[letter];
  return letter;
}

function decrypt(letter) {
  let check = "";
  const exp = [
    { e: /enter/g },
    { i: /imes/g },
    { a: /ai/g },
    { o: /ober/g },
    { u: /ufat/g },
  ];
  exp.forEach((e) => {
    letter = letter.replace(Object.values(e)[0], Object.keys(e)[0]);
    check = letter;
  });
  return check;
}


function activeAnimationExtra(lock) {
  if (lock === "none") return (haveExtraAnimation.innerHTML = "");
  let pushed = `<img class="animation-charge" src="./img/icons/cat.svg" />

  `;
  haveExtraAnimation.innerHTML = pushed;
}

let switchAnimation = "lock";
let cicle = null;
function timer(lock) {
  cicle = setInterval(() => {
    if (lock === "lock") {
      lock = "unlock";
    } else if (lock === "unlock") {
      lock = "lock";
    } else {
      activeAnimationExtra("none");
    }
    activeAnimationExtra(lock);
  });
}
function toast(message, color) {
  toastAlert.style.opacity = "1";
  let pushed = `<p class="toastAlert" style="background-color: ${color};">${message}</p>`;
  toastAlert.innerHTML = pushed;
  setTimeout(() => {
    toastAlert.style.opacity = "0";
  }, 3000);
}

timer(switchAnimation);

function validations(check) {
  if (check.match(/[0-9]/g)) {
    return "No admite números";
  } else if (check.match(/[A-Z]/g)) {
    return "Solo letras minúsculas";
  } else if (!check.match(/^[a-z\s]+$/g)) {
    return "No debe tener acentos";
  }
  return "passed";
}

btnEncrypt.addEventListener("click", (e) => {
  if (writter.value) {
    if (validations(writter.value) === "passed") {
      activeAnimationExtra("none");
      clearInterval(cicle);
      let check = "";
      for (let letter in writter.value) {
        check += encrypt(writter.value[letter]);
      }
      displayEncrypt.value = check;
      writter.value = "";
    } else {
      toast(validations(writter.value), "red");
    }
  } else {
    toast("Ingresa un texto", "red");
  }
});

btnDecrypt.addEventListener("click", (e) => {
  if (writter.value) {
    if (validations(writter.value) === "passed") {
      displayEncrypt.value = decrypt(writter.value);
      writter.value = "";
    } else {
      toast(validations(writter.value), "red");
    }
  } else {
    toast("Ingresa un texto", "red");
  }
});

copyText.addEventListener("click", async (e) => {
  if (displayEncrypt.value) {
    displayEncrypt.focus();
    displayEncrypt.select();
    toast("Copiado", "green");
    await navigator.clipboard.writeText(displayEncrypt.value);
  } else {
    toast("Nada que copiar", "gray");
  }
});
