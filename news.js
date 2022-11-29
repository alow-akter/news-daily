

/* categoryLoader API Function Declaration */
const categoryLoader = () => {
  const urlLink = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(urlLink)
    .then(res => res.json())
    .then(data => usersDisplayCetegory(data.data.news_category))
    .catch(error => console.log(error))
}

/* usersDisplayCetegory Display Code */
const usersDisplayCetegory = (data) => {
  const categoryParent = document.getElementById('parent')
  data.forEach(element => {
    const liCreate = document.createElement('li');
    liCreate.classList.add('nav-item', 'mx-4', 'fs-5')
    liCreate.innerHTML = `
          <a onclick="catIdCatch('${element.category_id}')" class="nav-link actionClick" href="#">${element.category_name.slice(0, 13)}</a>
      `
    categoryParent.appendChild(liCreate)
  });
}
/* category function call */
categoryLoader()

/* category api search with id */
const catIdCatch = async idSearch => {
  loadingSpinner(true)
  const urlLink = `https://openapi.programming-hero.com/api/news/category/${idSearch}`;
  const res = await fetch(urlLink);
  const data = await res.json();
  mainNewsPaper(data.data)
}

/* main news paper display function Declaration */
const mainNewsPaper = news => {
  const mainNewsPaperId = document.getElementById('mainNewspaper')
  mainNewsPaperId.textContent = ''


  /* Items Found Result Code */
  const newsFound = Object.keys(news);
  const newsLength = newsFound.length;
  const resultFoundId = document.getElementById('resultFound')
  resultFoundId.innerText = newsLength;

  /*   view Number Sorted code */
  news = news.sort((firstNum, secondNum) => {
    if (firstNum.total_view < secondNum.total_view) {
      return 1;
    }
    else {
      return -1;
    }
  })

  /*     category related all news code */
  for (const element of news) {
    const createDiv = document.createElement('div');
    createDiv.classList.add('col');

    createDiv.innerHTML = `
      <div class="card mb-5 border-0 shadow-lg rounded-lg p-5 ">
          <div class="row g-0">
              <div class="col-md-4 extraSize">
                  <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
              </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h5 class="card-title fs-4 mb-3 fw-bold">${element.title.slice(0, 55)}</h5>
                  <p class="card-text">${element.details.slice(0, 190)}</p>
                  <p class="card-text mt-4 d-none d-lg-block">${element.details.slice(190, 300)}</p>
              </div>
              <div class="d-flex flex-column flex-lg-row justify-content-start justify-content-lg-around align-items-center">
                  <div class="authorInfo d-flex d-none d-lg-flex d-lg-block">
                  <div>
                      <img src="${element.author.img}" class="imgCircle" alt="...">
              </div>

              <div class="authorDetails ms-3  d-none d-lg-block">
                  <h3 class="fs-6">${element.author.name ? element.author.name : 'No Data Found'}</h3>
                  <p>${element.published_date ? element.published_date : "No Data Found"}</p>
              </div>
              </div>

              <div class="viewArea d-flex align-items-center d-none d-lg-flex d-lg-block">
              <div>
              <img mo src="https://www.freeiconspng.com/thumbs/eye-icon/eyeball-icon-png-eye-icon-1.png" class="imgCircle" alt="...">
              </div>

              <div>
              <h3 class="fs-6 mx-2 fw-bold mt-2">${element.total_view ? element.total_view : 'No Data Found'}</h3>
              
              </div>
              </div>

              <div class="ratingArea  d-none d-lg-block">
              <i class="fa-solid fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              </div>

              <div class='btnArea'>
              <button onclick="modalDisplay('${element._id}')" class="btn btn-primary py-2 px-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">More Details</button>
              </div>
          </div>
      </div>
  </div>
</div>
      `
    mainNewsPaperId.appendChild(createDiv)
  }
  loadingSpinner(false);
}

/* loading Spinner code function */
const loadingSpinner = (isLoading) => {
  const loadSectionId = document.getElementById('loadingSpinner')
  if (isLoading) {
    loadSectionId.classList.remove('d-none');
  }
  else {
    loadSectionId.classList.add('d-none')
  }
}

/* category items search with category id for modal */
const modalDisplay = categoryId => {
  const urlLink = `https://openapi.programming-hero.com/api/news/${categoryId}`
  fetch(urlLink)
    .then(res => res.json())
    .then(data => modalFunction(data.data))
}

/* Modal Output Function */
const modalFunction = (data) => {
  console.log(data)

  const titleTarget = document.getElementById('staticBackdropLabel');
  titleTarget.innerText = data[0].title

  var image = document.getElementById("image");
  image.src = data[0].image_url

  const describeOne = document.getElementById('describe1')
  describeOne.innerText = data[0].details

}

