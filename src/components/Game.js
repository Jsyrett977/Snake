import { useEffect, useState } from "react";
const Game = () => {
    const clearBoard = () => {
        let array = []
        for(let i = 0; i < 10; i++){
            array.push([])
            for(let j = 0; j < 10; j++){
                array[i].push('empty')
            }
        }
        return array
    }
    const getRandomSpot = () => {
        return {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }
    const [board, setBoard] = useState(clearBoard)
    const [snake, setSnake] = useState([getRandomSpot()])
    const [food, setFood] = useState(getRandomSpot())
    const [speed, setSpeed] = useState(500)
    const [stop, left, up, right, down] = [32, 37, 38, 39, 40]
    const [direction, setDirection] = useState(32)
    const moveSnake = () => {
        setSnake((pastSnake) => {
            const pastSnakeCopy = [...pastSnake]
            const head = {...pastSnakeCopy[pastSnakeCopy.length - 1]}
            switch(direction){
                case left: head.y += -1; break;
                case up: head.x += -1; break;
                case right: head.y += 1; break;
                case down: head.x += 1; break;
                case stop: return pastSnakeCopy
            }
            head.x === 10 ? head.x = 0 : null;
            head.y === 10 ? head.y = 0 :  null;
            head.x === -1 ? head.x = 9 : null;
            head.y === -1 ? head.y = 9 :  null; 
            pastSnakeCopy.push(head)
            pastSnakeCopy.shift()
            return pastSnakeCopy
        })
    }
    const eatFruit = () => {
        setSnake(snakeCopy => {
            const pastSnakeCopy = [...snakeCopy]
            const head = pastSnakeCopy[pastSnakeCopy.length - 1]
            setFood(getRandomSpot())
            setSpeed(speed - 25)
            pastSnakeCopy.push(head)
            return pastSnakeCopy
        })
    }
    const snakeAndFood = () => {
        const snakeBoard = clearBoard()
        snake.forEach((snakePart) => snakeBoard[snakePart.x][snakePart.y] = 'snake')
        snakeBoard[food.x][food.y] = 'food'
        setBoard(snakeBoard)
    }
    useEffect(() => {
       const timer = setInterval(moveSnake, speed)
       return () => {
        clearInterval(timer)
       }
    }, [direction])
    useEffect(() => {
        snakeAndFood()
    }, [snake])
    useEffect(() => {
        if(snake[snake.length-1].x === food.x && snake[snake.length-1].y === food.y){
        eatFruit()
        }
    }, [snake])
    const handleKeyDown = (e) => {
        setDirection(pastDirection => {
            switch(e.keyCode){
                case left:
                    return (pastDirection === right) ? right : left;
                case right:
                    return (pastDirection === left) ? left : right;
                case up:
                    return (pastDirection === down) ? down : up;
                case down:
                    return (pastDirection === up) ? up : down;
                case stop:
                    return stop
            }
        })
    }
    document.addEventListener('keydown', handleKeyDown)
    return (
        <div>
            <h1>Snake Game</h1>
            <p>Press any arrow key to start<br/>Press the space bar to pause</p>
            <div className="game-container">
                <div className="game-board">
                    {board.map((column, i) => column.map((row, j) => {return <div key={`${i}, ${j}`} className={row}/>}))}
                </div>
            </div>
        </div>
    )
}
export default Game