document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("certifications-table-body");
  const documentModalLabel = document.getElementById("documentModalLabel");
  const pdfContainer = document.getElementById("pdfContainer");

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
          
          if (pdfContainer) {
            pdfContainer.innerHTML = '<div class="text-white mt-5"><div class="spinner-border text-light" role="status"></div><div class="mt-2">Loading document...</div></div>';
            
            // Load PDF using pdf.js
            const loadingTask = pdfjsLib.getDocument(fileUrl);
            loadingTask.promise.then(function(pdf) {
              pdfContainer.innerHTML = ''; // clear loading
              
              // Render all pages
              for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(function(page) {
                  const scale = 1.5; // High resolution scale
                  const viewport = page.getViewport({scale: scale});
                  
                  const canvas = document.createElement("canvas");
                  canvas.className = "mb-3 shadow-sm bg-white";
                  canvas.style.maxWidth = "100%";
                  canvas.style.height = "auto";
                  
                  // Prevent interactions to stop saving as image
                  canvas.style.pointerEvents = "none";
                  canvas.style.userSelect = "none";
                  canvas.style.webkitUserSelect = "none";
                  canvas.style.touchAction = "none";
                  canvas.setAttribute("draggable", false);
                  
                  // Disable right-click / long press directly as fallback
                  canvas.addEventListener('contextmenu', e => e.preventDefault());
                  
                  const context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  
                  // Ensure pages are ordered correctly by appending to a placeholder if needed, 
                  // but for simplicity we can just append. For multi-page, a wrapper helps order.
                  const wrapper = document.createElement("div");
                  wrapper.id = `page-${pageNum}`;
                  wrapper.style.order = pageNum;
                  wrapper.style.display = "flex";
                  wrapper.style.justifyContent = "center";
                  wrapper.appendChild(canvas);
                  
                  pdfContainer.style.display = "flex";
                  pdfContainer.style.flexDirection = "column";
                  pdfContainer.appendChild(wrapper);
                  
                  const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                  };
                  page.render(renderContext);
                });
              }
            }).catch(function(error) {
              console.error('Error loading PDF:', error);
              pdfContainer.innerHTML = '<div class="text-danger mt-5 bg-white p-3 rounded d-inline-block">Error loading document. It may not be a valid PDF.</div>';
            });
          }
        });
      });
      
      // Clear container when modal is closed
      const documentModal = document.getElementById("documentModal");
      if (documentModal) {
        documentModal.addEventListener("hidden.bs.modal", function () {
          if (pdfContainer) pdfContainer.innerHTML = "";
        });
      }
    })
    .catch(error => {
      console.error("Error loading certifications:", error);
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Failed to load documents.</td></tr>`;
    });
});
