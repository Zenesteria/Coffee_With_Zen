const metric_radio = document.getElementById("metric");
const imperial_radio = document.getElementById("imperial");

const height_ele = document.getElementById("height");
const weight_ele = document.getElementById("weight");

const height_unit = document.getElementById("height_unit");
const weight_unit = document.getElementById("weight_unit");

const result_banner = document.getElementById("banner");
const button = document.getElementById("calculate_bmi");

let unit = "metric";
let BMI = 0;

metric_radio.addEventListener("click", () => {
  unit = "metric";
  imperial_radio.checked = false;
  height_unit.textContent = "cm";
  weight_unit.textContent = "kg";
});

imperial_radio.addEventListener("click", () => {
  unit = "imperial";
  metric_radio.checked = false;
  height_unit.textContent = "in";
  weight_unit.textContent = "lbs";
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  let height_value = height_ele.value;
  let weight_value = weight_ele.value;
  BMI = Calculate_BMI(height_value, weight_value);

  Render_BMI_Result();
});

function Calculate_BMI(height, weight) {
  if (unit == "metric") {
    return (weight / (height / 100) ** 2).toFixed(2);
  }

  if (unit == "imperial") {
    return (weight / height ** 2).toFixed(2);
  }
}

function Render_BMI_Result() {
  result_banner.innerHTML = `
    <h3>Your BMI:</h3>
    <h1>${BMI}</h1>
    `;
}
