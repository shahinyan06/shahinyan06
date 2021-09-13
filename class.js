class LivingCreature{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ]
    }


    chooseCell(char) {
        let found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
   }
}

class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.multiply >= 8 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }

    search() {
       let checkCell = this.chooseCell(1)
             if (checkCell.length == 8) {
                matrix[this.x][this.y] = 4
                let flower = new Flower(this.x, this.y)
                flowerArr.push(flower)
                for (let i = 0; i < grassArr.length; i++) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1) 
                       }
                  }
            }
    }
  
}
class GrassEater extends LivingCreature {
   constructor(x, y,index) {
       super(x, y, index );
       this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
       this.getNewCoordinates();
        return super.chooseCell(char);
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
        } else if (this.energy <= 0) {
            this.die()
        }
    }

    eat() {
        this.mul()
        let grassCells = this.chooseCell(1)
        let grassCell = rand(grassCells)
        if (grassCell && this.energy > 0) {
            this.energy++
            let newX = grassCell[0]
            let newY = grassCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (let i = 0; i < grassArr.length; i++) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.move()
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (this.energy >= 12 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            let grEater = new GrassEater(newX, newY)
            grassEaterArr.push(grEater)
            this.energy = 8
        }
    }

    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
            }
        }
    }

}

class Gishatich  extends LivingCreature {
    constructor(x, y,index) {
        super(x, y, index );
        this.energy = 12;
     }
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }
   
    move() {
        let emptyCells0 = this.chooseCell(0)
        let emptyCells1 = this.chooseCell(1)

        let emptyCells = [...emptyCells0, ...emptyCells1]

        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            if (matrix[newX][newY] = 0) {
                matrix[newX][newY] = 3
                matrix[this.x][this.y] = 0
            }
            else if (matrix[newX][newY] = 1) {
                matrix[newX][newY] = 3
                matrix[this.x][this.y] = 1
            }
            this.x = newX
            this.y = newY
        } else if (this.energy <= 0) {
            this.die()
        }
    }


    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (this.energy >= 15 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 3
            let Predator = new Gishatich(newX, newY)
            gishatichArr.push(Predator)
            this.energy = 12
        }
    }

    eat() {
        this.mul()
        let grassEaterCells = this.chooseCell(2)
        let grassEaterCell = rand(grassEaterCells)
        if (grassEaterCell && this.energy > 0) {
            this.energy++
            let newX = grassEaterCell[0]
            let newY = grassEaterCell[1]
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (newX == [i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.move()
        }
    }

    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < gishatichArr.length; i++) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1)
            }
        }
    }
}

class Flower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 8
    }
}

class Caterpillar extends LivingCreature {
    constructor(x, y,index) {
        super(x, y, index );
        this.energy = 12;
     }
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
         this.getNewCoordinates();
        return super.chooseCell(char);
    }

    move() {
        let emptyCells0 = this.chooseCell(0)
        let emptyCells1 = this.chooseCell(1)

        let emptyCells = [...emptyCells0, ...emptyCells1]

        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            if (matrix[newX][newY] = 0) {
                matrix[newX][newY] = 5
                matrix[this.x][this.y] = 0
            }
            else if (matrix[newX][newY] = 1) {
                matrix[newX][newY] = 5
                matrix[this.x][this.y] = 1
            }else if (matrix[newX][newY] = 2) {
                matrix[newX][newY] = 5
                matrix[this.x][this.y] = 2
            }
            else if (matrix[newX][newY] = 3) {
                matrix[newX][newY] = 5
                matrix[this.x][this.y] = 3
            }
            else if (matrix[newX][newY] = 6) {
                matrix[newX][newY] = 5
                matrix[this.x][this.y] = 6
            }
            this.x = newX
            this.y = newY
        }
    }


    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (this.energy >= 15 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 3
            let caterp = new Caterpillar(newX, newY)
            caterpillarArr.push(caterp)
            this.energy = 12
        }
    }
    eat() {
        this.mul()
        let grassEaterCells = this.chooseCell(4)
        let grassEaterCell = rand(grassEaterCells)
        if (grassEaterCell && this.energy > 0) {
            this.energy++
            let newX = grassEaterCell[0]
            let newY = grassEaterCell[1]
            matrix[newX][newY] = 5
            matrix[this.x][this.y] = 0
            for (let i = 0; i < flowerArr.length; i++) {
                if (newX == [i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            matrix[newX][newY] = 6
        } else {
            this.move()
        }
    }

    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < caterpillarArr.length; i++) {
            if (this.x == caterpillarArr[i].x && this.y == caterpillarArr[i].y) {
                caterpillarArr.splice(i, 1)
            }
        }
    } 
}  
  class Butterfly extends LivingCreature {
   constructor(x, y,index) {
        super(x, y, index );
        this.energy = 8;
     }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }
    move() {
        let emptyCells0 = this.chooseCell(0)
        let emptyCells1 = this.chooseCell(1)

        let emptyCells = [...emptyCells0, ...emptyCells1]

        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            if (matrix[newX][newY] = 0) {
                matrix[newX][newY] = 6
                matrix[this.x][this.y] = 0
            }
            else if (matrix[newX][newY] = 1) {
                matrix[newX][newY] = 6
                matrix[this.x][this.y] = 1
            }
            else if (matrix[newX][newY] = 2) {
                matrix[newX][newY] = 6
                matrix[this.x][this.y] = 2
            }
            else if (matrix[newX][newY] = 3) {
                matrix[newX][newY] = 6
                matrix[this.x][this.y] = 3
            }
            else if (matrix[newX][newY] = 4) {
                matrix[newX][newY] = 6
                matrix[this.x][this.y] = 4
            }
            this.x = newX
            this.y = newY
        }else if (this.energy <= 0) {
            this.die()
        }
      }
      
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < butterflyArr.length; i++) {
            if (this.x == butterflyArr[i].x && this.y == butterflyArr[i].y) {
                butterflyArr.splice(i, 1)
            }
        }
    } 
 }
