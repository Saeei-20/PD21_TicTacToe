const Square = ({ value, onClick }) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  };
  
  const Board = () => {
    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = React.useState(true);
  
    const handleClick = (i) => {
      const newSquares = squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
    };
  
    const renderSquare = (i) => {
      return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    };
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    return (
      <div>
        <div className="status">{status}</div>
        <div id="board">
          {Array(9)
            .fill()
            .map((_, i) => renderSquare(i))}
        </div>
      </div>
    );
  };
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  
  const App = () => {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));
  