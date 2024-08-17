const apikey = "314eece9f9b24b86aad1442a07234c6f";
const bcon = document.getElementById("blogcon");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("sbtn");
const heroSection = document.getElementById("hero");

async function fetchNews(query = '') {
    try {
        const apiurl = query 
            ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&apiKey=${apikey}`
            : `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            updateHeroImage(data.articles[0]);  // Update the hero image with the first article
            displayNews(data.articles.slice(1));  // Display other news articles
        } else {
            displayNoImageMessage();
        }
    } catch (error) {
        console.log("Error fetching news:", error);
    }
}

function updateHeroImage(article) {
    if (article.urlToImage) {
        heroSection.innerHTML = `
            <img src="${article.urlToImage}" alt="Hero Image">
            <div class="hero-title">${article.title}</div>
            <div class="hero-description">${article.description || 'No description available.'}</div>
        `;
    } else {
        displayNoImageMessage();
    }
}

function displayNews(articles) {
    bcon.innerHTML = ""; // Clear any existing content
    articles.forEach(article => {
        if (article.urlToImage) {
            const newsCard = `
                <div class="news-card">
                    <img src="${article.urlToImage}" alt="News Image">
                    <div class="news-card-body">
                        <div class="news-card-title">${article.title}</div>
                        <div class="news-card-text">${article.description || 'No description available.'}</div>
                        <a href="${article.url}" class="btn" target="_blank">Read more</a>
                    </div>
                </div>
            `;
            bcon.insertAdjacentHTML('beforeend', newsCard);
        }
    });
}

// function displayNoImageMessage() {
//     heroSection.innerHTML = `
//         <div class="placeholder-content">
//             <h2>Welcome to My News Website</h2>
//             <p>I’m Pinak Tiwari, a Computer Science graduate and Full Stack Developer. Connect with me on 
//                 <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank">
//                     <i class="fab fa-linkedin"></i> LinkedIn
//                 </a>, 
//                 <a href="https://github.com/your-github-profile" target="_blank">
//                     <i class="fab fa-github"></i> GitHub
//                 </a>, and 
//                 <a href="mailto:your-email@gmail.com" target="_blank">
//                     <i class="fas fa-envelope"></i> Gmail
//                 </a>.
//                 Start searching to discover the latest news articles tailored just for you.
//             </p>
//         </div>
//     `;
// }

searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        fetchNews(query);
    }
});

fetchNews(); // Fetch initial news when the page loads


