function generate_notes() {
  const service_disposition = document.querySelector('input[name="service-disposition"]:checked').value;
  const data_services = document.querySelector('input[name="data-services"]:checked').value;
  const description_of_issue = document.getElementById("description").value;
  const initials = document.getElementById("initials").value;

  let services_to_be_completed = "";
  document.getElementsByName('services-completed').forEach(box => {
    if (box.checked) {
      services_to_be_completed += box.value + ", ";
    }
  });
  services_to_be_completed = services_to_be_completed.slice(0, -2); // Remove trailing comma and space

  const turn_time_radio = document.querySelector('input[name="turn-time"]:checked');
  let turn_time = "";
  if (turn_time_radio && turn_time_radio.value === "other") {
    turn_time = document.getElementById("custom-turn-time").value;
  } else if (turn_time_radio) {
    turn_time = turn_time_radio.value;
  }

  const additional_info = document.getElementById("additional-information").value;

  // Concatenate all information into a single string
  const generatedNotes = `${service_disposition} / ${data_services} / 1. ${description_of_issue} / 2. ${services_to_be_completed} / 3. ${turn_time}. ${additional_info} [${initials}]`;


  // Set the generated notes as the value of the textarea
  document.querySelector('.copy-textbox').value = generatedNotes;
}

function copyToClipboard() {
  const copyTextarea = document.getElementById('copy-textbox');
  const textToCopy = copyTextarea.value;

  // Check if the Clipboard API is supported
  if (navigator.clipboard) {
    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Success callback
        alert("Text copied to clipboard!");
      })
      .catch(err => {
        // Error callback
        console.error('Could not copy text: ', err);
        alert("Failed to copy text. Please try again.");
      });
  } else {
    // Fallback for browsers that do not support the Clipboard API
    copyTextarea.select();
    document.execCommand('copy');
    alert("Text copied to clipboard!");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const otherRadio = document.getElementById('other');
  const customTurnTimeInput = document.getElementById('custom-turn-time-input');

  otherRadio.addEventListener('change', function() {
    customTurnTimeInput.style.display = this.checked ? 'block' : 'none';
  });
});

