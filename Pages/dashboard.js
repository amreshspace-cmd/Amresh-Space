name}:\n\nMass: ${item.mass}\nDiscovery Date: ${item.discoveryDate}`);
        }
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'block';
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }

    showError(message) {
        const grid = document.getElementById('dashboardGrid');
        if (grid) {
            grid.innerHTML = <p class="error-message">${message}</p>;
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
