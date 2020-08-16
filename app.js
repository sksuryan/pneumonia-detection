const imgInput = document.querySelector('#upload-form')
const label = document.querySelector('.file-name')
const submitButton = document.querySelector('#submit')
const results = document.querySelector('#results')
const inputDiv = document.querySelector('.file')

async function submit(e,img) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', img)

    const options = {
        method: 'post',
        body: formData
    }

    submitButton.classList.add('is-loading')
    results.innerHTML = `Please wait while we get the results. \n Thanks for your patience.😇`

    fetch('https://flask-pneumonia.herokuapp.com/api', options)
        .then(data => data.json())
        .then(data => {
            submitButton.classList.remove('is-loading')
            results.innerHTML = `Results: ${data.reply}`
        })
        .catch(e => {
            console.log(e)
            submitButton.classList.remove('is-loading')
            results.innerHTML = 'Please upload an image 😨'
        })

    label.innerHTML = 'example.jpeg'
    imgInput.value = '' 
}

function updateFileName(){
    var name = imgInput.files[0].name
    label.innerHTML = name
}

function widthChange(){
    const width = window.innerWidth

    if(width > 600){
        submitButton.classList.remove('is-small')
        inputDiv.classList.remove('is-small')
    } else {
        submitButton.classList.add('is-small')
        inputDiv.classList.add('is-small')
    }
}

submitButton.addEventListener('click',(e) => submit(e,imgInput.files[0]))

window.addEventListener('resize',widthChange)

widthChange()