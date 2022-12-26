// Modal Document Event Listeners
const aboutButton = document.getElementById("about-button");
const aboutModal = document.getElementById("about-modal");
const closeAbout = document.getElementById("close-about");

aboutButton.addEventListener("click", () => {
  aboutModal.showModal();
});
closeAbout.addEventListener("click", () => {
  aboutModal.close();
});
