      const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ultimoNivel = 15
      var velocidad = 900

      class Juego {

        constructor() {
          this.inicializar = this.inicializar.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(() => {
            this.siguienteNivel()
          }, 200);          
        }

        inicializar() {
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1
          this.colores = {
            celeste,
            violeta,
            naranja,
            verde,
          }
        }

        toggleBtnEmpezar() {
          if ( btnEmpezar.classList.contains('hide')) {            
             btnEmpezar.classList.remove('hide')
          }else {            
            btnEmpezar.classList.add('hide')
          }
        }

        generarSecuencia() {
          this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))
        }
        
        siguienteNivel() {
          this.subNivel = 0
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }

        transaformarNumeroColor(numero) {
          switch (numero) {
            case 0:
              return 'celeste'
            case 1:
              return 'violeta'
            case 2:
              return 'naranja'
            case 3:
              return 'verde'              
          }
        }

        transaformarColorNumero(color) {
          switch (color) {
            case 'celeste':
              return 0
            case 'violeta':
              return 1
            case 'naranja':
              return 2
            case 'verde':
              return  3             
          }
        }

        iluminarSecuencia() {
          for(let i = 0; i < this.nivel; i++) {
            const color = this.transaformarNumeroColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), velocidad * i)
              
            }
          }

        iluminarColor(color) {
          this.colores[color].classList.add('light')
          setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color) {
          this.colores[color].classList.remove('light')
        }

        agregarEventosClick() {
          this.colores.celeste.addEventListener('click', this.elegirColor)
          this.colores.verde.addEventListener('click', this.elegirColor)
          this.colores.violeta.addEventListener('click', this.elegirColor)
          this.colores.naranja.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick() {
          this.colores.celeste.removeEventListener('click', this.elegirColor)
          this.colores.verde.removeEventListener('click', this.elegirColor)
          this.colores.violeta.removeEventListener('click', this.elegirColor)
          this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev) {
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transaformarColorNumero(nombreColor)
          this.iluminarColor(nombreColor)
          if(numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
            if(this.subNivel === this.nivel) {
              this.aumentarNumeroNivel()
              setTimeout(this.nivel++, 700)
              this.eliminarEventosClick()
              if(this.nivel == (ultimoNivel + 1)) {
                this.ganoJuego()
                this.aumentarNumeroNivel(1)
              }else {
                setTimeout(this.siguienteNivel, 1300)
                if(this.nivel == 3) {
                  velocidad = velocidad - 150
                  this.aumentarNumeroVel()
                }
                if(this.nivel == 6) {
                  velocidad = velocidad - 150
                  this.aumentarNumeroVel()
                }
                if(this.nivel == 9) {
                  velocidad = velocidad - 150
                  this.aumentarNumeroVel()
                }
                if(this.nivel == 13) {
                  velocidad = velocidad - 150
                  this.aumentarNumeroVel(1)
                }
              }
            }
          }else {
            this.perdioJuego()
          }
        }

        perdioJuego() {
          let contador
          Swal.fire({
            title: 'Que mal!, llegaste al nivel '+ this.nivel,
            html: 'Comenzando de nuevo en <b></b> millisegundos.',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading()
              contador = setInterval(() => {
              const content = Swal.getContent()
                if (content) {
                 const b = content.querySelector('b')
                  if (b) {
                   b.textContent = Swal.getTimerLeft()
                 }
                }
              }, 100)
            },
             onClose: () => {
            clearInterval(contador)
            this.eliminarEventosClick()
            this.inicializar()
            this.aumentarNumeroNivel(1)
            this.aumentarNumeroVel(1)
             }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('Quitare el tiempo')
            }
          })
        }

        ganoJuego() {
          Swal.fire(
            'GENIAL!!',
            'Super, tienes una gran memoria...',
            'success')
              .then(() => {               
                this.inicializar()
              })          
        }

        aumentarNumeroVel(reinicio) {
          var points = document.getElementById('velocidad');
          var numberpoints = points.innerHTML;
          (reinicio)? numberpoints=0 : numberpoints++
          points.innerHTML = numberpoints;
        }

        aumentarNumeroNivel(reinicio) {
          var level = document.getElementById('nivel');
          var number = level.innerHTML;
          (reinicio)? number= 0 : number ++
          level.innerHTML = number;
    }
      }

      function empezarJuego() {
        window.juego = new Juego()
      }
 