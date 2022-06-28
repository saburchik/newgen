import courses from './data.js'

displayLinks(courses)

const price = document.getElementById('price') as HTMLDivElement
const inputMin = document.getElementById('inputMin')! as HTMLInputElement
const inputMax = document.getElementById('inputMax')! as HTMLInputElement
const ul = document.querySelector('.ul') as HTMLUListElement

price.addEventListener('change', () => {
  let min: number = Number(inputMin.value)
  let max: number = Number(inputMax.value)
  let sorting = courses.filter((item: object) => {
    ul.innerHTML = ''
    if (min == 0 && max === 0) return displayLinks(courses)
    if (item.prices[0] === null && item.prices[1] === null) return null
    if (item.prices[0] === max || (max > 0 && item.prices[0] > max)) return null
    return item.prices[0] >= min && item.prices[1] <= max
  })
  displayLinks(sorting)
})

function displayLinks(array: object) {
  for (let key in array) {
    let row = document.createElement('li') as HTMLLIElement
    let title: string = array[key].name
    let valueMin: number = array[key].prices[0]
    let valueMax: number = array[key].prices[1]

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
    ul.appendChild(row)
  }
}
