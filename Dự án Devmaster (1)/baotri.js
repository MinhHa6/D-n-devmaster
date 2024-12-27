// script.js

// Mảng lưu trữ các yêu cầu bảo trì
let maintenanceRequests = [];

// Hàm cập nhật danh sách thiết bị cần bảo trì
function updateDeviceList() {
    const deviceList = document.getElementById('deviceList');
    deviceList.innerHTML = ''; // Xóa danh sách hiện tại

    maintenanceRequests.forEach(request => {
        const li = document.createElement('li');
        li.textContent = `Thiết bị: ${request.device}, Mô tả: ${request.description}`;
        deviceList.appendChild(li);
    });
}

// Hàm vẽ biểu đồ thống kê
function renderChart() {
    const ctx = document.getElementById('maintenanceChart').getContext('2d');
    const deviceNames = maintenanceRequests.map(req => req.device);
    const uniqueDevices = [...new Set(deviceNames)]; // Lấy các thiết bị duy nhất
    const requestCounts = uniqueDevices.map(device => deviceNames.filter(d => d === device).length);

    const chartData = {
        labels: uniqueDevices,
        datasets: [{
            label: 'Số Lượng Yêu Cầu Bảo Trì',
            data: requestCounts,
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
        });
}

// Xử lý sự kiện gửi yêu cầu bảo trì
document.getElementById('maintenanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const device = document.getElementById('device').value;
    const description = document.getElementById('description').value;

    // Thêm yêu cầu bảo trì vào mảng
    maintenanceRequests.push({ device, description });

    // Cập nhật danh sách thiết bị cần bảo trì
    updateDeviceList();

    // Vẽ lại biểu đồ
    renderChart();

    // Reset form
    document.getElementById('maintenanceForm').reset();
});

// Gọi hàm renderChart và updateDeviceList khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    renderChart();
    updateDeviceList();
});
