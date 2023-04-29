function getRandomNumber(digits) {
  let buffer = new Uint8Array(digits)
  crypto.getRandomValues(buffer)
  let int = parseInt(buffer.map(d => d % 10).join(''))
  if (int === 0) return getRandomNumber(digits)
  return int
}

function play(event) {
  event.preventDefault()
  let digits = document.getElementById('digits').value
  let rows = document.getElementById('rows').value
  let output = document.getElementById('assignment').getElementsByClassName('rows')[0]

  let result = 0
  output.innerHTML = ''
  for (let i = 0; i < rows; i++) {
    let digit = getRandomNumber(digits)
    output.innerHTML += `<div class="row">${digit}</div>`
    result += digit
  }
  document.getElementById('result').getElementsByClassName('answer')[0].innerHTML = result

  document.getElementById('settings').classList.remove('active')
  document.getElementById('assignment').classList.add('active')
  document.getElementById('result').classList.remove('active')
}

function reveal(event) {
  event.preventDefault()
  document.getElementById('settings').classList.remove('active')
  document.getElementById('assignment').classList.remove('active')
  document.getElementById('result').classList.add('active')
}

function reset(event) {
  event.preventDefault()
  document.getElementById('settings').classList.add('active')
  document.getElementById('assignment').classList.remove('active')
  document.getElementById('result').classList.remove('active')
}

document.getElementById('settings').addEventListener('submit', play)
document.getElementById('assignment').addEventListener('submit', reveal)
document.getElementById('result').addEventListener('submit', reset)
