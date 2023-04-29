function getRandomNumber(digits) {
  let buffer = new Uint8Array(digits)
  crypto.getRandomValues(buffer)
  let number = buffer.map(d => d % 10).join('')
  if (number[0] === '0') return getRandomNumber(digits)
  return parseInt(number)
}

let timer = null
function startTimer() {
  timer = new Date()
}
function stopTimer() {
  return new Date() - timer
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
  startTimer()
}

function reveal(event) {
  event.preventDefault()
  document.getElementById('settings').classList.remove('active')
  document.getElementById('assignment').classList.add('active')
  document.getElementById('result').classList.add('active')
  let time = `${stopTimer() / 1000}s`
  document.getElementById('result').getElementsByClassName('time')[0].innerHTML = time
}

function reset(event) {
  event.preventDefault()
  document.getElementById('settings').classList.add('active')
  document.getElementById('assignment').classList.remove('active')
  document.getElementById('result').classList.remove('active')
}

document.getElementById('settings').addEventListener('submit', play)
document.getElementById('assignment').addEventListener('submit', reveal)
document.getElementById('result').addEventListener('submit', play)
document.getElementById('reset').addEventListener('click', reset)
