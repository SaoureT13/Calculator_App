const switcher = document.querySelector(".container-switcher");
const toggle = document.querySelector(".switch-roller");
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const themeNumber = document.querySelector(".theme-number");
const specialOperator = ["%", "/", "*", "+", "."];
const historical = document.querySelector(".historical");
let restat = 0;

let theme = 1;

const themes = {
  1: {
    transform: "translateX(0px)",
    Very_dark_desaturated_blue: "hsl(222, 26%, 31%)",
    Very_dark_desaturated_bluee: "hsl(223, 31%, 20%)",
    Very_dark_desaturated_blueee: "hsl(224, 36%, 15%)",
    Desaturated_dark_blue: "hsl(225, 21%, 49%)",
    Desaturated_dark_bluee: "hsl(224, 28%, 35%)",
    Red: "hsl(6, 63%, 50%)",
    Dark_red: "hsl(6, 70%, 34%)",
    Light_grayish_orange: "hsl(30, 25%, 89%)",
    Grayish_orange: "hsl(28, 16%, 65%)",
    Very_dark_grayish_blue: "hsl(221, 14%, 31%)",
    White: "hsl(0, 0%, 100%)",
  },
  2: {
    transform: "translateX(30px)",
    Very_dark_desaturated_blue: "hsl(0, 0%, 90%)",
    Very_dark_desaturated_bluee: " hsl(0, 5%, 81%)",
    Very_dark_desaturated_blueee: "hsl(0, 0%, 93%)",
    Desaturated_dark_blue: "hsl(185, 42%, 37%)",
    Desaturated_dark_bluee: "hsl(185, 58%, 25%)",
    Red: "hsl(25, 98%, 40%)",
    Dark_red: "hsl(25, 99%, 27%)",
    Light_grayish_orange: "hsl(45, 7%, 89%)",
    Grayish_orange: "hsl(35, 11%, 61%)",
    Very_dark_grayish_blue: "hsl(60, 10%, 19%)",
    White: "hsl(0, 0%, 0%)",
  },
  3: {
    transform: "translateX(60px)",
    Very_dark_desaturated_blue: "hsl(268, 75%, 9%)",
    Very_dark_desaturated_bluee: "hsl(268, 71%, 12%)",
    Very_dark_desaturated_blueee: "hsl(268, 71%, 12%)",
    Desaturated_dark_blue: "hsl(281, 89%, 26%)",
    Desaturated_dark_bluee: "hsl(285, 91%, 52%)",
    Red: "hsl(176, 100%, 44%)",
    Dark_red: "hsl(177, 92%, 70%)",
    Light_grayish_orange: "hsl(268, 47%, 21%)",
    Grayish_orange: "hsl(290, 70%, 36%)",
    Very_dark_grayish_blue: "hsl(52, 100%, 62%)",
    White: "hsl(52, 100%, 62%)",
  },
};

function toogleTheme() {
  let currentTheme = themes[theme];
  toggle.style.transform = currentTheme.transform;

  Object.entries(currentTheme).forEach(([property, value]) => {
    if (property !== "transform") {
      document.documentElement.style.setProperty(`--${property}`, value);
    }
  });
}

switcher.addEventListener("click", (e) => {
  e.preventDefault();

  theme++;

  if (theme > 3) {
    theme = 1;
    toggle.style.transform = "translateX(0px)";
  }
  toogleTheme()
});


themeNumber.querySelectorAll("p").forEach((p, i) => {
  p.addEventListener("click", (e) => {
    e.preventDefault();
    theme = i + 1;

    toogleTheme()
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      specialOperator.includes(e.target.dataset.value) &&
      display.value === ""
    ) {
      return;
    } else if (e.target.dataset.value === "del") {
      display.value = display.value.toString().slice(0, -1);
    } else if (e.target.dataset.value === "reset") {
      display.value = "";
    } else if (e.target.dataset.value === "equal") {
      historical.value = `${display.value} = ${eval(display.value)}`;
      display.value = eval(display.value);
      restat = 1;
    }

    if (
      e.target.dataset.value !== "reset" &&
      e.target.dataset.value !== "equal" &&
      e.target.dataset.value !== "del"
    ) {
      if (restat === 1) {
        display.value = "";
        restat = 0;
      }
      display.value += e.target.dataset.value;
    } else {
      return;
    }
  });
});
