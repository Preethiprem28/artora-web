// ======================================================
// ARTORA - COMPLETE SCRIPT.JS
// ======================================================


// ======================================================
// 1. CART - LOCAL STORAGE
// ======================================================

// Get cart from Local Storage
function getCart() {

    const savedCart =
        localStorage.getItem("artoraCart");

    if (!savedCart) {
        return [];
    }

    return JSON.parse(savedCart);
}


// Add product to cart
function addToCart(button) {

    const productCard =
        button.closest(".product");

    if (!productCard) {
        return;
    }


    // Get product name
    const nameElement =
        productCard.querySelector("h3");

    if (!nameElement) {
        return;
    }

    const productName =
        nameElement.textContent.trim();


    // Get product price
    const priceElement =
        productCard.querySelector("h4");

    let price = 0;

    if (priceElement) {

        const priceText =
            priceElement.textContent
                .replace("₹", "")
                .replace(/,/g, "")
                .trim();

        price = Number(priceText);
    }


    // Get artist name
    const artistElement =
        productCard.querySelector(".artist");

    let artist = "";

    if (artistElement) {

        artist =
            artistElement.textContent
                .replace("by", "")
                .trim();
    }


    // Get product image
    const imageElement =
        productCard.querySelector(".product-image");

    let image = "";

    if (imageElement) {

        const backgroundImage =
            imageElement.style.backgroundImage;

        if (backgroundImage) {

            image =
                backgroundImage
                    .replace(/^url\(["']?/, "")
                    .replace(/["']?\)$/, "");
        }


        // If product has an img tag
        const imgElement =
            imageElement.querySelector("img");

        if (imgElement && imgElement.src) {

            image =
                imgElement.getAttribute("src");

        }
    }


    // Get existing cart
    let cart = getCart();


    // Check if product already exists
    const existingProduct =
        cart.find(function(item) {

            return item.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,

            price: price,

            artist: artist,

            image: image,

            quantity: 1

        });

    }


    // Save cart
    localStorage.setItem(
        "artoraCart",
        JSON.stringify(cart)
    );


    // Update cart count
    updateCartCount();


    alert(
        productName +
        " added to cart!"
    );
}


// Update cart count
function updateCartCount() {

    const cart =
        getCart();

    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

    });


    const cartCounter =
        document.getElementById(
            "cartCount"
        );


    if (cartCounter) {

        cartCounter.textContent =
            totalItems;

    }

}


// Open cart
function viewCart() {

    window.location.href =
        "cart.html";

}


// Update cart count when page loads
updateCartCount();




// ======================================================
// 2. DISPLAY CART
// ======================================================

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    // Only run on cart page
    if (!cartItems) {
        return;
    }


    const cart =
        getCart();


    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some beautiful
                    products from ARTORA.
                </p>

                <a href="index.html"
                   class="btn">

                    Continue Shopping

                </a>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                "0";

        }

        return;
    }


    let total = 0;


    // Display products
    cart.forEach(function(item, index) {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement(
                "div"
            );


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div
                class="cart-product-image"
                style="background-image: url('${item.image}')">
            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.artist}
                </p>

                <p>
                    Price:
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

            </div>


            <div class="cart-quantity">

                <button
                    onclick="decreaseQuantity(${index})">

                    -

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>


                <button
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    // Display total
    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("en-IN");

    }

}




// ======================================================
// 3. INCREASE QUANTITY
// ======================================================

function increaseQuantity(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    localStorage.setItem(
        "artoraCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}




// ======================================================
// 4. DECREASE QUANTITY
// ======================================================

function decreaseQuantity(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "artoraCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}




// ======================================================
// 5. REMOVE PRODUCT
// ======================================================

function removeFromCart(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    localStorage.setItem(
        "artoraCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}




// ======================================================
// 6. CLEAR CART
// ======================================================

function clearCart() {

    localStorage.removeItem(
        "artoraCart"
    );


    displayCart();

    updateCartCount();

}




// ======================================================
// 7. SEARCH PRODUCTS
// ======================================================

function searchProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(function(product) {

        const productText =
            product.textContent
                .toLowerCase();


        if (
            productText.includes(
                searchText
            )
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}




// ======================================================
// 8. FILTER PRODUCTS
// ======================================================

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(function(product) {

        const productCategory =
            product.getAttribute(
                "data-category"
            );


        if (
            category.toLowerCase() ===
            "all" ||
            productCategory === category
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}




// ======================================================
// 9. WISHLIST
// ======================================================

function addWishlist(button) {

    if (
        button.textContent.trim() ===
        "♡"
    ) {

        button.textContent =
            "♥";

    } else {

        button.textContent =
            "♡";

    }

}




// ======================================================
// 10. REGISTRATION
// ======================================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value
                    .trim();


            const message =
                document.getElementById(
                    "registerMessage"
                );


            // Validate fields
            if (
                !name ||
                !email ||
                !password
            ) {

                message.textContent =
                    "Please fill all fields.";

                return;

            }


            // Validate email
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                message.textContent =
                    "Please enter a valid email.";

                return;

            }


            // Validate password
            if (password.length < 6) {

                message.textContent =
                    "Password must be at least 6 characters.";

                return;

            }


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/auth/register",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name:
                                    name,

                                email:
                                    email,

                                password:
                                    password

                            })

                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    message.textContent =
                        data.message ||
                        "Registration successful!";


                    registerForm.reset();


                    setTimeout(
                        function() {

                            window.location.href =
                                "login.html";

                        },
                        1500
                    );


                } else {

                    message.textContent =
                        data.message ||
                        "Registration failed.";

                }


            } catch (error) {

                console.log(
                    "Registration error:",
                    error
                );


                message.textContent =
                    "Unable to connect to the server.";

            }

        }
    );

}





// ======================================================
// 11. LOGIN
// ======================================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value
                    .trim();

            const message =
                document.getElementById(
                    "loginMessage"
                );

            // Check empty fields
            if (!email || !password) {

                message.textContent =
                    "Please enter email and password.";

                return;
            }

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );

                const data =
                    await response.json();

                if (response.ok) {

                    // Save logged-in user
                    localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(data.user)
                    );

                    message.textContent =
                        "Login successful!";

                    // Go to home page
                    setTimeout(
                        function() {

                            window.location.href =
                                "index.html";

                        },
                        1000
                    );

                } else {

                    message.textContent =
                        data.message ||
                        "Invalid email or password.";

                }

            } catch (error) {

                console.log(
                    "Login error:",
                    error
                );

                message.textContent =
                    "Unable to connect to the server.";

            }

        }
    );
}

// ======================================================
// 12. SHOW LOGGED-IN USER
// ======================================================

function showLoggedInUser() {

    const savedUser =
        localStorage.getItem(
            "loggedInUser"
        );


    // User is not logged in
    if (!savedUser) {

        return;

    }


    const user =
        JSON.parse(savedUser);


    const userWelcome =
        document.getElementById(
            "userWelcome"
        );


    const loginLink =
        document.getElementById(
            "loginLink"
        );


    // Display user's name
    if (userWelcome) {

        userWelcome.textContent =
            "Welcome, " +
            user.name +
            " 👋";

    }


    // Change Login to Logout
    if (loginLink) {

        loginLink.textContent =
            "Logout";


        loginLink.href =
            "#";


        loginLink.onclick =
            function(event) {

                event.preventDefault();

                logout();

            };

    }

}


// Run user display
showLoggedInUser();




// ======================================================
// 13. LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "login.html";

}




// ======================================================
// 14. SELLER / PRODUCT FORM
// ======================================================

const productForm =
    document.getElementById(
        "productForm"
    );


if (productForm) {

    productForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const productName =
                document
                    .getElementById(
                        "productName"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "category"
                    )
                    .value;


            const price =
                document
                    .getElementById(
                        "price"
                    )
                    .value;


            const sellerName =
                document
                    .getElementById(
                        "sellerName"
                    )
                    .value
                    .trim();


            const image =
                document
                    .getElementById(
                        "image"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "description"
                    )
                    .value
                    .trim();


            const productMessage =
                document.getElementById(
                    "productMessage"
                );


            // Validate fields
            if (
                !productName ||
                !category ||
                !price ||
                !sellerName ||
                !image ||
                !description
            ) {

                productMessage.textContent =
                    "Please fill all fields.";

                return;

            }


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/products",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                productName:
                                    productName,

                                category:
                                    category,

                                price:
                                    price,

                                sellerName:
                                    sellerName,

                                image:
                                    image,

                                description:
                                    description

                            })

                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    productMessage.textContent =
                        "Product added successfully!";


                    productForm.reset();


                    console.log(
                        "Product added:",
                        data.product
                    );


                } else {

                    productMessage.textContent =
                        data.message ||
                        "Unable to add product.";

                }


            } catch (error) {

                console.log(
                    "Product error:",
                    error
                );


                productMessage.textContent =
                    "Unable to connect to the server.";

            }

        }
    );

}




// ======================================================
// 15. LOAD PRODUCTS FROM MONGODB
// ======================================================

async function loadProductsFromDatabase() {

    const productContainer =
        document.getElementById(
            "productContainer"
        );


    // Stop if product container
    // doesn't exist on this page

    if (!productContainer) {

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/products"
            );


        const data =
            await response.json();


        if (!response.ok) {

            return;

        }


        data.products.forEach(
            function(product) {


                const productCard =
                    document.createElement(
                        "div"
                    );


                productCard.className =
                    "product";


                productCard.setAttribute(
                    "data-category",
                    product.category
                );


                productCard.innerHTML = `

                    <div class="product-image">

                        <button
                            class="wishlist"
                            onclick="addWishlist(this)">

                            ♡

                        </button>


                        <img
                            src="images/${product.image}"
                            alt="${product.productName}">

                    </div>


                    <h3>
                        ${product.productName}
                    </h3>


                    <p class="artist">
                        by ${product.sellerName}
                    </p>


                    <h4>
                        ₹${product.price}
                    </h4>


                    <p>
                        ${product.description}
                    </p>


                    <button
                        onclick="addToCart(this)">

                        Add to Cart

                    </button>

                `;


                productContainer.appendChild(
                    productCard
                );

            }
        );


    } catch (error) {

        console.log(
            "Unable to load products:",
            error
        );

    }

}


// Load products once
loadProductsFromDatabase();




// ======================================================
// 16. HARD-CODED PRODUCT IMAGES
// ======================================================

const productImages = [

    "painting1.jpg",
    "painting2.jpg",
    "painting3.jpg",
    "painting4.jpg",

    "pottery1.jpg",
    "pottery2.jpg",
    "pottery3.jpg",
    "pottery4.jpg",

    "jewelry1.jpg",
    "jewelry2.jpg",
    "jewelry3.jpg",
    "jewelry4.jpg",

    "crafts1.jpg",
    "crafts2.jpg",
    "crafts3.jpg",
    "crafts4.jpg"

];


const existingProductImages =
    document.querySelectorAll(
        "#productContainer .product-image"
    );


existingProductImages.forEach(
    function(imageBox, index) {

        if (productImages[index]) {

            imageBox.style.backgroundImage =
                `url("images/${productImages[index]}")`;


            imageBox.style.backgroundSize =
                "cover";


            imageBox.style.backgroundPosition =
                "center";


            imageBox.style.backgroundRepeat =
                "no-repeat";


            const wishlist =
                imageBox.querySelector(
                    ".wishlist"
                );


            // Remove existing content
            imageBox.innerHTML = "";


            // Add wishlist button again
            if (wishlist) {

                imageBox.appendChild(
                    wishlist
                );

            }

        }

    }
);
function startSelling() {

    window.location.href =
        "seller.html";

}