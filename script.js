function calculateDueDate() {
  const lmpInput = document.getElementById('lmpDate').value;
  if (!lmpInput) {
    alert('Please select the first day of your last period (LMP).');
    return;
  }

  const cycleDays = parseInt(document.getElementById('cycleLength').value);
  const lmpDate = new Date(lmpInput);
  
  // Standard Naegele's rule calculation adjusted for cycle length
  const dueDate = new Date(lmpDate.getTime());
  dueDate.setDate(dueDate.getDate() + 280 + (cycleDays - 28));

  // Conception estimate (LMP + 14 days + cycle adjustment)
  const conceptionDate = new Date(lmpDate.getTime());
  conceptionDate.setDate(conceptionDate.getDate() + 14 + (cycleDays - 28));

  // Current Gestational Age
  const today = new Date();
  const diffTime = today - lmpDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let gestationText = "0 Weeks";
  let trimesterText = "1st Trimester";

  if (diffDays > 0) {
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    gestationText = `${weeks} Weeks, ${days} Days`;

    if (weeks >= 28) {
      trimesterText = "3rd Trimester";
    } else if (weeks >= 13) {
      trimesterText = "2nd Trimester";
    } else {
      trimesterText = "1st Trimester";
    }
  } else {
    gestationText = "Not Started Yet";
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  document.getElementById('dueDateVal').innerText = dueDate.toLocaleDateString('en-US', options);
  document.getElementById('gestationVal').innerText = gestationText;
  document.getElementById('trimesterVal').innerText = trimesterText;
  document.getElementById('conceptionVal').innerText = conceptionDate.toLocaleDateString('en-US', options);

  document.getElementById('resultBox').style.display = 'block';
}
