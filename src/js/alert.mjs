export default class Alert {
  constructor(alertfile = "/alert.json") {
    this.alertfile = alertfile; 
  }

  async showAlert() {
    try {
      const response = await fetch(this.alertfile); 
      const alerts = await response.json(); 

      if (alerts.length > 0) {
        const alertSection = document.createElement("section");
        alertSection.classList.add("alert-list");

      
        alerts.forEach(alert => {
          const alertPara = document.createElement("p");
          alertPara.textContent = alert.message;
          alertPara.style.background = alert.background;
          alertPara.style.color = alert.color;
          alertPara.style.padding = "10px";
          alertPara.style.margin = "5px 0";

          alertSection.appendChild(alertPara);
        });

    
        const main = document.querySelector("main");
        main.prepend(alertSection);
      }

    } catch (error) {
      console.log("Failed to load alert:", error);
    }
  }
}
