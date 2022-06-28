import courses from './data.js'

displayLinks(courses)
const price = document.querySelector('#price')

price.addEventListener('change', () => {
  let min = Number(document.querySelector('#inputMin').value)
  let max = Number(document.querySelector('#inputMax').value)
  console.log(min, max)
  let sorting = courses.filter((item) => {
    document.querySelector('.ul').innerHTML = ''
    if (min == 0 && max === 0) return displayLinks(courses)
    if (item.prices[0] === null && item.prices[1] === null) return null
    if (item.prices[0] === max || (max > 0 && item.prices[0] > max)) return null
    return item.prices[0] >= min && item.prices[1] <= max
  })
  displayLinks(sorting)
})

function displayLinks(array) {
  for (let key in array) {
    let row = document.createElement('li')
    let title = array[key].name
    let valueMin = array[key].prices[0]
    let valueMax = array[key].prices[1]

    if (valueMin === null) {
      row.innerHTML = `<a class="link" href="/">${title} | to ${valueMax}$</a>`
    }
    if (valueMax === null) {
      row.innerHTML = `<a class="link" href="/">${title} | from ${valueMin}$</a>`
    }
    if (valueMin !== null && valueMax !== null) {
      row.innerHTML = `<a class="link" href="/">${title} | from ${valueMin}$ to ${valueMax}$</a>`
    }
    if (valueMin === null && valueMax === null) {
      row.innerHTML = `<a style="pointer-events: none; color: #9f9f9f;" href="/">
        <del>${title}</del> | information is missing
      </a>`
    }
    document.querySelector('.ul').appendChild(row)
  }
}
