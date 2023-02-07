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
    const [board, setBoard] = useState(clearBoard)
    const [snake, setSnake] = useState({})
    const [food, setFood] = useState([])
    const [speed, setSpeed] = useState(100)
    const [stop, left, up, right, down] = [32, 37, 38, 39, 40]
    const [direction, setDirection] = useState(stop)
    const getRandomSpot = () => {
    }

    console.log(board)
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