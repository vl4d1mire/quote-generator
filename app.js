const quoteGenerator = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuote = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

function showLoadingIcon() {
    loader.hidden = false
    quoteGenerator.hidden = true
}

function hideLoadingIcon() {
    loader.hidden = true
    quoteGenerator.hidden = false
}

async function getQuote() {
    showLoadingIcon()
    const proxyUrl = 'https://damp-temple-90805.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()

        if (data.quoteAuthor.length === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText
    } catch (e) {
        getQuote()
    }
    hideLoadingIcon()
}

function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(tweetUrl, '_blank')
}

newQuote.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuote()
