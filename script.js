let grassArr = []
let grassEaterArr = []
let gishatichArr = []
let flowerArr = []
let caterpillarArr = []
let butterflyArr = []
var matrix = []
   
 function matrixGen(n,gr, grEater, pred, caterpillar){
    for (let x = 0; x < n; x++) {
       matrix[x] = []
       for (let y = 0; y < n; y++) {
          matrix[x][y] = 0
           
       }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)
       if (matrix[x][y] == 0) {
           matrix[x][y] = 1
         }
         else {
             i--
         }
     
     }
     for (let i = 0; i < grEater; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)
       if (matrix[x][y] == 0) {
           matrix[x][y] = 2
         }
         else {
             i--
         }
     
     }
     for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)
       if (matrix[x][y] == 0) {
           matrix[x][y] = 3
         }
         else {
             i--
         }
     
     }
     for (let i = 0; i < caterpillar; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)
       if (matrix[x][y] == 0) {
           matrix[x][y] = 5
         }
         else {
             i--
         }
     
     }
    
}

matrixGen(100, 5000 , 80, 30 ,20)

 function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let side = 10

function setup() {
    createCanvas(side * matrix[0].length, side * matrix.length)
    background('pink')
    frameRate(3)
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[x][y] == 2) {
                let grEater = new GrassEater(x, y)
                grassEaterArr.push(grEater)
            }
            else if (matrix[x][y] == 3) {
                let Predator  = new Gishatich(x, y)
                gishatichArr.push(Predator )

            }
            else if (matrix[x][y] == 5) {
                let caterp = new Caterpillar(x, y)
                gishatichArr.push(caterp )
                
            }
            else if (matrix[x][y] == 6) {
                let Predator  = new Butterfly(x, y)
                gishatichArr.push(Predator )
                
            }
    }

}
}
function draw() {
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 0) {
                fill('gray')
            }
             else if (matrix[x][y] == 1) {
                fill('green')
            }
             else if (matrix[x][y] == 2) {
                fill('yellow')
            }
            else if (matrix[x][y] == 3) {
                fill('red')
            }
            else if (matrix[x][y] == 4) {
                fill('pink')
            } else if (matrix[x][y] == 5) {
                fill('#4f2e0d') 
            }else if (matrix[x][y] == 6) {
                fill('#795bfc')
            }
            rect(y * side, x * side, side, side)
        }
    }

    for (const i in grassArr) {
        grassArr[i].mul()
        grassArr[i].search()
    }

    for (const i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (const i in gishatichArr) {
        gishatichArr[i].eat()
    }
    
    for (const i in caterpillarArr) {
        caterpillarArr[i].eat()
    }
    for (const i in butterflyArr) {
        butterflyArr[i].move()
    }
}



