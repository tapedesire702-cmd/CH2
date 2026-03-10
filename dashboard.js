document.addEventListener("DOMContentLoaded", () => {
  // Animation of numbers
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/[^0-9.]/g, "");
      const inc = target / speed;

      if (count < target) {
        let current = count + inc;
        if (counter.innerText.includes("$")) {
          counter.innerText = "$" + Math.ceil(current).toLocaleString();
        } else if (Number.isInteger(target)) {
          counter.innerText = Math.ceil(current).toLocaleString();
        } else {
          counter.innerText = current.toFixed(1);
        }
        setTimeout(updateCount, 15);
      } else {
        if (counter.innerText.includes("$")) {
          counter.innerText = "$" + target.toLocaleString();
        } else {
          counter.innerText = target.toLocaleString();
        }
      }
    };
    updateCount();
  });

  // Theme Toggle
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const icon = themeToggleBtn.querySelector("i");

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.body.removeAttribute("data-theme");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      updateChartTheme(false);
    } else {
      document.body.setAttribute("data-theme", "light");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      updateChartTheme(true);
    }
  });

  // Chart.js Setup
  const canvas = document.getElementById("revenueChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    // Gradient for chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.5)");
    gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");

    // Common Chart Configuration
    Chart.defaults.color = "#94a3b8";
    Chart.defaults.font.family = "'Outfit', sans-serif";

    let revenueChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Fév",
          "Mar",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Aoû",
          "Sep",
          "Oct",
          "Nov",
          "Déc",
        ],
        datasets: [
          {
            label: "Revenu ($)",
            data: [
              12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000,
              40000, 38000, 50000,
            ],
            borderColor: "#6366f1",
            backgroundColor: gradient,
            borderWidth: 3,
            pointBackgroundColor: "#0d0f1a",
            pointBorderColor: "#6366f1",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(20, 23, 40, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 12,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return "$" + context.parsed.y.toLocaleString();
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
            ticks: {
              callback: function (value) {
                return "$" + value / 1000 + "k";
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });

    // Update chart theme dynamically
    window.updateChartTheme = function (isLight) {
      const gridColor = isLight
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.05)";
      const textColor = isLight ? "#64748b" : "#94a3b8";
      const tooltipBg = isLight
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(20, 23, 40, 0.9)";
      const tooltipText = isLight ? "#0f172a" : "#fff";
      const pointBg = isLight ? "#f8fafc" : "#0d0f1a";

      revenueChart.options.scales.x.grid.color = gridColor;
      revenueChart.options.scales.y.grid.color = gridColor;

      revenueChart.options.scales.x.ticks.color = textColor;
      revenueChart.options.scales.y.ticks.color = textColor;

      revenueChart.options.plugins.tooltip.backgroundColor = tooltipBg;
      revenueChart.options.plugins.tooltip.titleColor = tooltipText;
      revenueChart.options.plugins.tooltip.bodyColor = tooltipText;

      revenueChart.data.datasets[0].pointBackgroundColor = pointBg;

      revenueChart.update();
    };
  }
});
