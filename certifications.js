document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("certifications-table-body");
  const documentModalLabel = document.getElementById("documentModalLabel");
  const documentViewerFrame = document.getElementById("documentViewerFrame");

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
            <button class="btn btn-sm btn-outline-success rounded-pill px-3 view-doc-btn" 
              data-bs-toggle="modal" 
              data-bs-target="#documentModal" 
              data-title="${doc.title}" 
              data-file="${doc.file}">
              <i class="fas fa-eye me-1"></i> View
            </button>
          </td>
        `;
        
        tableBody.appendChild(row);
      });

      // Add event listeners to all "View" buttons
      document.querySelectorAll(".view-doc-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const title = this.getAttribute("data-title");
          const fileUrl = this.getAttribute("data-file");
          
          if (documentModalLabel) documentModalLabel.textContent = title;
          if (documentViewerFrame) documentViewerFrame.src = fileUrl;
        });
      });
      
      // Clear iframe when modal is closed to stop rendering
      const documentModal = document.getElementById("documentModal");
      if (documentModal) {
        documentModal.addEventListener("hidden.bs.modal", function () {
          if (documentViewerFrame) documentViewerFrame.src = "";
        });
      }
    })
    .catch(error => {
      console.error("Error loading certifications:", error);
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Failed to load documents.</td></tr>`;
    });
});
