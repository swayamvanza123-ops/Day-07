/* ==========================================
   LOCAL STORAGE
========================================== */

const STORAGE_KEY = "products";


/* ==========================================
   SAMPLE PRODUCTS
========================================== */

const sampleProducts = [

    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 50000,
        stock: 20
    },

    {
        id: 2,
        name: "Mouse",
        category: "Accessories",
        price: 800,
        stock: 50
    },

    {
        id: 3,
        name: "Keyboard",
        category: "Accessories",
        price: 1500,
        stock: 35
    },

    {
        id: 4,
        name: "Monitor",
        category: "Electronics",
        price: 12000,
        stock: 5
    },

    {
        id: 5,
        name: "Printer",
        category: "Electronics",
        price: 15000,
        stock: 5
    }

];


/* ==========================================
   LOAD PRODUCTS
========================================== */

let savedProducts =
    localStorage.getItem(STORAGE_KEY);


let products;


if (savedProducts) {

    /*
        LocalStorage
             ↓
        JSON.parse()
             ↓
        Products Array
    */

    products =
        JSON.parse(savedProducts);

} else {

    /*
        LocalStorage is empty.
        Add sample products.
    */

    products =
        sampleProducts;

    saveProducts();
}


/* ==========================================
   SAVE PRODUCTS
========================================== */

function saveProducts() {

    /*
        Products Array
             ↓
        JSON.stringify()
             ↓
        LocalStorage
    */

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );
}


/* ==========================================
   HTML ELEMENTS
========================================== */

const productForm =
    document.getElementById("productForm");

const productTable =
    document.getElementById("productTable");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");


const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

const clearFilters =
    document.getElementById("clearFilters");


/* Dashboard */

const totalProducts =
    document.getElementById("totalProducts");

const totalStock =
    document.getElementById("totalStock");

const lowStock =
    document.getElementById("lowStock");

const inventoryValue =
    document.getElementById("inventoryValue");


/* Category */

const electronicsCount =
    document.getElementById(
        "electronicsCount"
    );

const accessoriesCount =
    document.getElementById(
        "accessoriesCount"
    );


/* Modal */

const editModal =
    document.getElementById("editModal");

const closeModal =
    document.getElementById("closeModal");

const editForm =
    document.getElementById("editForm");

const editId =
    document.getElementById("editId");

const editName =
    document.getElementById("editName");

const editCategory =
    document.getElementById("editCategory");

const editPrice =
    document.getElementById("editPrice");

const editStock =
    document.getElementById("editStock");


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts(
    list = products
) {

    productTable.innerHTML = "";


    if (list.length === 0) {

        productTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="empty"
                >
                    No products found
                </td>

            </tr>

        `;

        updateDashboard();

        return;
    }


    list.forEach(product => {

        const status =
            Number(product.stock) < 10
                ? "Low Stock"
                : "Available";


        const statusClass =
            Number(product.stock) < 10
                ? "low-stock"
                : "available";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${product.name}
                </strong>
            </td>


            <td>
                ${product.category}
            </td>


            <td>
                ₹${Number(
                    product.price
                ).toLocaleString("en-IN")}
            </td>


            <td>
                ${product.stock}
            </td>


            <td>

                <span
                    class="status ${statusClass}"
                >
                    ${status}
                </span>

            </td>


            <td>

                <button
                    class="edit-btn"
                    onclick="editProduct(${product.id})"
                >
                    ✏️ Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
                    🗑️ Delete
                </button>

            </td>

        `;


        productTable.appendChild(row);

    });


    updateDashboard();

}


/* ==========================================
   UPDATE DASHBOARD
========================================== */

function updateDashboard() {

    totalProducts.textContent =
        products.length;


    const stock =
        products.reduce(
            (total, product) => {

                return total +
                    Number(product.stock);

            },
            0
        );


    totalStock.textContent =
        stock;


    const low =
        products.filter(
            product =>
                Number(product.stock) < 10
        ).length;


    lowStock.textContent =
        low;


    const value =
        products.reduce(
            (total, product) => {

                return total +
                    Number(product.price) *
                    Number(product.stock);

            },
            0
        );


    inventoryValue.textContent =
        "₹" +
        value.toLocaleString("en-IN");


    updateCategoryCounts();
}


/* ==========================================
   CATEGORY COUNTS
========================================== */

function updateCategoryCounts() {

    const electronics =
        products.filter(
            product =>
                product.category ===
                "Electronics"
        ).length;


    const accessories =
        products.filter(
            product =>
                product.category ===
                "Accessories"
        ).length;


    electronicsCount.textContent =
        electronics + " Products";


    accessoriesCount.textContent =
        accessories + " Products";
}


/* ==========================================
   ADD PRODUCT
========================================== */

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            productName.value.trim();

        const category =
            productCategory.value;

        const price =
            Number(productPrice.value);

        const stock =
            Number(productStock.value);


        /* Validation */

        if (
            name === "" ||
            category === "" ||
            price < 0 ||
            stock < 0
        ) {

            alert(
                "Please enter valid product details."
            );

            return;
        }


        /* New product */

        const newProduct = {

            id: Date.now(),

            name: name,

            category: category,

            price: price,

            stock: stock

        };


        /* Add to Array */

        products.push(
            newProduct
        );


        /* Save */

        saveProducts();


        /* Update table */

        displayProducts();


        /* Reset */

        productForm.reset();


        alert(
            "Product added successfully!"
        );

    }
);


/* ==========================================
   EDIT PRODUCT
========================================== */

function editProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;
    }


    editId.value =
        product.id;

    editName.value =
        product.name;

    editCategory.value =
        product.category;

    editPrice.value =
        product.price;

    editStock.value =
        product.stock;


    editModal.style.display =
        "flex";
}


/* ==========================================
   UPDATE PRODUCT
========================================== */

editForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            Number(editId.value);


        const product =
            products.find(
                item =>
                    item.id === id
            );


        if (!product) {

            return;
        }


        /* Update Array */

        product.name =
            editName.value.trim();

        product.category =
            editCategory.value;

        product.price =
            Number(editPrice.value);

        product.stock =
            Number(editStock.value);


        /* Update LocalStorage */

        saveProducts();


        /* Update Table */

        displayProducts();


        /* Close */

        editModal.style.display =
            "none";


        alert(
            "Product updated successfully!"
        );

    }
);


/* ==========================================
   DELETE PRODUCT
========================================== */

function deleteProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete ${product.name}?`
        );


    if (!confirmDelete) {

        return;
    }


    /*
        Remove product
        from Array
    */

    products =
        products.filter(
            item =>
                item.id !== id
        );


    /*
        Save updated Array
        to LocalStorage
    */

    saveProducts();


    /*
        Update table
    */

    displayProducts();


    alert(
        "Product deleted successfully!"
    );
}


/* ==========================================
   SEARCH + FILTER
========================================== */

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filter =
        filterStatus.value;


    let filteredProducts =
        products.filter(product => {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            let matchesStatus =
                true;


            if (
                filter ===
                "available"
            ) {

                matchesStatus =
                    Number(product.stock)
                    >= 10;
            }


            if (
                filter ===
                "low"
            ) {

                matchesStatus =
                    Number(product.stock)
                    < 10;
            }


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayProducts(
        filteredProducts
    );
}


/* Search */

searchInput.addEventListener(
    "input",
    applyFilters
);


/* Status Filter */

filterStatus.addEventListener(
    "change",
    applyFilters
);


/* ==========================================
   CLEAR FILTERS
========================================== */

clearFilters.addEventListener(
    "click",
    function() {

        searchInput.value =
            "";

        filterStatus.value =
            "all";

        displayProducts();

    }
);


/* ==========================================
   CATEGORY CLICK
========================================== */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        function() {

            const category =
                this.dataset.category;


            /*
                Get products
                of selected category
            */

            const filteredProducts =
                products.filter(
                    product =>
                        product.category ===
                        category
                );


            /*
                Show category products
            */

            displayProducts(
                filteredProducts
            );


            /*
                Clear search/filter
            */

            searchInput.value =
                "";

            filterStatus.value =
                "all";


            /*
                Scroll to Products
            */

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* ==========================================
   CLOSE EDIT MODAL
========================================== */

closeModal.addEventListener(
    "click",
    function() {

        editModal.style.display =
            "none";

    }
);


/* Close modal outside */

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            editModal
        ) {

            editModal.style.display =
                "none";
        }

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

displayProducts();

updateCategoryCounts();