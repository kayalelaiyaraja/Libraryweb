
// Book Collection
const books = [
    {
        id: 1,
        title: "Introduction to C",
        author: "Programming Basics",
        category: "Technology",
        emoji: "💻",
        color: "#EDE9FE",
        description: "Learn the fundamentals of C programming."
    },
    {
        id: 2,
        title: "JavaScript Basics",
        author: "Web Development",
        category: "Technology",
        emoji: "🌐",
        color: "#FEF3C7",
        description: "Explore JavaScript and interactive websites."
    },
    {
        id: 3,
        title: "The Universe",
        author: "Science Collection",
        category: "Science",
        emoji: "🔭",
        color: "#DBEAFE",
        description: "Discover space, planets and galaxies."
    },
    {
        id: 4,
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        category: "Fiction",
        emoji: "🌹",
        color: "#FCE7F3",
        description: "A classic imaginative story."
    },
    {
        id: 5,
        title: "Learning Mathematics",
        author: "Education Series",
        category: "Education",
        emoji: "📐",
        color: "#D1FAE5",
        description: "Explore mathematical concepts."
    },
    {
        id: 6,
        title: "Python Programming",
        author: "Coding Series",
        category: "Technology",
        emoji: "🐍",
        color: "#FDE2E4",
        description: "Start learning Python programming."
    }
];

// Favourite Books
let favourites = JSON.parse(
    localStorage.getItem("favourites") || "[]"
);

let selectedCategory = "All";

// Display Books
function displayBooks(bookList, elementId) {
    const container = document.getElementById(elementId);

    if (bookList.length === 0) {
        container.innerHTML =
            '<p class="empty-message">No books found. 🌸</p>';
        return;
    }

    container.innerHTML = bookList.map(book => `
        <div class="book-card">

            <div class="book-cover"
                 style="background:${book.color}">
                ${book.emoji}
            </div>

            <h3>${book.title}</h3>

            <p>Author: ${book.author}</p>

            <p>Category: ${book.category}</p>

            <p>${book.description}</p>

            <div class="book-actions">

                <a href="https://openlibrary.org/search?q=${encodeURIComponent(book.title)}"
                   target="_blank"
                   rel="noopener noreferrer">
                   Find Book
                </a>

                <button onclick="toggleFavourite(${book.id})">
                    ${favourites.includes(book.id)
                        ? "💗 Saved"
                        : "♡ Favourite"}
                </button>

            </div>
        </div>
    `).join("");
}

// Show Library
function showLibrary() {
    const search = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks, "bookGrid");

    const favouriteBooks = books.filter(book =>
        favourites.includes(book.id)
    );

    displayBooks(favouriteBooks, "favouriteGrid");
}

// Add or Remove Favourite
function toggleFavourite(id) {

    if (favourites.includes(id)) {
        favourites = favourites.filter(
            bookId => bookId !== id
        );
    } else {
        favourites.push(id);
    }

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    showLibrary();
}

// Search Event
document.getElementById("searchInput")
    .addEventListener("input", showLibrary);

// Category Buttons
document.querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelector(".category.active")
                .classList.remove("active");

            button.classList.add("active");

            selectedCategory = button.dataset.category;

            showLibrary();
        });
    });

// Initial Display
showLibrary();
