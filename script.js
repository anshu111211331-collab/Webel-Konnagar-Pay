let courses = {};
const UPI_ID = "9831677534@ybl"; // replace with your UPI ID
const WHATSAPP_NUMBER = "917890650560"; // replace with your WhatsApp number

// Load courses from courses.json
fetch("courses.json")
    .then(res => res.json())
    .then(data => {
        courses = data;
        const courseSelect = document.getElementById("course");
        for (let course in courses) {
            let opt = document.createElement("option");
            opt.value = course;
            opt.textContent = course;
            courseSelect.appendChild(opt);
        }
    })
    .catch(err => console.error("Error loading courses.json:", err));

function showAmount() {
    const course = document.getElementById("course").value;
    if (course) {
        document.getElementById("course-info").style.display = "block";
        document.getElementById("amount").textContent = courses[course];

        // set UPI link
        const amount = courses[course];
        const upiUrl = `upi://pay?pa=${UPI_ID}&am=${amount}&cu=INR`;
        document.getElementById("payBtn").onclick = () => window.location.href = upiUrl;
    } else {
        document.getElementById("course-info").style.display = "none";
    }
}

function sendWhatsApp() {
    const course = document.getElementById("course").value;
    const amount = courses[course];
    const name = document.getElementById("fullName").value;
    const father = document.getElementById("fatherName").value;
    const txnId = document.getElementById("txnId").value;

    if (!course || !name || !father || !txnId) {
        alert("Please fill all details!");
        return;
    }

    const message = `Student Name: ${name}\nFather's Name: ${father}\nCourse: ${course}\nAmount: ₹${amount}\nTransaction ID: ${txnId}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
}
