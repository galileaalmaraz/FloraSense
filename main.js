document.getElementById("flower-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const flowerData = {
        sepal_length: document.getElementById("sepal_length").value,
        sepal_width: document.getElementById("sepal_width").value,
        petal_length: document.getElementById("petal_length").value,
        petal_width: document.getElementById("petal_width").value,
        flower_type: document.getElementById("flower_type").value,
    };

    fetch("http://localhost:3005/add_flower", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(flowerData),
    })
        .then((response) => {
            console.log("Server response status:", response.status);
            return response.json();
        })
        .then((result) => {
            console.log("Server response result:", result); // Log the response from the server
            if (result.message === "Flower data added successfully!") {
                alert("Flower data added successfully!");
                fetchFlowers(); // Refresh the flower database display
            } else {
                alert("An error occurred: " + result.message);
            }
        })
        .catch((error) => {
            console.error("Error occurred during fetch:", error);
            alert("An error occurred while adding the flower. Please try again.");
        });
});

document.getElementById("category-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const flowerCategory = document.getElementById("flower_category").value;

    fetch("http://localhost:3005/add_category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ flower_type: flowerCategory }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add category");
            }
            return response.json();
        })
        .then((result) => {
            alert(result.message);
            document.getElementById("flower_category").value = ""; // Clear input
            fetchCategories(); // Update the dropdown with the new category
        })
        .catch((error) => {
            console.error("Error adding category:", error);
            alert("An error occurred while adding the category. Please try again.");
        });
});

function fetchFlowers() {
    fetch("http://localhost:3005/get_flowers")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch flowers");
            }
            return response.json();
        })
        .then((data) => {
            const databaseDiv = document.getElementById("flower-database");
            databaseDiv.innerHTML = "";

            data.forEach((flower) => {
                const flowerCard = document.createElement("div");
                flowerCard.className = "flower-card";

                flowerCard.innerHTML = `
                    <h4>${flower.flower_type}</h4>
                    <p>Sepal Length: ${flower.sepal_length} cm</p>
                    <p>Sepal Width: ${flower.sepal_width} cm</p>
                    <p>Petal Length: ${flower.petal_length} cm</p>
                    <p>Petal Width: ${flower.petal_width} cm</p>
                `;
                databaseDiv.appendChild(flowerCard);
            });
        })
        .catch((error) => console.error("Error fetching flower data:", error));
}

function fetchCategories() {
    fetch("http://localhost:3005/get_categories")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            return response.json();
        })
        .then((categories) => {
            const dropdown = document.getElementById("flower_type");
            dropdown.innerHTML = '<option value="">Select Flower Type</option>'; // Reset dropdown

            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.flower_type;
                option.textContent = category.flower_type;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching categories:", error));
}

// Fetch flowers and categories on page load
window.onload = () => {
    fetchFlowers();    // Fetch flowers and populate database
    fetchCategories(); // Fetch categories and populate dropdown
};
