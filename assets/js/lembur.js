// Data lembur sebagai array contoh
let dataLembur = [
    { id: 1, kode: "K001", nama: "Ahmad Sulaiman", tanggal: "2024-11-01", jamMulai: "17:00", jamSelesai: "19:00", totalJam: "2 Jam" },
    { id: 2, kode: "K002", nama: "Siti Aminah", tanggal: "2024-11-01", jamMulai: "18:00", jamSelesai: "20:00", totalJam: "2 Jam" },
    { id: 3, kode: "K003", nama: "Rudi Hartono", tanggal: "2024-11-01", jamMulai: "17:30", jamSelesai: "19:30", totalJam: "2 Jam" }
];

// Fungsi untuk render data lembur ke tabel
function renderTabelLembur() {
    const tabelBody = document.querySelector("#tabelLembur tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataLembur.forEach((lembur, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${lembur.kode}</td>
            <td>${lembur.nama}</td>
            <td>${lembur.tanggal}</td>
            <td>${lembur.jamMulai}</td>
            <td>${lembur.jamSelesai}</td>
            <td>${lembur.totalJam}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editLembur(${lembur.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusLembur(${lembur.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah lembur
function tambahLembur() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const jamMulai = document.getElementById("jam_mulai").value;
    const jamSelesai = document.getElementById("jam_selesai").value;

    if (!kode || !nama || !tanggal || !jamMulai || !jamSelesai) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const lemburBaru = {
        id: dataLembur.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
        totalJam: `${(new Date(`1970-01-01T${jamSelesai}:00`) - new Date(`1970-01-01T${jamMulai}:00`)) / 3600000} Jam`
    };

    dataLembur.push(lemburBaru);
    renderTabelLembur();

    document.getElementById("formLembur").reset();
    $("#tambahLemburModal").modal("hide");
}

// Fungsi edit lembur
function editLembur(id) {
    const lembur = dataLembur.find(l => l.id === id);

    if (lembur) {
        document.getElementById("kode_karyawan").value = lembur.kode;
        document.getElementById("nama").value = lembur.nama;
        document.getElementById("tanggal").value = lembur.tanggal;
        document.getElementById("jam_mulai").value = lembur.jamMulai;
        document.getElementById("jam_selesai").value = lembur.jamSelesai;

        $("#tambahLemburModal").modal("show");
        document.getElementById("simpanLembur").onclick = function () {
            simpanPerubahanLembur(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan lembur
function simpanPerubahanLembur(id) {
    const lembur = dataLembur.find(l => l.id === id);

    if (lembur) {
        lembur.kode = document.getElementById("kode_karyawan").value;
        lembur.nama = document.getElementById("nama").value;
        lembur.tanggal = document.getElementById("tanggal").value;
        lembur.jamMulai = document.getElementById("jam_mulai").value;
        lembur.jamSelesai = document.getElementById("jam_selesai").value;
        lembur.totalJam = `${(new Date(`1970-01-01T${lembur.jamSelesai}:00`) - new Date(`1970-01-01T${lembur.jamMulai}:00`)) / 3600000} Jam`;

        renderTabelLembur();
        document.getElementById("formLembur").reset();
        $("#tambahLemburModal").modal("hide");
    }
}

// Fungsi hapus lembur
function hapusLembur(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data lembur ini?")) {
        dataLembur = dataLembur.filter(l => l.id !== id);
        renderTabelLembur();
    }
}

// Inisialisasi tabel lembur saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelLembur);
