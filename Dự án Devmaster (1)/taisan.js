// script.js

// Lưu trữ tài sản trong một mảng
let assets = [];

// Lấy các phần tử từ HTML
const addAssetForm = document.getElementById('addAssetForm');
const assetNameInput = document.getElementById('assetName');
const assetQuantityInput = document.getElementById('assetQuantity');
const assetLocationInput = document.getElementById('assetLocation');
const assetImageInput = document.getElementById('assetImage'); // Thêm input hình ảnh
const assetTableBody = document.getElementById('assetTableBody');

// Hàm thêm tài sản
addAssetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const assetName = assetNameInput.value;
    const assetQuantity = assetQuantityInput.value;
    const assetLocation = assetLocationInput.value;
    const assetImage = assetImageInput.files[0];  // Lấy hình ảnh từ input

    // Kiểm tra xem có hình ảnh không
    let assetImageURL = '';
    if (assetImage) {
        assetImageURL = URL.createObjectURL(assetImage); // Tạo URL tạm thời cho hình ảnh
    }

    // Thêm tài sản mới vào mảng
    const newAsset = {
        name: assetName,
        quantity: assetQuantity,
        location: assetLocation,
        image: assetImageURL // Lưu hình ảnh
    };

    assets.push(newAsset);

    // Hiển thị lại danh sách tài sản
    renderAssetList();

    // Làm trống form sau khi thêm tài sản
    assetNameInput.value = '';
    assetQuantityInput.value = '';
    assetLocationInput.value = '';
    assetImageInput.value = '';  // Xóa input hình ảnh
});

// Hàm hiển thị danh sách tài sản
function renderAssetList() {
    assetTableBody.innerHTML = ''; // Xóa danh sách cũ

    assets.forEach((asset, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.quantity}</td>
            <td>${asset.location}</td>
            <td>
                ${asset.image ? `<img src="${asset.image}" alt="${asset.name}" width="50" height="50">` : 'Không có hình ảnh'}
            </td>
             <td>
                <button class="delete-btn" onclick="deleteAsset(${index})">Xóa</button>
            </td>
        `;
        
        assetTableBody.appendChild(row);
    });
}

// Hàm xóa tài sản
function deleteAsset(index) {
    assets.splice(index, 1);  // Xóa tài sản khỏi mảng
    renderAssetList();  // Cập nhật lại danh sách tài sản
}
