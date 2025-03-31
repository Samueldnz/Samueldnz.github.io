document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector("#article-one-image-container img");
    const text = document.querySelector("#article-one-section-one");
    const container = document.querySelector("#article-one-container");
    
    container.style.opacity = "1";
    image.style.opacity = "1";
    image.style.transform = "translateX(0)";
    
    
    setTimeout(() => {
        text.style.opacity = "1";
        text.style.transform = "translateX(0)";
    }, 900);
});


const reviews = [
    {
        source: "Yelp",
        author: "YULIYA K",
        rating: "★★★★★",
        text: "Amazing!!! I'm crazy about this place. Came from north Florida on a girls' trip and found this goodness. Wow, the pastries are beyond gorgeous! Please come to north Florida, heck even Orlando, I'll drive lol. Will be coming back here again for sure, everything was divine! Hats off to the chef!"
    },
    {
        source: "Google",
        author: "JOHN D",
        rating: "★★★★☆",
        text: "Great place with delicious pastries. The atmosphere is cozy, and the staff is very friendly. I would have given 5 stars if the coffee was a bit better."
    },
    {
        source: "TripAdvisor",
        author: "EMILY R",
        rating: "★★★★★",
        text: "I love this bakery! The best croissants I have ever had. If you're in the area, this is a must-visit spot."
    },
    {
        source: "Facebook",
        author: "MARCUS L",
        rating: "★★★★☆",
        text: "The desserts here are top-notch, but I found the prices a little high. Still, it's worth it for a special treat."
    },
    {
        source: "Yelp",
        author: "SOPHIA M",
        rating: "★★★★★",
        text: "Absolutely delightful! The pastries melt in your mouth, and the service is impeccable. Highly recommend!"
    }
];

let currentIndex = 0;

const sourceEl = document.querySelector(".review-source");
const authorEl = document.querySelector(".review-author");
const starsEl = document.querySelector(".stars");
const textEl = document.querySelector("blockquote");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function updateReview(index) {
    const review = reviews[index];
    sourceEl.textContent = `Review by - ${review.source}`;
    authorEl.innerHTML = `${review.author}: <span class="stars">${review.rating}</span>`;
    textEl.innerHTML = `<span class="quote-mark">&#10077;</span> ${review.text} <span class="quote-mark">&#10078;</span>`;
    
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    updateReview(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % reviews.length;
    updateReview(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateReview(currentIndex);
    });
});

updateReview(currentIndex);


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

