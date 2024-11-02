// Data penggajian sebagai array contoh
let dataPenggajian = [
    { id: 1, kode: "K001", nama: "Ahmad Sulaiman", jabatan: "Staff", gajiPokok: 3000000, lembur: 1, potongan: 0 },
    { id: 2, kode: "K002", nama: "Siti Aminah", jabatan: "Supervisor", gajiPokok: 4500000, lembur: 2, potongan: 1 },
    { id: 3, kode: "K003", nama: "Rudi Hartono", jabatan: "Manager", gajiPokok: 6000000, lembur: 0, potongan: 0 }
];

// Fungsi untuk render data penggajian ke tabel
function renderTabelPenggajian() {
    const tabelBody = document.querySelector("#tabelPenggajian tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataPenggajian.forEach((penggajian, index) => {
        const totalGaji = penggajian.gajiPokok + (penggajian.lembur * 150000) - (penggajian.potongan * 200000);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${penggajian.kode}</td>
            <td>${penggajian.nama}</td>
            <td>${penggajian.jabatan}</td>
            <td>Rp ${penggajian.gajiPokok.toLocaleString()}</td>
            <td>${penggajian.lembur} kali</td>
            <td>${penggajian.potongan} kali</td>
            <td>Rp ${totalGaji.toLocaleString()}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editPenggajian(${penggajian.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusPenggajian(${penggajian.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah penggajian
function tambahPenggajian() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const jabatan = document.getElementById("jabatan").value;
    const gajiPokok = parseInt(document.getElementById("gaji_pokok").value);
    const lembur = parseInt(document.getElementById("jumlah_lembur").value);
    const potongan = parseInt(document.getElementById("jumlah_potongan").value);

    const penggajianBaru = {
        id: dataPenggajian.length + 1,
        kode: kode,
        nama: nama,
        jabatan: jabatan,
        gajiPokok: gajiPokok,
        lembur: lembur,
        potongan: potongan
    };

    dataPenggajian.push(penggajianBaru);
    renderTabelPenggajian();

    document.getElementById("formPenggajian").reset();
    $("#tambahPenggajianModal").modal("hide");
}

// Fungsi edit penggajian
function editPenggajian(id) {
    const penggajian = dataPenggajian.find(p => p.id === id);

    if (penggajian) {
        document.getElementById("kode_karyawan").value = penggajian.kode;
        document.getElementById("nama").value = penggajian.nama;
        document.getElementById("jabatan").value = penggajian.jabatan;
        document.getElementById("gaji_pokok").value = penggajian.gajiPokok;
        document.getElementById("jumlah_lembur").value = penggajian.lembur;
        document.getElementById("jumlah_potongan").value = penggajian.potongan;

        $("#tambahPenggajianModal").modal("show");
        document.getElementById("simpanPenggajian").onclick = function () {
            simpanPerubahanPenggajian(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan penggajian
function simpanPerubahanPenggajian(id) {
    const penggajian = dataPenggajian.find(p => p.id === id);

    if (penggajian) {
        penggajian.kode = document.getElementById("kode_karyawan").value;
        penggajian.nama = document.getElementById("nama").value;
        penggajian.jabatan = document.getElementById("jabatan").value;
        penggajian.gajiPokok = parseInt(document.getElementById("gaji_pokok").value);
        penggajian.lembur = parseInt(document.getElementById("jumlah_lembur").value);
        penggajian.potongan = parseInt(document.getElementById("jumlah_potongan").value);

        renderTabelPenggajian();
        document.getElementById("formPenggajian").reset();
        $("#tambahPenggajianModal").modal("hide");
    }
}

// Fungsi hapus penggajian
function hapusPenggajian(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data penggajian ini?")) {
        dataPenggajian = dataPenggajian.filter(p => p.id !== id);
        renderTabelPenggajian();
    }
}

// Inisialisasi tabel penggajian saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelPenggajian);
