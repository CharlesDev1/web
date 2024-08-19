import { db, collection, addDoc, updateDoc, doc } from './firebase-config.js';

// Pastikan Firebase dikonfigurasi dan diinisialisasi dengan benar di sini

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const technicianNameInput = document.getElementById('technicianName');
    const submitBtn = document.getElementById('submitBtn');
    const addColumnBtn = document.getElementById('addColumnBtn');
    const dynamicFields = document.getElementById('dynamicFields');

    let taskId = Date.now(); // Temporary ID for new tasks

    // Load tasks from Firestore
    async function loadTasks() {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        renderTasks(tasks); // Ensure renderTasks is defined elsewhere
    }

    function addColumn(client = {}) {
        const columnWrapper = document.createElement('div');
        columnWrapper.classList.add('form-row');
        columnWrapper.innerHTML = `
            <div class="form-group col-md-3">
                <label>Nama Klien</label>
                <input type="text" class="form-control" name="clientName[]" value="${client.name || ''}" placeholder="Nama Klien">
            </div>
            <div class="form-group col-md-3">
                <label>Nomor Klien</label>
                <input type="text" class="form-control" name="clientNumber[]" value="${client.number || ''}" placeholder="Nomor Klien">
            </div>
            <div class="form-group col-md-3">
                <label>Lokasi Manual</label>
                <input type="text" class="form-control" name="clientLocation[]" value="${client.location || ''}" placeholder="Lokasi Manual">
            </div>
            <div class="form-group col-md-3">
                <label>Centang</label>
                <input type="checkbox" name="clientChecked[]" ${client.checked ? 'checked' : ''}>
            </div>
            <div class="form-group col-md-12">
                <button type="button" class="btn btn-danger btn-sm remove-column-btn">Hapus Kolom</button>
            </div>
        `;

        // Tambahkan event listener untuk tombol hapus kolom
        columnWrapper.querySelector('.remove-column-btn').addEventListener('click', () => {
            columnWrapper.remove();
        });

        // Tambahkan kolom ke dynamicFields
        dynamicFields.appendChild(columnWrapper);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const technicianName = technicianNameInput.value.trim();
        const clientNames = document.getElementsByName('clientName[]');
        const clientNumbers = document.getElementsByName('clientNumber[]');
        const clientLocations = document.getElementsByName('clientLocation[]');
        const clientChecked = document.getElementsByName('clientChecked[]');

        const clients = Array.from(clientNames).map((nameInput, index) => {
            return {
                name: nameInput.value.trim(),
                number: clientNumbers[index].value.trim(),
                location: clientLocations[index].value.trim(),
                checked: clientChecked[index].checked
            };
        });

        const newTask = {
            technician: technicianName,
            clients: clients,
            date: new Date().toLocaleDateString()
        };

        if (submitBtn.textContent === 'Edit Tugas') {
            await updateDoc(doc(db, "tasks", taskId.toString()), newTask);
        } else {
            await addDoc(collection(db, "tasks"), newTask);
        }

        alert('Tugas berhasil disimpan!');
        taskForm.reset();
        dynamicFields.innerHTML = '';
        submitBtn.textContent = 'Bagikan Tugas'; // Reset button text after saving
        await loadTasks(); // Refresh the task list
    }

    // Tambahkan event listener untuk tombol tambah kolom
    addColumnBtn.addEventListener('click', () => addColumn());

    // Tambahkan event listener untuk form submit
    taskForm.addEventListener('submit', handleSubmit);

    // Load tasks saat halaman dimuat
    loadTasks();
});
