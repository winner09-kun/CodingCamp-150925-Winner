let data = [];

function validasi(){
    let datei = document.getElementById("date").value;
    let nameValue = document.getElementById("name").value.trim();
    let pesananV = document.getElementById("pesanan").value;
    let dateb = document.getElementById("date");
    let nameInput = document.getElementById("name"); 
    let pesananInput = document.getElementById("pesanan"); 
    let n = 0;
    // Validasi input
    if (pesananV === "no") {
        document.getElementById("erorr").style.display = "block"; 
        pesananInput.style.borderColor = "red"; 
    } else {
        document.getElementById("erorr").style.display = "none"; 
        pesananInput.style.borderColor = "green"; 
        n += 1;
    }
    if (datei === "") {
        document.getElementById("erorr").style.display = "block"; 
        dateb.style.borderColor = "red"; 
    }else {
        document.getElementById("erorr").style.display = "none"; 
        dateb.style.borderColor = "green"; 
        n += 1;
    }
    
    if (nameValue === "") {
        document.getElementById("erorr").style.display = "block"; 
        nameInput.style.borderColor = "red"; 
    } else {
        document.getElementById("erorr").style.display = "none";
        nameInput.style.borderColor = "green"; 
        n += 1;
    }
    // jika semua validasi lolos, panggil inputdata
    if (n === 3) {
        inputdata();
    }

}


// fungsi untuk menambahkan data ke dalam list
function inputdata(){
    const y = document.getElementById("date").value;
    const x = document.getElementById("name").value.trim();
    const z = document.getElementById("pesanan").value;

    // simpan sebagai objek agar mudah di-render
    const entry = { name: x, date: y, pesanan: z };
    data.push(entry);
    console.log('data', data);

    const alertDiv = document.getElementById("myalert");
    alertDiv.classList.remove("hidden"); // tampilkan alert

    // otomatis hilang setelah 3 detik
    setTimeout(() => {
        alertDiv.classList.add("hidden");
    }, 3000);
    filterl();

    // reset form fields
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("pesanan").value = "no";
}

function filterl(){
    // fungsi untuk mengurutkan data berdasarkan tanggal
    data.sort((a, b) => {
        // urutkan berdasarkan tanggal
        return new Date(a.date) - new Date(b.date);
    });
    visualisasi();  
}

function closeA(){
    const alertDiv = document.getElementById("myalert");
    const delateAlert = document.getElementById("delatealert");
    
    alertDiv.classList.add("hidden"); 
    delateAlert.classList.add("hidden"); 
    


}

function delate(){
    // fungsi untuk menghapus semua data
    const list = document.getElementById('ordersList');
    const empty = document.getElementById('emptyState');

    const alertDiv = document.getElementById("delatealert");
    alertDiv.classList.remove("hidden"); // tampilkan alert

    // otomatis hilang setelah 3 detik
    setTimeout(() => {
        alertDiv.classList.add("hidden");
    }, 3000);
    data = [];
    list.innerHTML = '';
    empty.style.display = 'block';

}

function applyFilter() {
    const nameFilter = document.getElementById("filterName").value.trim().toLowerCase();
    const pesananFilter = document.getElementById("filterPesanan").value.trim().toLowerCase();

    // filter data sesuai input
    const filtered = data.filter(item => {
        const matchName = nameFilter === "" || item.name.toLowerCase().includes(nameFilter);
        const matchPesanan = pesananFilter === "" || item.pesanan.toLowerCase().includes(pesananFilter);
        return matchName && matchPesanan;
    });

    // render ulang list dengan data yang sudah difilter
    visualisasi(filtered);
}

function resetFilter() {
    document.getElementById("filterName").value = "";
    document.getElementById("filterPesanan").value = "";
    visualisasi(data); // tampilkan semua data
}

function visualisasi(customData){
    const list = document.getElementById('ordersList');
    const empty = document.getElementById('emptyState');
    list.innerHTML = '';

    // kalau ada data filter, pakai itu, kalau tidak pakai data asli
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
                const delateAlert = document.getElementById("selesai");
                delateAlert.classList.remove("hidden");
                setTimeout(() => {
                    delateAlert.classList.add("hidden");
                }, 2000);
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


function validasi(){
    let datei = document.getElementById("date").value;
    let nameValue = document.getElementById("name").value.trim();
    let pesananV = document.getElementById("pesanan").value;
    let dateb = document.getElementById("date");
    let nameInput = document.getElementById("name"); 
    let pesananInput = document.getElementById("pesanan"); 
    let n = 0;
    // Validasi input
    if (pesananV === "no") {
        document.getElementById("erorr").style.display = "block"; 
        pesananInput.style.borderColor = "red"; 
    } else {
        document.getElementById("erorr").style.display = "none"; 
        pesananInput.style.borderColor = "green"; 
        n += 1;
    }
    if (datei === "") {
        document.getElementById("erorr").style.display = "block"; 
        dateb.style.borderColor = "red"; 
    }else {
        document.getElementById("erorr").style.display = "none"; 
        dateb.style.borderColor = "green"; 
        n += 1;
    }
    
    if (nameValue === "") {
        document.getElementById("erorr").style.display = "block"; 
        nameInput.style.borderColor = "red"; 
    } else {
        document.getElementById("erorr").style.display = "none";
        nameInput.style.borderColor = "green"; 
        n += 1;
    }
    // jika semua validasi lolos, panggil inputdata
    if (n === 3) {
        inputdata();
    }

}


