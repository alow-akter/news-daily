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
        <button class="px-3 py-2 rounded fw-semibold btn btn-outline-info" onclick="loadEategory () ">${news.category_name}</button>
    
    `
    newsContainer.appendChild(newsDiv)

  })

}
loadNews()

const loadEategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data)
}
const displayCategory = categoryes => {
  const categoryContainer = document.getElementById('cetagory-container')
  categoryes.forEach(ceatagory => {

    const ceatagoryDiv = document.createElement('div')
    console.log(ceatagory)
    ceatagoryDiv.classList.add('col')
    ceatagoryDiv.innerHTML = `
    <div class="card h-100">
    <img src="${ceatagory.thumbnail_url}" class="card-img-top img-fuiled" alt="...">
    <div class="card-body px-3">
        <h5 class="card-title">${ceatagory.title}</h5>
        <p id="details" class="card-text 
       ">${ceatagory.details}</p>
            <div class="d-flex">
            <img class="w-25 rounded-4" src="${ceatagory.image_url}">
            <h5 class="m-5">${ceatagory.author.name}</h5><div>
            
    </div>
    <p class=" m-5 fw-bolder">${ceatagory.total_view} M</p>
            
    `
    categoryContainer.appendChild(ceatagoryDiv)

  })

}


loadEategory()
