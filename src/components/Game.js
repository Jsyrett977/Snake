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
    const moveSnake = () => {
        setSnake((pastSnake) => {
            const head = pastSnake[pastSnake.length - 1]
            console.log(head)
            switch(direction){
                case left: head.y += -1; break;
                case up: head.x += -1; break;
                case right: head.y += 1; break;
                case down: head.x += 1; break;
            }
            pastSnake.push(head)
            pastSnake.shift()
            console.log(pastSnake)
            return pastSnake
        })
    }
    const [board, setBoard] = useState(clearBoard)
    const [snake, setSnake] = useState([getRandomSpot()])
    const [food, setFood] = useState(getRandomSpot())
    const [speed, setSpeed] = useState(100)
    const [stop, left, up, right, down] = [32, 37, 38, 39, 40]
    const [direction, setDirection] = useState(stop)
    const snakeAndFood = () => {
        const snakeBoard = clearBoard()
        snake.forEach((snakePart) => snakeBoard[snakePart.x][snakePart.y] = 'snake')
        snakeBoard[food.x][food.y] = 'food'
        return snakeBoard
    }
    useEffect(() => {
        setBoard(snakeAndFood())
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
    // setInterval(moveSnake, 1000)
    return (
        <div>
            <div className="game-container">
                <div className="game-board">
                    {board.map((column, i) => column.map((row, j) => {return <div className={row}/>}))}
                </div>
            </div>
        </div>
    )
}
export default Game