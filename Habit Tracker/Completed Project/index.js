const form = document.getElementById("habit__form");
const habits_wrapper = document.getElementById("habits__wrapper");
const habit_progress_element = document.getElementById(
  "habit__progress__value"
);

let habits = [];

const calculateHabitProgress = () => {
  console.log(habits);
  let progress_in_percentage = 0;
  if (habits.length != 0) {
    let total_habits_completed = habits.filter(
      (habit) => habit.completed
    ).length;
    let total_habits = habits.length;

    let progress = (total_habits_completed / total_habits).toFixed(2);
    progress_in_percentage = progress * 100;

    console.log(
      `habits_completed:${total_habits_completed}, total_habits:${total_habits}, progress:${progress}, progress_in_percentage:${progress_in_percentage}`
    );
  }

  habit_progress_element.innerHTML = `${progress_in_percentage}%`;
};

const createHabit = (habit_data) => {
  const habit = document.createElement("div");
  habit.setAttribute("class", "habit");
  habit.setAttribute("id", `${habit_data.name}`);
  habit.innerHTML = `
      <button class='delete__button' onclick="deleteHabit('${habit_data.name}')">X</button>
      <h4>Habit:${habit_data.name} </h4>
      <p>
        Repetitions (Daily): ${habit_data.goal} times before (<strong>${habit_data.time}</strong>)
      </p>
      <p>
        Start Date: ${habit_data.start_date}
      </p>
      <button ${habit_data.completed?"disabled":"null"} class="markAsCompleted" onclick="markAsCompleted('${habit_data.name}')">Mark as Completed</button>
    `;

  if(habit_data.completed){
    habit.classList.add('completed')
  }

  return habit;
};

const renderHabits = () => {
  calculateHabitProgress();
  if (!habits.length) {
    habits_wrapper.innerHTML = '<h5 style="margin:0 auto;">No Habits Added</h5>';
  } else {
    habits_wrapper.innerHTML = "";
    habits.forEach((habit) => {
      const created_habit = createHabit(habit);
      habits_wrapper.appendChild(created_habit);
    });
  }
};

const deleteHabit = (habit_id) => {
  let index = habits.indexOf(habits.filter((ele) => ele.name == habit_id)[0]);

  habits.splice(index, 1);
  renderHabits();
};

const markAsCompleted = (habit_id) => {
  console.log("completed");
  let index = habits.indexOf(habits.filter((ele) => ele.name == habit_id)[0]);
  const habit = document.getElementById(habit_id);
  console.log(index);
  habits[index].completed = true;
  console.log("markAsCompleted:", habits);
  calculateHabitProgress();
  renderHabits()
  habit.classList.add("completed");
};

renderHabits();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name");
  const goal = document.getElementById("goal");
  const time = document.getElementById("time");
  const start_date = document.getElementById("start__date");

  let habit_data = {
    name: name.value,
    goal: goal.value,
    time: time.value,
    completed: false,
    start_date: start_date.value,
  };

  if (!habits.some((el) => el.name === habit_data.name)) {
    habits.push(habit_data);
  } else {
    alert("Habit already added");
  }
  renderHabits();
});
