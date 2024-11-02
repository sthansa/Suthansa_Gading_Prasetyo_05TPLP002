// Data absensi sebagai array contoh
let dataAbsensi = [
    { id: 1, kode: "K001", nama: "Ahmad Sulaiman", tanggal: "2024-11-01", jamMasuk: "08:00", jamKeluar: "16:00", status: "Hadir" },
    { id: 2, kode: "K002", nama: "Siti Aminah", tanggal: "2024-11-01", jamMasuk: "08:15", jamKeluar: "16:00", status: "Terlambat" }
];

// Fungsi untuk render data absensi ke tabel
function renderTabelAbsensi() {
    const tabelBody = document.querySelector("#tabelAbsensi tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataAbsensi.forEach((absensi, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${absensi.kode}</td>
            <td>${absensi.nama}</td>
            <td>${absensi.tanggal}</td>
            <td>${absensi.jamMasuk}</td>
            <td>${absensi.jamKeluar}</td>
            <td>${absensi.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editAbsensi(${absensi.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusAbsensi(${absensi.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah absensi
function tambahAbsensi() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const jamMasuk = document.getElementById("jam_masuk").value;
    const jamKeluar = document.getElementById("jam_keluar").value;
    const status = document.getElementById("status").value;

    if (!kode || !nama || !tanggal || !jamMasuk || !jamKeluar || !status) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const absensiBaru = {
        id: dataAbsensi.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        jamMasuk: jamMasuk,
        jamKeluar: jamKeluar,
        status: status
    };

    dataAbsensi.push(absensiBaru);
    renderTabelAbsensi();

    document.getElementById("formAbsensi").reset();
    $("#tambahAbsensiModal").modal("hide");
}

// Fungsi edit absensi
function editAbsensi(id) {
    const absensi = dataAbsensi.find(a => a.id === id);

    if (absensi) {
        document.getElementById("kode_karyawan").value = absensi.kode;
        document.getElementById("nama").value = absensi.nama;
        document.getElementById("tanggal").value = absensi.tanggal;
        document.getElementById("jam_masuk").value = absensi.jamMasuk;
        document.getElementById("jam_keluar").value = absensi.jamKeluar;
        document.getElementById("status").value = absensi.status;

        $("#tambahAbsensiModal").modal("show");
        document.getElementById("simpanAbsensi").onclick = function () {
            simpanPerubahanAbsensi(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan absensi
function simpanPerubahanAbsensi(id) {
    const absensi = dataAbsensi.find(a => a.id === id);

    if (absensi) {
        absensi.kode = document.getElementById("kode_karyawan").value;
        absensi.nama = document.getElementById("nama").value;
        absensi.tanggal = document.getElementById("tanggal").value;
        absensi.jamMasuk = document.getElementById("jam_masuk").value;
        absensi.jamKeluar = document.getElementById("jam_keluar").value;
        absensi.status = document.getElementById("status").value;

        renderTabelAbsensi();
        document.getElementById("formAbsensi").reset();
        $("#tambahAbsensiModal").modal("hide");

        document.getElementById("simpanAbsensi").onclick = tambahAbsensi;
    }
}

// Fungsi hapus absensi
function hapusAbsensi(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data absensi ini?")) {
        dataAbsensi = dataAbsensi.filter(a => a.id !== id);
        renderTabelAbsensi();
    }
}

// Inisialisasi tabel absensi saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelAbsensi);
