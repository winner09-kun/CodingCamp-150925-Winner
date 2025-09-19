let data = [];

// VALIDASI INPUT
function validasi() {
    let datei = document.getElementById("date").value;
    let nameValue = document.getElementById("name").value.trim();
    let pesananV = document.getElementById("pesanan").value;

    let dateInput = document.getElementById("date");
    let nameInput = document.getElementById("name"); 
    let pesananInput = document.getElementById("pesanan"); 
    let errorBox = document.getElementById("erorr");

    // reset style
    dateInput.style.borderColor = "";
    nameInput.style.borderColor = "";
    pesananInput.style.borderColor = "";
    errorBox.style.display = "none";

    // cek satu-satu
    if (nameValue === "") {
        nameInput.style.borderColor = "red";
        errorBox.innerText = "Nama harus diisi!";
        errorBox.style.display = "block";
        return;
    }

    if (datei === "") {
        dateInput.style.borderColor = "red";
        errorBox.innerText = "Tanggal harus diisi!";
        errorBox.style.display = "block";
        return;
    }

    if (pesananV === "no") {
        pesananInput.style.borderColor = "red";
        errorBox.innerText = "Silakan pilih pesanan!";
        errorBox.style.display = "block";
        return;
    }

    // kalau semua valid
    nameInput.style.borderColor = "green";
    dateInput.style.borderColor = "green";
    pesananInput.style.borderColor = "green";
    errorBox.style.display = "none";

    inputdata(); // panggil fungsi inputdata()
}

// TAMBAH DATA
function inputdata(){
    const y = document.getElementById("date").value;
    const x = document.getElementById("name").value.trim();
    const z = document.getElementById("pesanan").value;

    const entry = { name: x, date: y, pesanan: z };
    data.push(entry);

    // tampilkan alert sukses
    const alertDiv = document.getElementById("myalert");
    alertDiv.classList.remove("hidden");
    setTimeout(() => alertDiv.classList.add("hidden"), 3000);

    filterl();

    // reset form
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("pesanan").value = "no";
}

// URUTKAN DATA BERDASARKAN TANGGAL
function filterl(){
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    visualisasi();  
}

// CLOSE ALERT
function closeA(){
    document.getElementById("myalert")?.classList.add("hidden");
    document.getElementById("delatealert")?.classList.add("hidden");
    document.getElementById("selesai")?.classList.add("hidden");
}

// HAPUS SEMUA DATA
function delate(){
    const list = document.getElementById('ordersList');
    const empty = document.getElementById('emptyState');

    const alertDiv = document.getElementById("delatealert");
    alertDiv.classList.remove("hidden");
    setTimeout(() => alertDiv.classList.add("hidden"), 3000);

    data = [];
    list.innerHTML = '';
    empty.style.display = 'block';
}

// FILTER LIST
function applyFilter() {
    const nameFilter = document.getElementById("filterName").value.trim().toLowerCase();
    const pesananFilter = document.getElementById("filterPesanan").value.trim().toLowerCase();

    const filtered = data.filter(item => {
        const matchName = nameFilter === "" || item.name.toLowerCase().includes(nameFilter);
        const matchPesanan = pesananFilter === "" || item.pesanan.toLowerCase().includes(pesananFilter);
        return matchName && matchPesanan;
    });

    visualisasi(filtered);
}

// RESET FILTER
function resetFilter() {
    document.getElementById("filterName").value = "";
    document.getElementById("filterPesanan").value = "";
    visualisasi(data);
}

// TAMPILKAN LIST PESANAN
function visualisasi(customData){
    const list = document.getElementById('ordersList');
    const empty = document.getElementById('emptyState');
    list.innerHTML = '';

    const renderData = customData || data;

    if (renderData.length === 0) {
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';

    renderData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.pesanan} - ${item.date} (${item.name})`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item.pesanan;
        checkbox.id = item.name + item.date;
        checkbox.className = 'mx-2 accent-green-500 cursor-pointer';

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                const selesaiAlert = document.getElementById("selesai");
                selesaiAlert.classList.remove("hidden");
                setTimeout(() => selesaiAlert.classList.add("hidden"), 2000);

                data = data.filter(entry => entry.name + entry.date !== this.id);
                list.removeChild(li);

                if (data.length === 0) {
                    empty.style.display = 'block';
                }
            }
        });

        li.className = 'flex justify-between items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-50 transition duration-150';
        li.appendChild(checkbox);
        list.appendChild(li);
    });
}
