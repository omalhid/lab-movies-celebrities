document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

document.getElementById("goBack").addEventListener("click", goBack);
document.getElementById("goHome").addEventListener("click", goToHomePage);
function goBack() {
  window.history.back();
}
function goToHomePage() {
  window.location.href = "/";
}
