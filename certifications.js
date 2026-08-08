document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("certifications-table-body");

  if (!tableBody) return;

  fetch("docs/documents.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(documents => {
      documents.forEach(doc => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
          <td><strong>${doc.title}</strong></td>
          <td>${doc.description}</td>
          <td class="text-center">
            <a href="${doc.file}" class="btn btn-sm btn-outline-success rounded-pill px-3" target="_blank" rel="noopener noreferrer">
              <i class="fas fa-download me-1"></i> Download
            </a>
          </td>
        `;
        
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error loading certifications:", error);
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Failed to load documents.</td></tr>`;
    });
});
