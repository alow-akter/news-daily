const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data.news_category)

}

const displayNews = newes => {
    const newsContainer = document.getElementById('news-container');
    newes.forEach(news => {
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
    <p>${news.category_name}</p>
    `
        newsContainer.appendChild(newsDiv)

    })

}
loadNews()