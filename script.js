fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const table = document.createElement("table");
    const titleText = "Videoaulas de Exatas por Assunto";
    const titleRow = table.insertRow();
    const titleCell = titleRow.insertCell();
    titleCell.textContent = titleText.toUpperCase();
    titleCell.className = "subject-title";
    titleCell.colSpan = 4;

    let totalRows = 0;
    const subjectRow = table.insertRow();
    for (const subjectName of Object.keys(data)) {
      const subjectCell = subjectRow.insertCell();
      subjectCell.textContent = subjectName.toUpperCase();
      subjectCell.className = "subject-header";
      totalRows = Math.max(totalRows, Object.keys(data[subjectName]).length);
    }

    for (let rowIndex = 0; rowIndex < totalRows + 1; rowIndex++) {
      const lessonRow = table.insertRow();
      for (const subjectData of Object.values(data)) {
        const lessonCell = lessonRow.insertCell();
        const lesson = Object.entries(subjectData)[rowIndex];
        if (lesson) {
          const [title, link] = lesson;
          const anchor = document.createElement("a");
          anchor.textContent = title;
          anchor.href = link;
          anchor.target = "_blank";
          lessonCell.appendChild(anchor);
        }
      }
    }

    document.getElementById("data-output").appendChild(table);
  });
