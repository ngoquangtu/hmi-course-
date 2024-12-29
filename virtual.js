document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;

    const vmForm = document.getElementById("vm-form");
    const nextStepButton = document.getElementById("next-step");
    const prevStepButton = document.getElementById("prev-step");
    const payVmButton = document.getElementById("pay-vm");

    const ramCostElement = document.getElementById("ram-cost");
    const storageCostElement = document.getElementById("storage-cost");
    const totalCostElement = document.getElementById("total-cost");

    const vmTableBody = document.querySelector("#vm-table tbody");

    const ramPricePerGB = 5; // Cost per GB of RAM
    const storagePricePerGB = 0.5; // Cost per GB of storage
    let vms = []; // List to store created VMs

    nextStepButton.addEventListener("click", () => {
        if (currentStep === 1) {
            const ram = document.getElementById("vm-ram").value;
            const storage = document.getElementById("vm-storage").value;

            if (!ram || !storage) {
                alert("Please complete all fields.");
                return;
            }

            const ramCost = ram * ramPricePerGB;
            const storageCost = storage * storagePricePerGB;
            const totalCost = ramCost + storageCost;

            ramCostElement.textContent = `$${ramCost}`;
            storageCostElement.textContent = `$${storageCost}`;
            totalCostElement.textContent = `$${totalCost}`;

            showStep(2);
        }
    });

    prevStepButton.addEventListener("click", () => {
        if (currentStep === 2) {
            showStep(1);
        }
    });

    payVmButton.addEventListener("click", () => {
        const cardNumber = document.getElementById("card-number").value;
        const expirationDate = document.getElementById("expiration-date").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardNumber || !expirationDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        alert("Payment successful! Your virtual machine has been created.");

        const newVm = {
            id: Date.now(),
            name: document.getElementById("vm-name").value,
            ram: document.getElementById("vm-ram").value + "GB",
            storage: document.getElementById("vm-storage").value + "GB",
            os: document.getElementById("vm-os").value,
            graphics: document.getElementById("vm-graphics").value,
            status: "Stopped",
        };

        vms.push(newVm);
        renderVMTable();

        // Close modal and reset form
        vmForm.reset();
        const vmModal = bootstrap.Modal.getInstance(document.getElementById("vmModal"));
        vmModal.hide();

        // Reset step
        showStep(1);
    });

    function showStep(step) {
        currentStep = step;
        document.querySelector(".step-1").classList.toggle("d-none", step !== 1);
        document.querySelector(".step-2").classList.toggle("d-none", step !== 2);
        nextStepButton.classList.toggle("d-none", step === 2);
        prevStepButton.classList.toggle("d-none", step === 1);
        payVmButton.classList.toggle("d-none", step !== 2);
    }

    function renderVMTable() {
        vmTableBody.innerHTML = ""; // Clear existing rows
        vms.forEach((vm) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${vm.id}</td>
                <td>${vm.name}</td>
                <td>${vm.ram}</td>
                <td>${vm.storage}</td>
                <td>${vm.os}</td>
                <td>${vm.graphics}</td>
                <td>${vm.status}</td>
                <td>
                    <button class="btn btn-success btn-sm start-vm" data-id="${vm.id}">Start</button>
                    <button class="btn btn-danger btn-sm delete-vm" data-id="${vm.id}">Delete</button>
                </td>
            `;

            vmTableBody.appendChild(row);
        });

        // Add event listeners for Start and Delete buttons
        document.querySelectorAll(".start-vm").forEach((button) => {
            button.addEventListener("click", (event) => {
                const id = parseInt(event.target.getAttribute("data-id"));
                const vm = vms.find((v) => v.id === id);
                if (vm) {
                    vm.status = "Running";
                    renderVMTable();
                }
            });
        });

        document.querySelectorAll(".delete-vm").forEach((button) => {
            button.addEventListener("click", (event) => {
                const id = parseInt(event.target.getAttribute("data-id"));
                vms = vms.filter((v) => v.id !== id);
                renderVMTable();
            });
        });
    }
});
