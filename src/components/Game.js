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
    const [speed, setSpeed] = useState(100)
    const [stop, left, up, right, down] = [32, 37, 38, 39, 40]
    const [direction, setDirection] = useState(32)
    const moveSnake = () => {
        setSnake((pastSnake) => {
            const pastSnakeCopy = [...pastSnake]
            const head = pastSnakeCopy[pastSnakeCopy.length - 1]
            switch(direction){
                case left: head.y += -1; break;
                case up: head.x += -1; break;
                case right: head.y += 1; break;
                case down: head.x += 1; break;
            }
            pastSnakeCopy.push(head)
            pastSnakeCopy.shift()
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
       const timer = setInterval(moveSnake, 1000)
       return () => {
        clearInterval(timer)
       }
    }, [direction])
    useEffect(() => {
        snakeAndFood()
    }, [snake, food, direction])
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
    // const timer = setInterval(moveSnake, 3000)
    // return () => {
    //  clearInterval(timer)
    // }
    return (
        <div>
            <div className="game-container">
                <div className="game-board">
                    {board.map((column, i) => column.map((row, j) => {return <div key={`${i}, ${j}`} className={row}/>}))}
                </div>
            </div>
        </div>
    )
}
export default Game