const courses: TCourse = [
  { name: 'Courses in England', prices: [0, 100] },
  { name: 'Courses in Germany', prices: [500, null] },
  { name: 'Courses in Italy', prices: [100, 200] },
  { name: 'Courses in Russia', prices: [null, 400] },
  { name: 'Courses in China', prices: [50, 250] },
  { name: 'Courses in USA', prices: [200, null] },
  { name: 'Courses in Kazakhstan', prices: [56, 324] },
  { name: 'Courses in France', prices: [null, null] },
]
type TCourse = Array<{
  name: string
  prices: Array<number | null>
}>
// Initial rendering of the list:
displayLinks(courses)

const price = document.getElementById('price') as HTMLDivElement
const inputMin = document.getElementById('inputMin')! as HTMLInputElement
const inputMax = document.getElementById('inputMax')! as HTMLInputElement

price.addEventListener('change', () => {
  let min: number = Number(inputMin.value)
  let max: number = Number(inputMax.value)
  let sorting = courses.filter((item: any) => {
    // -- typify item --
    const ul = document.getElementById('ul') as HTMLUListElement
    ul.innerHTML = ''
    if (min == 0 && max === 0) return displayLinks(courses)
    if (item.prices[0] === null && item.prices[1] === null) return null
    if (item.prices[0] === max || (max > 0 && item.prices[0] > max)) return null
    return item.prices[0] >= min && item.prices[1] <= max
  })
  displayLinks(sorting)
})

function displayLinks(array: TCourse) {
  for (let key in array) {
    let row = document.createElement('li') as HTMLLIElement
    let title: string = array[key].name
    let valueMin: number | null = array[key].prices[0]
    let valueMax: number | null = array[key].prices[1]
    const ul = document.getElementById('ul') as HTMLUListElement

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
