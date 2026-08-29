console.log("ADMIN JS LOADED");

const API = "http://127.0.0.1:3000/api/admin";
const token = localStorage.getItem("adminToken");

let enquiries = [];

console.log("Admin token exists:", Boolean(token));

if (!token) {
    window.location.href = "login.html";
}

function handleUnauthorized(response) {
    if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        window.location.href = "login.html";

        return true;
    }

    return false;
}

/* =====================================
   LOAD PAGE
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard DOM loaded");

    loadStats();
    loadEnquiries();
});

/* =====================================
   LOAD DASHBOARD STATS
===================================== */

async function loadStats() {

    try {

        const response = await fetch(
            `${API}/stats`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (handleUnauthorized(response)) {
            return;
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to load statistics."
            );
        }

        const stats = result.data;

        document.getElementById("totalEnquiries").textContent =
            stats.total ?? 0;

        document.getElementById("newEnquiries").textContent =
            stats.new_count ?? 0;

        document.getElementById("contactedEnquiries").textContent =
            stats.contacted_count ?? 0;

        document.getElementById("qualifiedEnquiries").textContent =
            stats.qualified_count ?? 0;

        document.getElementById("convertedEnquiries").textContent =
            stats.converted_count ?? 0;

    } catch (error) {

        console.error(
            "Dashboard stats error:",
            error
        );

    }

}

/* =====================================
   LOAD ENQUIRIES
===================================== */

async function loadEnquiries() {

    try {

        const response = await fetch(
            `${API}/enquiries`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (handleUnauthorized(response)) {
            return;
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to load enquiries."
            );
        }

        enquiries = result.data;

        renderTable(enquiries);

    } catch (error) {

        console.error(
            "Enquiry loading error:",
            error
        );

        document.getElementById(
            "enquiryTableBody"
        ).innerHTML = `
            <tr>
                <td colspan="9" class="loading">
                    Unable to load enquiries.
                </td>
            </tr>
        `;

    }

}

/* =====================================
   RENDER TABLE
===================================== */

function renderTable(data) {

    const tbody =
        document.getElementById(
            "enquiryTableBody"
        );


    if (data.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="loading">

                    No enquiries found.

                </td>

            </tr>

        `;

        return;

    }


    tbody.innerHTML =
        data.map(item => {

            const date =
                new Date(
                    item.created_at
                ).toLocaleDateString();


            return `

                <tr>

                    <td>
                        ${item.enquiry_id}
                    </td>

                    <td>
                        ${item.full_name}
                    </td>

                    <td>
                        ${item.company_name || "-"}
                    </td>

                    <td>
                        ${item.service_required}
                    </td>

                    <td>
                        ${item.email}
                    </td>

                    <td>
                        ${item.phone}
                    </td>

                    <td>

                        <select
                            class="status-select"
                            onchange="
                                updateStatus(
                                    ${item.enquiry_id},
                                    this.value
                                )
                            ">

                            ${createStatusOptions(
                                item.status
                            )}

                        </select>

                    </td>

                    <td>
                        ${date}
                    </td>

                    <td>

                        <button
                            class="view-btn"
                            onclick="
                                viewEnquiry(
                                    ${item.enquiry_id}
                                )
                            ">

                            View

                        </button>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =====================================
   STATUS OPTIONS
===================================== */

function createStatusOptions(
    currentStatus
) {

    const statuses = [
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Closed"
    ];


    return statuses
        .map(status => `

            <option
                value="${status}"
                ${
                    status === currentStatus
                        ? "selected"
                        : ""
                }>

                ${status}

            </option>

        `)
        .join("");

}


/* =====================================
   UPDATE STATUS
===================================== */

async function updateStatus(
    enquiryId,
    status
) {

    try {

const response =
    await fetch(
        `${API}/enquiries/${enquiryId}/status`,
        {

            method:"PATCH",

            headers:{

                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`

            },

            body:
                JSON.stringify({
                    status
                })

        }
    );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message
            );

        }


        await loadStats();


    } catch (error) {

        alert(
            "Unable to update status."
        );

        console.error(error);

    }

}

/* =====================================
   VIEW ENQUIRY
===================================== */

function viewEnquiry(
    enquiryId
) {

    const enquiry =
        enquiries.find(
            item =>
                item.enquiry_id ===
                enquiryId
        );


    if (!enquiry) {
        return;
    }


    alert(
        `
Name: ${enquiry.full_name}

Company: ${enquiry.company_name || "-"}

Email: ${enquiry.email}

Phone: ${enquiry.phone}

Service: ${enquiry.service_required}

Status: ${enquiry.status}

Message:
${enquiry.message}
        `
    );

}


/* =====================================
   SEARCH & FILTER
===================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );

const serviceFilter =
    document.getElementById(
        "serviceFilter"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );


[
    searchInput,
    serviceFilter,
    statusFilter
]
.forEach(element => {

    element.addEventListener(
        "input",
        applyFilters
    );

    element.addEventListener(
        "change",
        applyFilters
    );

});


function applyFilters() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const service =
        serviceFilter.value;


    const status =
        statusFilter.value;


    const filtered =
        enquiries.filter(item => {

            const matchesSearch =

                !search ||

                item.full_name
                    .toLowerCase()
                    .includes(search) ||

                item.email
                    .toLowerCase()
                    .includes(search) ||

                item.phone
                    .toLowerCase()
                    .includes(search);


            const matchesService =

                !service ||

                item.service_required ===
                service;


            const matchesStatus =

                !status ||

                item.status ===
                status;


            return (
                matchesSearch &&
                matchesService &&
                matchesStatus
            );

        });


    renderTable(
        filtered
    );

}

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            localStorage.removeItem(
                "adminToken"
            );

            localStorage.removeItem(
                "adminUser"
            );


            window.location.href =
                "login.html";

        }
    );

}

function logoutAdmin() {

    localStorage.removeItem(
        "adminToken"
    );

    localStorage.removeItem(
        "adminUser"
    );

    window.location.href =
        "login.html";

}
