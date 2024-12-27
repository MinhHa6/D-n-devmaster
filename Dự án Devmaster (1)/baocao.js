// script.js

// Dữ liệu báo cáo
const reportData = [
    { id: 1, name: 'Tài sản A', quantity: 5, location: 'Phòng 101' },
    { id: 2, name: 'Tài sản B', quantity: 8, location: 'Phòng 102' },
    { id: 3, name: 'Tài sản C', quantity: 2, location: 'Phòng 103' },
    { id: 4, name: 'Tài sản D', quantity: 10, location: 'Phòng 104' }
];

// Cập nhật số liệu tổng quan báo cáo
document.getElementById('assetCount').textContent = reportData.length;
document.getElementById('userCount').textContent = 500;  // Giả định số người dùng là 500
document.getElementById('maintenanceRequestCount').textContent = 15; // Giả định có 15 yêu cầu bảo trì

// Hàm hiển thị bảng báo cáo
function renderReportTable() {
    const tableBody = document.getElementById('reportTableBody');
    tableBody.innerHTML = '';  // Xóa dữ liệu cũ

    reportData.forEach((data) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.quantity}</td>
            <td>${data.location}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Biểu đồ báo cáo sử dụng Chart.js
function renderChart() {
    const ctx = document.getElementById('reportChart').getContext('2d');
    const chartData = {
        labels: reportData.map(item => item.name),
        datasets: [{
            label: 'Số lượng tài sản',
            data: reportData.map(item => item.quantity),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gọi hàm render bảng và biểu đồ khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    renderReportTable();
    renderChart();
});
