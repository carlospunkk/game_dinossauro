const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isjumping = false
let isgameOver = false
let position = 0

function handomkeyup(event) {
  if (event.keyCode === 32) {
    if (!isjumping) {
      jump()
    }
  }
}
// função pular
function jump() {
  let position = 0
  isjumping = true

  let upinterval = setInterval(() => {
    if (position >= 250) {
      //DESCER
      clearInterval(upinterval)

      let dowinterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(dowinterval)
          isjumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      //subir
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20)
}

function createcactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1000
  let randomTime = Math.random() * 6000

  if (isgameOver) return

  cactus.classList.add('cactus')
  background.appendChild(cactus)
  cactus.style.left = cactusPosition + 'px'

  let LeftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      //SAIU TELA
      clearInterval(LeftTimer)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //GAME OVER
      clearInterval(LeftTimer)
      isgameOver = true
      document.body.innerHTML = '<h1 class="game-over"> FIM DE JOGO </h1> '
      document.body.innerHTML =
        '<h2 class = "msg">APERTE F-5 PARA REINICIAR</h2>'
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20)
  setTimeout(createcactus, randomTime)
}
createcactus()
document.addEventListener('keyup', handomkeyup)
